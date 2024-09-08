import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler } from 'react';

import { Button } from '@/Components/Button';
import { Checkbox } from '@/Components/Checkbox';
import { FormInputText } from '@/Components/FormInputs/FormInputText';
import { InputError } from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { BranchForm, FormType } from '@/types/form';

export function Form({
    type,
    initialData,
    branchId,
}: {
    type: FormType;
    initialData: BranchForm;
    branchId?: number;
}) {
    const { t } = useLaravelReactI18n();
    const { data, setData, post, put, processing, errors } =
        useForm<BranchForm>(initialData);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        switch (type) {
            case FormType.Create:
                post(route('admin.branches.store'), {
                    onSuccess: () => {
                        document.dispatchEvent(
                            new KeyboardEvent('keydown', { key: 'Escape' }),
                        );
                    },
                });
                break;
            case FormType.Edit:
                put(route('admin.branches.update', branchId), {
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

    return (
        <form onSubmit={handleSubmit} className="flex flex-grow flex-col gap-6">
            <div className="grid items-start gap-4">
                <div className="grid gap-2">
                    <InputLabel htmlFor="is_enabled">{t('Enabled')}</InputLabel>
                    <Checkbox
                        checked={data.is_enabled}
                        onCheckedChange={(value) =>
                            setData('is_enabled', !!value)
                        }
                    />
                    <InputError message={errors.is_enabled} />
                </div>

                <FormInputText
                    id="name"
                    type="text"
                    label={t('Name')}
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                />

                <FormInputText
                    id="address"
                    type="text"
                    label={t('Address')}
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                    error={errors.address}
                />

                <FormInputText
                    id="phone"
                    type="text"
                    label={t('Phone')}
                    value={data.phone || ''}
                    onChange={(e) => setData('phone', e.target.value)}
                    error={errors.phone}
                />

                <FormInputText
                    id="email"
                    type="text"
                    label={t('Email')}
                    value={data.email || ''}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                />

                <FormInputText
                    id="working_hours"
                    type="text"
                    label={t('Working hours')}
                    value={data.working_hours}
                    onChange={(e) => setData('working_hours', e.target.value)}
                    error={errors.working_hours}
                />
            </div>

            <div className="flex flex-grow items-end justify-between">
                <Button type="submit" disabled={processing} className="w-full">
                    {t(submitButtonText)}
                </Button>
            </div>
        </form>
    );
}
