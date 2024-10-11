import { Head, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler, useEffect } from 'react';

import FormInputText from '@/Components/FormInputs/FormInputText';
import PrimaryButton from '@/Components/PrimaryButton';
import MainLayout from '@/Layouts/MainLayout';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { t } = useLaravelReactI18n();

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };

    return (
        <MainLayout>
            <Head title="Reset Password" />

            <form onSubmit={submit}>
                <FormInputText
                    id="email"
                    type="email"
                    label="Email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                    className="mt-1 block w-full"
                    autoComplete="username"
                />

                <FormInputText
                    id="password"
                    type="password"
                    label="Password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    className="mt-4 block w-full"
                    autoComplete="new-password"
                    autoFocus
                />

                <FormInputText
                    id="password_confirmation"
                    type="password"
                    label="Confirm password"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData('password_confirmation', e.target.value)
                    }
                    error={errors.password_confirmation}
                    className="mt-4 block w-full"
                    autoComplete="new-password"
                />

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        {t('Reset Password')}
                    </PrimaryButton>
                </div>
            </form>
        </MainLayout>
    );
}
