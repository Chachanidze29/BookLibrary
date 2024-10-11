import { useForm, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { ChevronsUpDownIcon } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

import { Button } from '@/Components/Button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/Components/Command';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/Dialog';
import { Label } from '@/Components/Label';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/Popover';
import { PageProps } from '@/types';
import { Book, BookCopy } from '@/types/model';

import { InputError } from './InputError';
import { useToast } from './useToast';

export const BookReservationDialog = ({ book }: { book: Book }) => {
    const { t } = useLaravelReactI18n();
    const { data, setData, post, errors, wasSuccessful } = useForm<{
        book_copy: BookCopy | undefined;
    }>({
        book_copy: undefined,
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const {
        flash: { success, error },
        auth: { user },
    } = usePage<PageProps>().props;

    const { toast } = useToast();

    const [bookCopiesPopoverOpen, setBookCopiesPopoverOpen] = useState(false);
    const [bookCopiesInputValue, setBookCopiesInputValue] =
        useState<string>('');

    useEffect(() => {
        if (wasSuccessful) {
            toast({
                title: t(error || success),
                variant: error ? 'destructive' : 'default',
            });
        }

        setIsDialogOpen(false);
    }, [wasSuccessful]);

    const renderBookOptions = () => {
        return book.book_copies.map((bookCopy) => (
            <CommandItem
                key={bookCopy.id}
                value={bookCopy.code}
                onSelect={() => {
                    setData('book_copy', bookCopy);
                    setBookCopiesPopoverOpen(false);
                }}
            >
                <div className="flex flex-col items-start gap-1">
                    <p>{book.title}</p>
                    <p className="text-xs text-muted-foreground">
                        {bookCopy.code} - {bookCopy.branch.name}
                    </p>
                </div>
            </CommandItem>
        ));
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (!data.book_copy) {
            return;
        }
        post(route('reservation.store', { book_copy_id: data.book_copy.id }), {
            preserveScroll: true,
        });
    };

    if (user?.is_admin) return null;

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">{t('Reserve')}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('Reserve a book')}</DialogTitle>
                    <DialogDescription>
                        {t('Choose a book you want to reserve')}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="book_copies">
                                {t('Book Copies')}
                            </Label>
                            <Popover
                                modal={true}
                                open={bookCopiesPopoverOpen}
                                onOpenChange={setBookCopiesPopoverOpen}
                            >
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={bookCopiesPopoverOpen}
                                        className="h-auto justify-between"
                                    >
                                        {data.book_copy
                                            ? `${data.book_copy.code} - ${data.book_copy.branch.name}`
                                            : t('Select book copies')}
                                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="p-0">
                                    <Command>
                                        <CommandInput
                                            value={bookCopiesInputValue}
                                            onValueChange={
                                                setBookCopiesInputValue
                                            }
                                            placeholder={t(
                                                'Start searching by code',
                                            )}
                                        />
                                        <CommandList>
                                            <CommandEmpty>
                                                {t('No results')}
                                            </CommandEmpty>
                                            <CommandGroup>
                                                <CommandList>
                                                    {renderBookOptions()}
                                                </CommandList>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <InputError message={errors.book_copy} />
                        <Button type="submit">{t('Reserve')}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
