import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { ArrowUpFromLineIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/Components/Button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/Dialog';
import { FormInputPopover } from '@/Components/FormInputs/FormInputPopover';
import { InputError } from '@/Components/InputError';
import { LendData } from '@/types';
import { BookCopy, Member } from '@/types/model';

export default function Lend({
    data: { members, book_copies },
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

    const renderMember = (member: Member) => (
        <div className="flex flex-col items-start gap-1">
            <p>
                {member.first_name} {member.last_name}
            </p>
            <p className="text-xs text-muted-foreground">
                {member.personal_number}
            </p>
        </div>
    );

    const renderBookOption = (bookCopy: BookCopy) => (
        <div className="flex flex-col items-start gap-1">
            <p>{bookCopy.book.title}</p>
            <p className="text-xs text-muted-foreground">
                {bookCopy.code} - {bookCopy.branch.name}
            </p>
        </div>
    );

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
                        <FormInputPopover
                            isOpen={memberPopoverOpen}
                            setIsOpen={setMemberPopoverOpen}
                            inputValue={memberInputValue}
                            setInputValue={setMemberInputValue}
                            options={members}
                            selectedOption={
                                data.member_id &&
                                members.find((m) => m.id === data.member_id)
                            }
                            onSelect={(member) =>
                                setData('member_id', member.id)
                            }
                            renderOption={renderMember}
                            emptyMessage={t('No results')}
                            placeholder={t('Select a member')}
                            label={t('Member')}
                        />
                        <InputError message={errors.member_id} />

                        <FormInputPopover
                            isOpen={bookCopiesPopoverOpen}
                            setIsOpen={setBookCopiesPopoverOpen}
                            inputValue={bookCopiesInputValue}
                            setInputValue={setBookCopiesInputValue}
                            options={book_copies}
                            selectedOption={
                                data.book_copies &&
                                book_copies.find((b) =>
                                    data.book_copies.includes(b.id),
                                )
                            }
                            onSelect={(bookCopy) => {
                                const newBookCopies = data.book_copies.includes(
                                    bookCopy.id,
                                )
                                    ? data.book_copies.filter(
                                          (id) => id !== bookCopy.id,
                                      )
                                    : [...data.book_copies, bookCopy.id];
                                setData('book_copies', newBookCopies);
                            }}
                            renderOption={renderBookOption}
                            emptyMessage={t('No results')}
                            placeholder={t('Select books')}
                            label={t('Books')}
                            disabled={!data.member_id}
                        />
                        <InputError message={errors.book_copies} />

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
