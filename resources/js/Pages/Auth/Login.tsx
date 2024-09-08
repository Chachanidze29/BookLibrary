import { Head, Link, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler, useEffect } from 'react';

import { Button } from '@/Components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Card';
import { Checkbox } from '@/Components/Checkbox';
import FormInputText from '@/Components/FormInputs/FormInputText';
import MainLayout from '@/Layouts/MainLayout';
import { GoogleIcon } from '@/icons/GoogleIcon';

export default function Login({
    canResetPassword,
}: {
    canResetPassword: boolean;
}) {
    const { t } = useLaravelReactI18n();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <MainLayout>
            <Head title={t('Log in')} />

            <div className="flex grow items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl">{t('Login')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4">
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

                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="ml-auto inline-block text-sm underline"
                                            >
                                                {t('Forgot your password?')}
                                            </Link>
                                        )}
                                    </div>
                                    <FormInputText
                                        id="password"
                                        type="password"
                                        label={t('Password')}
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        autoComplete="current-password"
                                        error={errors.password}
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={data.remember}
                                        onCheckedChange={(checked) =>
                                            setData(
                                                'remember',
                                                checked as boolean,
                                            )
                                        }
                                    />
                                    <label
                                        htmlFor="remember"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {t('Remember me')}
                                    </label>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full"
                                >
                                    {t('Login')}
                                </Button>

                                <Link
                                    href={route('google.auth')}
                                    className="mt-2 w-full"
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
                                {t("Don't have an account?")}{' '}
                                <Link
                                    href={route('register')}
                                    className="underline"
                                >
                                    {t('Register')}
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
