import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler } from 'react';

import { Button } from '@/Components/Button';
import FormInputText from '@/Components/FormInputs/FormInputText';
import { FormType, GenreForm } from '@/types/form';

export function Form({
    type,
    initialData,
    genreId,
}: {
    type: FormType;
    initialData: GenreForm;
    genreId?: number;
}) {
    const { t } = useLaravelReactI18n();
    const { data, setData, post, put, processing, errors } =
        useForm<GenreForm>(initialData);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        switch (type) {
            case FormType.Create:
                post(route('admin.genres.store'), {
                    onSuccess: () => {
                        document.dispatchEvent(
                            new KeyboardEvent('keydown', { key: 'Escape' }),
                        );
                    },
                });
                break;
            case FormType.Edit:
                put(route('admin.genres.update', genreId), {
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
                <FormInputText
                    id="name"
                    type="text"
                    label={t('Name')}
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
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
