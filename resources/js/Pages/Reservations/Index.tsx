import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect } from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/Components/AlertDialog';
import { Button } from '@/Components/Button';
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
import { useToast } from '@/Components/useToast';
import ProfileLayout from '@/Layouts/ProfileLayout';
import { PageProps } from '@/types';
import { MyReservation } from '@/types/model';

export default function Reservations({
    reservations,
}: {
    reservations: MyReservation[];
}) {
    const { t } = useLaravelReactI18n();
    const { toast } = useToast();
    const { success, error } = usePage<PageProps>().props.flash;
    const { delete: destroy, wasSuccessful } = useForm({});

    useEffect(() => {
        if (wasSuccessful) {
            toast({
                title: t(error || success),
                variant: error ? 'destructive' : 'default',
            });
        }
    }, [wasSuccessful]);

    const handleDelete = (id: number) => {
        destroy(route('reservation.destroy', id), {
            preserveScroll: true,
        });
    };

    return (
        <ProfileLayout>
            <Head title={t('My Reservations')} />

            <Card className="flex flex-grow flex-col">
                <CardHeader>
                    <CardTitle>{t('My Reservations')}</CardTitle>
                    <CardDescription>
                        {t('View and manage your reservations')}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="flex justify-between">
                                <TableHead>{t('Book')}</TableHead>
                                <TableHead>{t('Reserve date')}</TableHead>
                                <TableHead>{t('Due date')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reservations.length ? (
                                reservations.map((reservation) => (
                                    <TableRow key={reservation.id}>
                                        <TableCell className="space-y-1">
                                            <Link
                                                href={route(
                                                    'books.show',
                                                    reservation.book_copy.book
                                                        .id,
                                                )}
                                                className="font-medium hover:underline"
                                            >
                                                {
                                                    reservation.book_copy.book
                                                        .title
                                                }
                                            </Link>
                                            <p className="text-muted-foreground">
                                                {reservation.book_copy.code}
                                            </p>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {new Date(
                                                reservation.reserve_date,
                                            ).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {new Date(
                                                reservation.due_date,
                                            ).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="outline">
                                                        {t('Delete')}
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            {t(
                                                                'Delete reservation',
                                                            )}
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            {t(
                                                                'Are you sure you want to delete this reservation?',
                                                            )}
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>

                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            {t('Cancel')}
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            variant="destructive"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    reservation.id,
                                                                )
                                                            }
                                                        >
                                                            {t('Delete')}
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
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
