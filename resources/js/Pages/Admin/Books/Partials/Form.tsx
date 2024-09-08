import { Link, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler } from 'react';

import { Button } from '@/Components/Button';
import { FormInputDateTimePicker } from '@/Components/FormInputs/FormInputDatetimePicker';
import { FormInputFile } from '@/Components/FormInputs/FormInputFile';
import { FormInputMultiSelect } from '@/Components/FormInputs/FormInputMultiselect';
import { FormInputSelect } from '@/Components/FormInputs/FormInputSelect';
import { FormInputText } from '@/Components/FormInputs/FormInputText';
import { FormInputTextarea } from '@/Components/FormInputs/FormInputTextarea';
import { SelectOption } from '@/types';
import { BookForm, FormType } from '@/types/form';

export function Form({
    type,
    initialData,
    bookId,
    languages,
    genres,
    authors,
}: {
    type: FormType;
    initialData: BookForm;
    bookId?: number;
    languages: SelectOption[];
    genres: SelectOption[];
    authors: SelectOption[];
}) {
    const { t } = useLaravelReactI18n();
    const { data, setData, post, put, processing, errors, progress } =
        useForm<BookForm>({
            ...initialData,
            cover_image: undefined,
        });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        switch (type) {
            case FormType.Create:
                post(route('admin.books.store'));
                break;
            case FormType.Edit:
                post(route('admin.books.update', bookId));
                break;
            default:
                break;
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setData('cover_image', e.target.files[0]);
        }
    };

    const submitButtonText = {
        [FormType.Create]: 'Add',
        [FormType.Edit]: 'Save',
    }[type];

    return (
        <form onSubmit={handleSubmit} className="flex flex-grow flex-col gap-6">
            <div className="grid items-start gap-4 sm:grid-cols-2">
                <FormInputText
                    id="title"
                    type="text"
                    label={t('Title')}
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    error={errors.title}
                />

                <FormInputFile
                    id="cover_image"
                    type={type}
                    label={t('Image')}
                    onChange={handleFileChange}
                    error={errors.cover_image}
                />

                <FormInputText
                    id="isbn"
                    type="text"
                    label={t('ISBN')}
                    value={data.isbn}
                    onChange={(e) => setData('isbn', e.target.value)}
                    error={errors.isbn}
                />

                <FormInputTextarea
                    id="description"
                    label={t('Description')}
                    value={data.description || ''}
                    onChange={(e) => setData('description', e.target.value)}
                    error={errors.description}
                />

                <FormInputSelect
                    label={t('Language')}
                    placeholder={t('Select a language')}
                    value={data.language_id?.toString() || ''}
                    options={languages}
                    onChange={(value) => {
                        const language = languages.find(
                            (language) => language.id === parseInt(value),
                        );
                        setData('language_id', language?.id || null);
                    }}
                    error={errors.language_id}
                />

                <FormInputDateTimePicker
                    id="publication_date"
                    label={t('Publication date')}
                    value={data.publication_date}
                    onChange={(value) => setData('publication_date', value)}
                    error={errors.publication_date}
                />

                <FormInputMultiSelect
                    id="genres"
                    label={t('Genres')}
                    options={genres}
                    selectedOptions={data.genres}
                    onChange={(options) => setData('genres', options)}
                    error={errors.genres}
                />

                <FormInputMultiSelect
                    id="authors"
                    label={t('Authors')}
                    options={authors}
                    selectedOptions={data.authors}
                    onChange={(options) => setData('authors', options)}
                    error={errors.authors}
                />
            </div>

            <div className="flex flex-grow items-end justify-between">
                <Button variant="ghost" asChild>
                    <Link href={route('admin.books.index')}>{t('Back')}</Link>
                </Button>
                <Button type="submit" disabled={processing}>
                    {t(submitButtonText)}
                </Button>
            </div>
        </form>
    );
}
