import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/Card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/Table';
import ProfileLayout from '@/Layouts/ProfileLayout';
import { MyCheckouts } from '@/types/model';

export default function Checkouts({ checkouts }: { checkouts: MyCheckouts[] }) {
    const { t } = useLaravelReactI18n();

    return (
        <ProfileLayout>
            <Head title={t('My Checkouts')} />

            <Card className="flex flex-grow flex-col">
                <CardHeader>
                    <CardTitle>{t('My Checkouts')}</CardTitle>
                    <CardDescription>
                        {t('View your checkouts')}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow
                                className={`w-100 ${checkouts.length <= 0 ? 'flex justify-between' : ''}`}
                            >
                                <TableHead>{t('Book')}</TableHead>
                                <TableHead>{t('Checkout date')}</TableHead>
                                <TableHead>{t('Due date')}</TableHead>
                                <TableHead>{t('Return date')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {checkouts.length ? (
                                checkouts.map((checkout) => (
                                    <TableRow key={checkout.id}>
                                        <TableCell className="space-y-1">
                                            <Link
                                                href={route(
                                                    'books.show',
                                                    checkout.book_copy.book.id,
                                                )}
                                                className="font-medium hover:underline"
                                            >
                                                {checkout.book_copy.book.title}
                                            </Link>
                                            <p className="text-muted-foreground">
                                                {checkout.book_copy.code}
                                            </p>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {new Date(
                                                checkout.checkout_date,
                                            ).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {new Date(
                                                checkout.due_date,
                                            ).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {checkout.return_date
                                                ? new Date(
                                                      checkout.return_date,
                                                  ).toLocaleDateString()
                                                : t('Not returned')}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center"
                                    >
                                        {t('No results')}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </ProfileLayout>
    );
}
