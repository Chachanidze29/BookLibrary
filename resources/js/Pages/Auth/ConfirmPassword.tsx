import { Head, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler, useEffect } from 'react';

import FormInputText from '@/Components/FormInputs/FormInputText';
import PrimaryButton from '@/Components/PrimaryButton';
import MainLayout from '@/Layouts/MainLayout';

export default function ConfirmPassword() {
    const { t } = useLaravelReactI18n();

    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.confirm'));
    };

    return (
        <MainLayout>
            <Head title="Confirm Password" />

            <div className="mb-4 text-sm text-gray-600">
                {t(
                    'This is a secure area of the application. Please confirm your password before continuing.',
                )}
            </div>

            <form onSubmit={submit}>
                <FormInputText
                    id="password"
                    type="password"
                    label="Password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    className="mt-1 block w-full"
                    autoFocus
                />

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        {t('Confirm')}
                    </PrimaryButton>
                </div>
            </form>
        </MainLayout>
    );
}
