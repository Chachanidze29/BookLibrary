import { Link, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler } from 'react';

import { Button } from '@/Components/Button';
import { DateTimePicker } from '@/Components/DateTimePicker';
import { Input } from '@/Components/Input';
import { InputError } from '@/Components/InputError';
import { Label } from '@/Components/Label';
import { MultiSelect } from '@/Components/MultiSelect';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/Select';
import { Textarea } from '@/Components/Textarea';
import { getParsedDate } from '@/lib/utils';
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
                <div className="grid gap-2">
                    <Label htmlFor="title">{t('Title')}</Label>
                    <Input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        id="title"
                    />
                    <InputError message={errors.title} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="cover_image">Image</Label>
                    <Input
                        type="file"
                        name="image"
                        required={type === FormType.Edit ? false : true}
                        onChange={handleFileChange}
                    />
                    <InputError message={errors.cover_image} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="isbn">{t('ISBN')}</Label>
                    <Input
                        type="text"
                        value={data.isbn}
                        onChange={(e) => setData('isbn', e.target.value)}
                        id="isbn"
                    />
                    <InputError message={errors.isbn} />
                </div>

                <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="description">{t('Description')}</Label>
                    <Textarea
                        value={data.description || ''}
                        onChange={(e) => setData('description', e.target.value)}
                        id="description"
                        className="resize-none"
                    />
                    <InputError message={errors.description} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="language_id">{t('Language')}</Label>
                    <Select
                        value={data.language_id?.toString() || ''}
                        onValueChange={(value) => {
                            const language = languages.find(
                                (language) => language.id === parseInt(value),
                            );
                            setData('language_id', language?.id || null);
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('Select a language')} />
                        </SelectTrigger>
                        <SelectContent>
                            {languages.map((language) => (
                                <SelectItem
                                    key={language.id}
                                    value={language.id.toString()}
                                >
                                    {t(language.name)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.language_id} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="publication_date">
                        {t('Publication date')}
                    </Label>
                    <DateTimePicker
                        label={t('Publication date')}
                        value={getParsedDate(data.publication_date)}
                        onChange={(value) =>
                            setData('publication_date', value?.toString() || '')
                        }
                        shouldForceLeadingZeros
                    />
                    <InputError message={errors.publication_date} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="genres">{t('Genres')}</Label>
                    <MultiSelect
                        options={genres}
                        selectedOptions={data.genres}
                        onValueChange={(options) => setData('genres', options)}
                    />
                    <InputError message={errors.genres} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="authors">{t('Authors')}</Label>
                    <MultiSelect
                        options={authors}
                        selectedOptions={data.authors}
                        onValueChange={(options) => setData('authors', options)}
                    />
                    <InputError message={errors.authors} />
                </div>
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
