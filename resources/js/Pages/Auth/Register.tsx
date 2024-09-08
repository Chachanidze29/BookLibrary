import { Head, Link, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler, useEffect } from 'react';

import { Button } from '@/Components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Card';
import FormInputText from '@/Components/FormInputs/FormInputText';
import MainLayout from '@/Layouts/MainLayout';
import { GoogleIcon } from '@/icons/GoogleIcon';

export default function Register() {
    const { t } = useLaravelReactI18n();
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        personal_number: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <MainLayout>
            <Head title={t('Register')} />

            <div className="flex grow items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            {t('Register')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid items-start gap-4 sm:grid-cols-2">
                                <FormInputText
                                    id="first_name"
                                    type="text"
                                    label={t('First name')}
                                    value={data.first_name}
                                    onChange={(e) =>
                                        setData('first_name', e.target.value)
                                    }
                                    autoComplete="first_name"
                                    error={errors.first_name}
                                />

                                <FormInputText
                                    id="last_name"
                                    type="text"
                                    label={t('Last name')}
                                    value={data.last_name}
                                    onChange={(e) =>
                                        setData('last_name', e.target.value)
                                    }
                                    autoComplete="last_name"
                                    error={errors.last_name}
                                />

                                <FormInputText
                                    id="email"
                                    type="email"
                                    label={t('Email')}
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    autoComplete="email"
                                    error={errors.email}
                                />

                                <FormInputText
                                    id="phone_number"
                                    type="tel"
                                    label={t('Phone number')}
                                    value={data.phone_number}
                                    onChange={(e) =>
                                        setData('phone_number', e.target.value)
                                    }
                                    autoComplete="tel"
                                    error={errors.phone_number}
                                />

                                <FormInputText
                                    id="personal_number"
                                    type="text"
                                    label={t('Personal number')}
                                    value={data.personal_number}
                                    onChange={(e) =>
                                        setData(
                                            'personal_number',
                                            e.target.value,
                                        )
                                    }
                                    error={errors.personal_number}
                                    className="sm:col-span-2"
                                />

                                <FormInputText
                                    id="password"
                                    type="password"
                                    label={t('Password')}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    autoComplete="new-password"
                                    error={errors.password}
                                />

                                <FormInputText
                                    id="password_confirmation"
                                    type="password"
                                    label={t('Confirm password')}
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                    autoComplete="new-password"
                                    error={errors.password_confirmation}
                                />

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full sm:col-span-2"
                                >
                                    {t('Register')}
                                </Button>

                                <Link
                                    href={route('google.auth')}
                                    className="mt-2 w-full sm:col-span-2"
                                >
                                    <Button
                                        type="button"
                                        className="flex w-full items-center justify-center border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-100"
                                        disabled={processing}
                                    >
                                        <GoogleIcon className="mr-3 h-6 w-6" />{' '}
                                        <span className="text-lg">
                                            {t('Sign in with Google')}
                                        </span>{' '}
                                    </Button>
                                </Link>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                {t('Already have an account?')}{' '}
                                <Link
                                    href={route('login')}
                                    className="underline"
                                >
                                    {t('Log In')}
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
