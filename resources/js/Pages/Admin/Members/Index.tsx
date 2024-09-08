import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Button } from '@/Components/Button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/Card';
import { DataTable } from '@/Components/DataTable';
import AdminLayout from '@/Layouts/AdminLayout';
import { columns } from '@/Pages/Admin/Members/Partials/columns';
import { Member } from '@/types/model';

export default function Index({ members }: { members: Member[] }) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={t('Members')} />

            <Card className="flex flex-grow flex-col">
                <div className="flex flex-col justify-between sm:flex-row">
                    <CardHeader>
                        <CardTitle>{t('Members')}</CardTitle>
                        <CardDescription>
                            {t('View and manage members')}
                        </CardDescription>
                    </CardHeader>

                    <Button className="mx-6 mb-6 sm:m-6" asChild>
                        <Link href={route('admin.members.create')}>
                            {t('Add Member')}
                        </Link>
                    </Button>
                </div>

                <CardContent className="flex flex-grow flex-col">
                    <DataTable
                        data={members}
                        columns={columns}
                        filterBy="email"
                    />
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
