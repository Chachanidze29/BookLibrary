import { Link, useForm, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler, useEffect } from 'react';

import { Button } from '@/Components/Button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/Card';
import { FormInputText } from '@/Components/FormInputs/FormInputText';
import { useToast } from '@/Components/useToast';
import { PageProps } from '@/types';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const user = usePage<PageProps>().props.auth.user;
    const { t } = useLaravelReactI18n();
    const { toast } = useToast();

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            personal_number: user.personal_number,
            phone_number: user.phone_number,
        });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    useEffect(() => {
        if (recentlySuccessful) {
            toast({
                title: t('Profile updated successfully'),
            });
        }
    }, [recentlySuccessful]);

    return (
        <form onSubmit={handleSubmit}>
            <Card className="flex flex-grow flex-col">
                <CardHeader>
                    <CardTitle>{t('Profile Information')}</CardTitle>
                    <CardDescription>
                        {t(
                            "Update your account's profile information and email address",
                        )}
                    </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-4">
                    <FormInputText
                        id="first_name"
                        type="text"
                        label={t('First name')}
                        value={data.first_name}
                        onChange={(e) => setData('first_name', e.target.value)}
                        error={errors.first_name}
                    />

                    <FormInputText
                        id="last_name"
                        type="text"
                        label={t('Last name')}
                        value={data.last_name}
                        onChange={(e) => setData('last_name', e.target.value)}
                        error={errors.last_name}
                    />

                    <FormInputText
                        id="email"
                        type="email"
                        label={t('Email')}
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        error={errors.email}
                    />

                    <FormInputText
                        id="personal_number"
                        type="text"
                        label={t('Personal number')}
                        value={data.personal_number}
                        onChange={(e) =>
                            setData('personal_number', e.target.value)
                        }
                        error={errors.personal_number}
                    />

                    <FormInputText
                        id="phone_number"
                        type="text"
                        label={t('Phone number')}
                        value={data.phone_number}
                        onChange={(e) =>
                            setData('phone_number', e.target.value)
                        }
                        error={errors.phone_number}
                    />

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="mt-2 text-sm text-gray-800">
                                {t('Your email address is unverified.')}
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    {t(
                                        'Click here to re-send the verification email.',
                                    )}
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 text-sm font-medium text-green-600">
                                    {t(
                                        'A new verification link has been sent to the email address you provided during registration.',
                                    )}
                                </div>
                            )}
                        </div>
                    )}
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
