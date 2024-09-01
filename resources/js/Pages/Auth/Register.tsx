import { Head, Link, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler, useEffect } from 'react';

import { Button } from '@/Components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Card';
import { Input } from '@/Components/Input';
import { InputError } from '@/Components/InputError';
import { Label } from '@/Components/Label';
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
                                {/* Registration form fields */}
                                <div className="grid gap-2">
                                    <Label htmlFor="first_name">
                                        {t('First name')}
                                    </Label>
                                    <Input
                                        id="first_name"
                                        value={data.first_name}
                                        onChange={(e) =>
                                            setData(
                                                'first_name',
                                                e.target.value,
                                            )
                                        }
                                        autoComplete="first_name"
                                        autoFocus
                                    />
                                    <InputError message={errors.first_name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="last_name">
                                        {t('Last name')}
                                    </Label>
                                    <Input
                                        id="last_name"
                                        value={data.last_name}
                                        onChange={(e) =>
                                            setData('last_name', e.target.value)
                                        }
                                        autoComplete="last_name"
                                    />
                                    <InputError message={errors.last_name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">{t('Email')}</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        autoComplete="email"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="phone_number">
                                        {t('Phone number')}
                                    </Label>
                                    <Input
                                        id="phone_number"
                                        type="tel"
                                        value={data.phone_number}
                                        onChange={(e) =>
                                            setData(
                                                'phone_number',
                                                e.target.value,
                                            )
                                        }
                                        autoComplete="tel"
                                    />
                                    <InputError message={errors.phone_number} />
                                </div>

                                <div className="grid gap-2 sm:col-span-2">
                                    <Label htmlFor="personal_number">
                                        {t('Personal number')}
                                    </Label>
                                    <Input
                                        id="personal_number"
                                        type="text"
                                        value={data.personal_number}
                                        onChange={(e) =>
                                            setData(
                                                'personal_number',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.personal_number}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">
                                        {t('Password')}
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        autoComplete="new-password"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">
                                        {t('Confirm password')}
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                'password_confirmation',
                                                e.target.value,
                                            )
                                        }
                                        autoComplete="new-password"
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                    />
                                </div>

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
