import { Head, Link, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Button } from '@/Components/Button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/Card';
import FormInputNumber from '@/Components/FormInputs/FormInputNumber';
import FormInputTextarea from '@/Components/FormInputs/FormInputTextarea';
import ConfigurationLayout from '@/Layouts/ConfigurationLayout';

type Configurations = {
    about: string;
    days_to_return: number;
    max_lent_books: number;
    max_reservation_days: number;
};

export default function Index({
    about,
    days_to_return,
    max_lent_books,
    max_reservation_days,
}: Configurations) {
    const { t } = useLaravelReactI18n();

    const { data, setData, put, processing, errors } = useForm<Configurations>({
        about,
        days_to_return,
        max_lent_books,
        max_reservation_days,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        put(route('admin.configuration.update'), {
            preserveScroll: true,
        });
    };

    return (
        <ConfigurationLayout>
            <Head title={t('Configuration')} />

            <form onSubmit={handleSubmit}>
                <Card className="flex flex-grow flex-col">
                    <CardHeader>
                        <CardTitle>{t('Library')}</CardTitle>
                        <CardDescription>
                            {t("Configure library's policies and settings")}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-4">
                        <FormInputTextarea
                            id="about"
                            label={t('About us')}
                            value={data.about || ''}
                            onChange={(e) => setData('about', e.target.value)}
                            error={errors.about}
                        />

                        <FormInputNumber
                            id="days_to_return"
                            label={t('Days to Return')}
                            value={data.days_to_return}
                            onChange={(e) =>
                                setData(
                                    'days_to_return',
                                    parseInt(e.target.value) || 1,
                                )
                            }
                            error={errors.days_to_return}
                            description={t(
                                'The number of days a member has to return a book.',
                            )}
                        />

                        <FormInputNumber
                            id="max_lent_books"
                            label={t('Max Lent Books')}
                            value={data.max_lent_books}
                            onChange={(e) =>
                                setData(
                                    'max_lent_books',
                                    parseInt(e.target.value) || 1,
                                )
                            }
                            error={errors.max_lent_books}
                            description={t(
                                'The maximum number of books a member can borrow at the same time.',
                            )}
                        />

                        <FormInputNumber
                            id="max_reservation_days"
                            label={t('Max Reservation Days')}
                            value={data.max_reservation_days}
                            onChange={(e) =>
                                setData(
                                    'max_reservation_days',
                                    parseInt(e.target.value) || 1,
                                )
                            }
                            error={errors.max_reservation_days}
                            description={t(
                                'The number of days to borrow a reserved book.',
                            )}
                        />
                    </CardContent>

                    <CardFooter className="border-t px-6 py-4">
                        <Button type="submit" disabled={processing}>
                            {t('Save')}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </ConfigurationLayout>
    );
}
