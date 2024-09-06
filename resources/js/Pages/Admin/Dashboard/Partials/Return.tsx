import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import {
    ArrowDownToLineIcon,
    CheckIcon,
    ChevronsUpDownIcon,
} from 'lucide-react';
import * as React from 'react';

import { Button } from '@/Components/Button';
import { Checkbox } from '@/Components/Checkbox';
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

    const renderMemberOptions = () => {
        return members.map((member) => (
            <CommandItem
                key={member.id}
                value={member.first_name}
                onSelect={(currentValue) => {
                    const memberId = members.filter(
                        (member) => member.first_name === currentValue,
                    )[0].id;
                    reset();
                    setData((data) => ({ ...data, member_id: memberId }));
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
                                                        getCheckout(id).lost
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
                                                <label htmlFor={`lost-${id}`}>
                                                    {t('Lost')}
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    checked={
                                                        getCheckout(id).damaged
                                                    }
                                                    id={`damaged-${id}`}
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

    const getCheckout = (id: number) => {
        return data.checkouts.filter((checkout) => checkout.id === id)[0];
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
                                                'Start searching...',
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
