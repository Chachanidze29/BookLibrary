import { Link, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { PlusCircleIcon, TrashIcon } from 'lucide-react';
import { FormEventHandler } from 'react';

import { Button } from '@/Components/Button';
import FormInputSelect from '@/Components/FormInputs/FormInputSelect';
import { FormInputText } from '@/Components/FormInputs/FormInputText';
import { H4 } from '@/Components/Typography/H4';
import { SelectOption } from '@/types';
import { BookCopyForm, FormType } from '@/types/form';

export function Form({
    type,
    initialData,
    bookId,
    bookCopyId,
    branches,
    statuses,
    conditions,
}: {
    type: FormType;
    initialData: BookCopyForm;
    bookId: number;
    bookCopyId?: number;
    branches: SelectOption[];
    statuses: SelectOption[];
    conditions: SelectOption[];
}) {
    const { t } = useLaravelReactI18n();
    const singleForm = useForm<BookCopyForm>(initialData);
    const bulkForm = useForm<{ copies: BookCopyForm[] }>({
        copies: [initialData],
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        switch (type) {
            case FormType.Create:
                bulkForm.post(route('admin.books.copies.store', bookId));
                break;
            case FormType.Edit:
                singleForm.put(route('admin.copies.update', bookCopyId), {
                    onSuccess: () => {
                        document.dispatchEvent(
                            new KeyboardEvent('keydown', { key: 'Escape' }),
                        );
                    },
                });
                break;
            default:
                break;
        }
    };

    const submitButtonText = {
        [FormType.Create]: 'Add',
        [FormType.Edit]: 'Save',
    }[type];

    const renderSingleForm = () => {
        const { data, setData, errors } = singleForm;

        return (
            <div className="grid items-start gap-4 sm:grid-cols-2">
                <FormInputText
                    id="code"
                    type="text"
                    label={t('Code')}
                    value={data.code}
                    onChange={(e) => setData('code', e.target.value)}
                    error={errors.code}
                />

                <FormInputSelect
                    label={t('Branch')}
                    placeholder={t('Select a branch')}
                    value={data.branch_id?.toString() || ''}
                    options={branches}
                    onChange={(value) => {
                        const branch = branches.find(
                            (branch) => branch.id === parseInt(value),
                        );
                        setData('branch_id', branch?.id || null);
                    }}
                    error={errors.branch_id}
                />

                <FormInputSelect
                    label={t('Status')}
                    placeholder={t('Select a status')}
                    value={data.status_id?.toString() || ''}
                    options={statuses}
                    onChange={(value) => {
                        const status = statuses.find(
                            (status) => status.id === parseInt(value),
                        );
                        setData('status_id', status?.id || null);
                    }}
                    error={errors.status_id}
                />

                <FormInputSelect
                    label={t('Condition')}
                    placeholder={t('Select a condition')}
                    value={data.condition_id?.toString() || ''}
                    options={conditions}
                    onChange={(value) => {
                        const condition = conditions.find(
                            (condition) => condition.id === parseInt(value),
                        );
                        setData('condition_id', condition?.id || null);
                    }}
                    error={errors.condition_id}
                />
            </div>
        );
    };

    const renderBulkForm = () => {
        const { data, setData, errors } = bulkForm;

        type ErrorKey = keyof typeof errors;

        const handleValueChange = (
            index: number,
            key: string,
            value: string | number | null,
        ) => {
            const copies = data.copies.map((copy, i) => {
                if (i === index) {
                    return {
                        ...copy,
                        [key]: value,
                    };
                }

                return copy;
            });

            setData('copies', copies);
        };

        const handleRemoveCopy = (index: number) => {
            const copies = data.copies.filter((_, i) => i !== index);
            setData('copies', copies);
        };

        return data.copies.map((bookCopy, index) => (
            <div key={index} className="grid items-start gap-4 sm:grid-cols-2">
                <H4 className="my-0 sm:col-span-2">
                    {t('Copy')} #{index + 1}
                    {index > 0 && (
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => handleRemoveCopy(index)}
                            className="ml-4"
                        >
                            <TrashIcon className="h-4 w-4" />
                        </Button>
                    )}
                </H4>

                <FormInputText
                    id={`code-${index}`}
                    type="text"
                    label={t('Code')}
                    value={bookCopy.code}
                    onChange={(e) =>
                        handleValueChange(index, 'code', e.target.value)
                    }
                    error={errors[`copies.${index}.code` as ErrorKey]}
                />

                <FormInputSelect
                    label={t('Branch')}
                    placeholder={t('Select a branch')}
                    value={bookCopy.branch_id?.toString() || ''}
                    options={branches}
                    onChange={(value) => {
                        const branch = branches.find(
                            (branch) => branch.id === parseInt(value),
                        );
                        handleValueChange(
                            index,
                            'branch_id',
                            branch?.id || null,
                        );
                    }}
                    error={errors[`copies.${index}.branch_id` as ErrorKey]}
                />

                <FormInputSelect
                    label={t('Status')}
                    placeholder={t('Select a status')}
                    value={bookCopy.status_id?.toString() || ''}
                    options={statuses}
                    onChange={(value) => {
                        const status = statuses.find(
                            (status) => status.id === parseInt(value),
                        );
                        handleValueChange(
                            index,
                            'status_id',
                            status?.id || null,
                        );
                    }}
                    error={errors[`copies.${index}.status_id` as ErrorKey]}
                />

                <FormInputSelect
                    label={t('Condition')}
                    placeholder={t('Select a condition')}
                    value={bookCopy.condition_id?.toString() || ''}
                    options={conditions}
                    onChange={(value) => {
                        const condition = conditions.find(
                            (condition) => condition.id === parseInt(value),
                        );
                        handleValueChange(
                            index,
                            'condition_id',
                            condition?.id || null,
                        );
                    }}
                    error={errors[`copies.${index}.condition_id` as ErrorKey]}
                />
            </div>
        ));
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-grow flex-col gap-6">
            {type === FormType.Create ? (
                <>
                    {renderBulkForm()}
                    <div className="flex justify-center">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                                bulkForm.setData('copies', [
                                    ...bulkForm.data.copies,
                                    initialData,
                                ]);
                            }}
                        >
                            <PlusCircleIcon className="mr-2 h-4 w-4" />
                            {t('Add another copy')}
                        </Button>
                    </div>
                </>
            ) : (
                renderSingleForm()
            )}

            <div className="flex flex-grow items-end justify-between">
                {type === FormType.Create && (
                    <Button variant="ghost" asChild>
                        <Link href={route('admin.books.show', bookId)}>
                            {t('Back')}
                        </Link>
                    </Button>
                )}

                <Button
                    type="submit"
                    disabled={singleForm.processing || bulkForm.processing}
                    className={type === FormType.Edit ? 'w-full' : ''}
                >
                    {t(submitButtonText)}
                </Button>
            </div>
        </form>
    );
}
