import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/Card';
import AdminLayout from '@/Layouts/AdminLayout';
import { Form } from '@/Pages/Admin/Members/Partials/Form';
import { FormType } from '@/types/form';

const initialData = {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    personal_number: '',
};

export default function Create() {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={t('Add Member')} />

            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>{t('Add Member')}</CardTitle>
                    <CardDescription>
                        {t('Create and add a new member')}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col">
                    <Form type={FormType.Create} initialData={initialData} />
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
