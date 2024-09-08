import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { ArrowDownToLineIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/Components/Button';
import { Checkbox } from '@/Components/Checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/Dialog';
import FormInputPopover from '@/Components/FormInputs/FormInputPopover';
import { InputError } from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { ReturnData } from '@/types';

export default function Return({
    data: { members, checkouts },
}: {
    data: ReturnData;
}) {
    const { t } = useLaravelReactI18n();
    const { data, setData, put, errors, reset } = useForm<{
        member_id: number | null;
        checkouts: {
            id: number;
            lost: boolean;
            damaged: boolean;
        }[];
    }>({
        member_id: null,
        checkouts: [],
    });

    const [memberPopoverOpen, setMemberPopoverOpen] = React.useState(false);
    const [memberInputValue, setMemberInputValue] = React.useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        put(route('admin.checkout.massUpdate'));

        reset();
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    };

    const renderMember = (id: number) => {
        const member = members.find((member) => member.id === id);

        return member ? (
            <div className="flex flex-col items-start gap-1">
                <p>
                    {member.first_name} {member.last_name}
                </p>
                <p className="text-xs text-muted-foreground">
                    {member.personal_number}
                </p>
            </div>
        ) : null;
    };

    const getCheckout = (id: number) => {
        return data.checkouts.find((checkout) => checkout.id === id);
    };

    const renderCheckouts = () => {
        return (
            <div className="grid gap-4 py-4">
                {checkouts
                    .filter((checkout) => checkout.user_id === data.member_id)
                    .map((checkout) => {
                        const {
                            id,
                            book_copy: {
                                code,
                                book: { title },
                            },
                            checkout_date,
                            due_date,
                        } = checkout;
                        const isChecked = !!getCheckout(id);

                        return (
                            <div key={id} className="flex gap-4">
                                <Checkbox
                                    checked={isChecked}
                                    onCheckedChange={(checked) =>
                                        setData(
                                            'checkouts',
                                            checked
                                                ? [
                                                      ...data.checkouts,
                                                      {
                                                          id,
                                                          lost: false,
                                                          damaged: false,
                                                      },
                                                  ]
                                                : data.checkouts.filter(
                                                      (checkout) =>
                                                          checkout.id !== id,
                                                  ),
                                        )
                                    }
                                    id={`checkout-${id}`}
                                />
                                <label
                                    htmlFor={`checkout-${id}`}
                                    className="flex cursor-pointer flex-col gap-1"
                                >
                                    <p className="text-sm font-medium">
                                        {title}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {code}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(
                                            checkout_date,
                                        ).toLocaleDateString()}{' '}
                                        -{' '}
                                        {new Date(
                                            due_date,
                                        ).toLocaleDateString()}
                                    </p>

                                    {isChecked && (
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    checked={
                                                        getCheckout(id)?.lost ||
                                                        false
                                                    }
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        setData('checkouts', [
                                                            ...data.checkouts.filter(
                                                                (checkout) =>
                                                                    checkout.id !==
                                                                    id,
                                                            ),
                                                            {
                                                                id,
                                                                lost: !!checked,
                                                                damaged: false,
                                                            },
                                                        ])
                                                    }
                                                    id={`lost-${id}`}
                                                />
                                                <InputLabel
                                                    htmlFor={`lost-${id}`}
                                                >
                                                    {t('Lost')}
                                                </InputLabel>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    checked={
                                                        getCheckout(id)
                                                            ?.damaged || false
                                                    }
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        setData('checkouts', [
                                                            ...data.checkouts.filter(
                                                                (checkout) =>
                                                                    checkout.id !==
                                                                    id,
                                                            ),
                                                            {
                                                                id,
                                                                lost: false,
                                                                damaged:
                                                                    !!checked,
                                                            },
                                                        ])
                                                    }
                                                    id={`damaged-${id}`}
                                                />
                                                <label
                                                    htmlFor={`damaged-${id}`}
                                                >
                                                    {t('Damaged')}
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </label>
                            </div>
                        );
                    })}
            </div>
        );
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full flex-grow">
                    <ArrowDownToLineIcon className="mr-2 h-4 w-4" />
                    {t('Return')}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('Return a book')}</DialogTitle>
                    <DialogDescription>
                        {t('Fill out the form to return a book')}
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
                            selectedOption={members.find(
                                (member) => member.id === data.member_id,
                            )}
                            onSelect={(member) => {
                                reset();
                                setData((data) => ({
                                    ...data,
                                    member_id: member.id,
                                }));
                            }}
                            renderOption={(member) => (
                                <div>
                                    {member.first_name} {member.last_name}
                                </div>
                            )}
                            emptyMessage={t('No results')}
                            placeholder={t('Select a member')}
                            label={t('Member')}
                        />

                        <InputError message={errors.member_id} />

                        {!!data.member_id && renderCheckouts()}

                        <Button
                            type="submit"
                            disabled={!data.member_id || !data.checkouts.length}
                        >
                            {t('Return')}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
