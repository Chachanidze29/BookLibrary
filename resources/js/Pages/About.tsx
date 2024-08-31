import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Textarea } from '@/Components/Textarea';
import MainLayout from '@/Layouts/MainLayout';
import { Branch } from '@/types/model';

export default function About({
    about,
    branches,
}: {
    about: string;
    branches: Branch[];
}) {
    const { t } = useLaravelReactI18n();

    return (
        <MainLayout>
            <Head title={t('About Us')} />
            <div className="container p-4">
                <Textarea
                    value={about}
                    readOnly
                    style={{
                        cursor: 'auto',
                        borderRadius: '0.375rem',
                        backgroundColor: '#E2E8F0',
                        padding: '0.75rem',
                        fontSize: '1rem',
                        lineHeight: '1.5',
                        color: '#2D3748',
                        outline: 'none',
                        boxShadow: 'none',
                        resize: 'none',
                        userSelect: 'none',
                    }}
                />
                <p className="mb-2 mt-4 text-lg font-semibold">
                    {t('Branches')}
                </p>
                <div className="flex flex-wrap items-center justify-between">
                    {branches.map((branch, index) => (
                        <div
                            key={index}
                            className="mt-2 rounded-lg bg-gray-100 p-4"
                        >
                            <p className="font-semibold">{branch.name}</p>
                            <p>{branch.address}</p>
                            <p>{branch.email}</p>
                            <p>{branch.phone}</p>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
