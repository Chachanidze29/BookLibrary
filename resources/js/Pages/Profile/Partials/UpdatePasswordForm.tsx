import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler, useEffect, useRef } from 'react';

import { Button } from '@/Components/Button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/Card';
import FormInputText from '@/Components/FormInputs/FormInputText';
import { useToast } from '@/Components/useToast';

export default function UpdatePasswordForm() {
    const { t } = useLaravelReactI18n();
    const { toast } = useToast();

    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        if (recentlySuccessful) {
            toast({
                title: t('Password updated successfully'),
            });
        }
    }, [recentlySuccessful]);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card className="flex flex-grow flex-col">
                <CardHeader>
                    <CardTitle>{t('Update Password')}</CardTitle>
                    <CardDescription>
                        {t(
                            'Ensure your account is using a long, random password to stay secure',
                        )}
                    </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-4">
                    <FormInputText
                        id="current_password"
                        type="password"
                        label={t('Current password')}
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        error={errors.current_password}
                        className="grid gap-2"
                        ref={currentPasswordInput}
                    />

                    <FormInputText
                        id="password"
                        type="password"
                        label={t('New password')}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        error={errors.password}
                        className="grid gap-2"
                        ref={passwordInput}
                    />

                    <FormInputText
                        id="password_confirmation"
                        type="password"
                        label={t('Confirm password')}
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        error={errors.password_confirmation}
                        className="grid gap-2"
                    />
                </CardContent>

                <CardFooter className="border-t px-6 py-4">
                    <Button type="submit" disabled={processing}>
                        {t('Save')}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
