import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler, useRef, useState } from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/Components/AlertDialog';
import { Button } from '@/Components/Button';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/Card';
import FormInputText from '@/Components/FormInputs/FormInputText';

export default function DeleteUserForm() {
    const { t } = useLaravelReactI18n();

    const [open, setOpen] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        errors,
        reset,
        processing,
    } = useForm({
        password: '',
    });

    const toggleModal = () => {
        setOpen((prev) => !prev);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => toggleModal(),
            onError: () => {
                toggleModal();
                passwordInput.current?.focus();
            },
            onFinish: () => reset(),
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('Delete Account')}</CardTitle>
                <CardDescription>
                    {t(
                        'Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.',
                    )}
                </CardDescription>
            </CardHeader>

            <CardFooter>
                <AlertDialog open={open} onOpenChange={toggleModal}>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                            {t('Delete Account')}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <form onSubmit={handleSubmit}>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    {t(
                                        'Are you sure you want to delete your account?',
                                    )}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    {t(
                                        'Once your account is deleted, all of its resources and data will be permanently deleted.',
                                    )}
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <div className="my-6 grid gap-2">
                                <FormInputText
                                    ref={passwordInput}
                                    id="password"
                                    type="password"
                                    label={t('Password')}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    error={errors.password}
                                    autoFocus
                                />
                            </div>

                            <AlertDialogFooter>
                                <AlertDialogCancel>
                                    {t('Cancel')}
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    type="submit"
                                    variant="destructive"
                                    disabled={processing}
                                    asChild
                                >
                                    <Button>{t('Delete')}</Button>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </form>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    );
}
