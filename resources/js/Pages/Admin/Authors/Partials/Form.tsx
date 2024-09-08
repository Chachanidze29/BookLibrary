import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler } from 'react';

import { Button } from '@/Components/Button';
import { FormInputFile } from '@/Components/FormInputs/FormInputFile';
import { FormInputText } from '@/Components/FormInputs/FormInputText';
import { FormInputTextarea } from '@/Components/FormInputs/FormInputTextarea';
import { AuthorForm, FormType } from '@/types/form';

export function Form({
    type,
    initialData,
    authorId,
}: {
    type: FormType;
    initialData: AuthorForm;
    authorId?: number;
}) {
    const { t } = useLaravelReactI18n();
    const { data, setData, post, put, processing, errors } =
        useForm<AuthorForm>({
            ...initialData,
            cover_image: undefined,
        });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        switch (type) {
            case FormType.Create:
                post(route('admin.authors.store'), {
                    onSuccess: () => {
                        document.dispatchEvent(
                            new KeyboardEvent('keydown', { key: 'Escape' }),
                        );
                    },
                });
                break;
            case FormType.Edit:
                put(route('admin.authors.update', authorId), {
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setData('cover_image', e.target.files[0]);
        }
    };

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

                <FormInputFile
                    id="cover_image"
                    type={type}
                    label={t('Image')}
                    onChange={handleFileChange}
                    error={errors.cover_image}
                />

                <FormInputTextarea
                    id="bio"
                    label={t('Bio')}
                    value={data.bio || ''}
                    onChange={(e) => setData('bio', e.target.value)}
                    error={errors.bio}
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
