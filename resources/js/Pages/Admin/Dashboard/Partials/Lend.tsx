import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import {
    ArrowUpFromLineIcon,
    CheckIcon,
    ChevronsUpDownIcon,
    TrashIcon,
} from 'lucide-react';
import * as React from 'react';

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
import { InputError } from '@/Components/InputError';
import { Label } from '@/Components/Label';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/Popover';
import { cn } from '@/lib/utils';
import { LendData } from '@/types';

export default function Lend({
    data: { members, book_copies, max_lent_books },
}: {
    data: LendData;
}) {
    const { t } = useLaravelReactI18n();
    const { data, setData, post, errors, reset } = useForm<{
        member_id: number | null;
        book_copies: number[];
    }>({
        member_id: null,
        book_copies: [],
    });

    const [memberPopoverOpen, setMemberPopoverOpen] = React.useState(false);
    const [memberInputValue, setMemberInputValue] = React.useState<string>('');

    const [bookCopiesPopoverOpen, setBookCopiesPopoverOpen] =
        React.useState(false);
    const [bookCopiesInputValue, setBookCopiesInputValue] =
        React.useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(route('admin.checkout.store'));

        reset();
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    };

    const getAvailableCheckouts = (memberId: number) => {
        const member = members.filter((member) => member.id === memberId)[0];
        return (
            max_lent_books - member.checkouts_count - data.book_copies.length
        );
    };

    const renderMember = (id: number) => {
        const member = members.filter((member) => member.id === id)[0];

        return (
            <div className="flex flex-col items-start gap-1">
                <p>
                    {member.first_name} {member.last_name}
                </p>
                <p className="text-xs text-muted-foreground">
                    {member.personal_number}
                </p>
            </div>
        );
    };

    const handleSelectBookCopy = (code: string) => {
        const bookCopyId = book_copies.filter(
            (bookCopy) => bookCopy.code === code,
        )[0].id;
        const index = data.book_copies.indexOf(bookCopyId);

        if (index === -1) {
            return [...data.book_copies, bookCopyId];
        }

        return data.book_copies.filter((id) => id !== bookCopyId);
    };

    const renderMemberOptions = () => {
        return members.map((member) => (
            <CommandItem
                key={member.id}
                value={member.first_name}
                onSelect={(currentValue) => {
                    const memberId = members.filter(
                        (member) => member.first_name === currentValue,
                    )[0].id;
                    setData('member_id', memberId);
                    setMemberPopoverOpen(false);
                }}
            >
                <CheckIcon
                    className={cn(
                        'mr-2 h-4 w-4',
                        data.member_id === member.id
                            ? 'opacity-100'
                            : 'opacity-0',
                    )}
                />
                {renderMember(member.id)}
            </CommandItem>
        ));
    };

    const renderBookOptions = () => {
        if (!data.member_id) return [];

        const member = members.filter(
            (member) => member.id === data.member_id,
        )[0];

        const reservedBookCopyIds = member.reservations.map(
            (reserved) => reserved.book_copy_id,
        );

        const sortedBookCopies = book_copies.sort((a, b) => {
            const isReservedA = reservedBookCopyIds.includes(a.id);
            const isReservedB = reservedBookCopyIds.includes(b.id);
            if (isReservedA && !isReservedB) return -1;
            if (!isReservedA && isReservedB) return 1;
            return 0;
        });

        return sortedBookCopies.map((bookCopy) => (
            <CommandItem
                key={bookCopy.id}
                value={bookCopy.code}
                onSelect={(currentValue) => {
                    setData('book_copies', handleSelectBookCopy(currentValue));
                    setBookCopiesPopoverOpen(false);
                }}
            >
                <CheckIcon
                    className={cn(
                        'mr-2 h-4 w-4',
                        data.book_copies.find((copy) => copy === bookCopy.id)
                            ? 'opacity-100'
                            : 'opacity-0',
                    )}
                />
                <div className="flex flex-col items-start gap-1">
                    <p>{bookCopy.book.title}</p>
                    <p className="text-xs text-muted-foreground">
                        {bookCopy.code} - {bookCopy.branch.name}
                    </p>
                </div>
            </CommandItem>
        ));
    };

    const renderSelectedBooks = () => {
        return (
            <div className="grid gap-4 py-4">
                {data.book_copies.map((id) => {
                    const bookCopy = book_copies.filter(
                        (bookCopy) => bookCopy.id === id,
                    )[0];

                    return (
                        <div key={id} className="flex justify-between">
                            <div>
                                <p className="text-sm font-medium">
                                    {bookCopy.book.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {bookCopy.code} - {bookCopy.branch.name}
                                </p>
                            </div>

                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                    setData(
                                        'book_copies',
                                        data.book_copies.filter(
                                            (bookCopyId) => bookCopyId !== id,
                                        ),
                                    )
                                }
                                className="shrink-0"
                            >
                                <TrashIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full">
                    <ArrowUpFromLineIcon className="mr-2 h-4 w-4" />
                    {t('Lend')}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('Lend a book')}</DialogTitle>
                    <DialogDescription>
                        {t('Fill out the form to lend a book')}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="member">{t('Member')}</Label>

                            <Popover
                                modal={true}
                                open={memberPopoverOpen}
                                onOpenChange={setMemberPopoverOpen}
                            >
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={memberPopoverOpen}
                                        className="h-auto justify-between"
                                    >
                                        {data.member_id
                                            ? renderMember(data.member_id)
                                            : t('Select a member')}
                                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="p-0">
                                    <Command>
                                        <CommandInput
                                            value={memberInputValue}
                                            onValueChange={setMemberInputValue}
                                            placeholder={t(
                                                'Start searching by name',
                                            )}
                                        />
                                        <CommandList>
                                            <CommandEmpty>
                                                {t('No results')}
                                            </CommandEmpty>
                                            <CommandGroup>
                                                <CommandList>
                                                    {renderMemberOptions()}
                                                </CommandList>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            <InputError message={errors.member_id} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="books">{t('Books')}</Label>

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
                                        disabled={
                                            !data.member_id ||
                                            getAvailableCheckouts(
                                                data.member_id,
                                            ) === 0
                                        }
                                    >
                                        {t('Select books')}
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

                            <InputError message={errors.book_copies} />

                            {!!data.book_copies.length && renderSelectedBooks()}
                        </div>

                        <Button
                            type="submit"
                            disabled={
                                !data.member_id || !data.book_copies.length
                            }
                        >
                            {t('Lend')}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
