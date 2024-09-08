import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Button } from '@/Components/Button';
import FormInputMultiSelect from '@/Components/FormInputs/FormInputMultiselect';
import FormInputText from '@/Components/FormInputs/FormInputText';
import MainLayout from '@/Layouts/MainLayout';
import { SelectOption } from '@/types';
import { SearchForm } from '@/types/form';

const initialData = {
    genres: [],
    authors: [],
    title: '',
    statuses: [],
    languages: [],
    branches: [],
    conditions: [],
};

const Index = ({
    authors,
    genres,
    statuses,
    languages,
    branches,
    conditions,
}: {
    authors: SelectOption[];
    genres: SelectOption[];
    statuses: SelectOption[];
    languages: SelectOption[];
    branches: SelectOption[];
    conditions: SelectOption[];
}) => {
    const { t } = useLaravelReactI18n();

    const { data, setData, get, processing, errors } =
        useForm<SearchForm>(initialData);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        get(route('books.search'));
    };

    return (
        <MainLayout>
            <form
                onSubmit={handleSubmit}
                className="mx-auto flex w-9/12 flex-col gap-6"
            >
                <FormInputText
                    id="title"
                    label={t('Title')}
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    error={errors.title}
                />

                <FormInputMultiSelect
                    id="authors"
                    label={t('Authors')}
                    options={authors}
                    selectedOptions={data.authors}
                    onChange={(options) => setData('authors', options)}
                    error={errors.authors}
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
                    id="statuses"
                    label={t('Statuses')}
                    options={statuses}
                    selectedOptions={data.statuses}
                    onChange={(options) => setData('statuses', options)}
                    error={errors.statuses}
                />

                <FormInputMultiSelect
                    id="languages"
                    label={t('Languages')}
                    options={languages}
                    selectedOptions={data.languages}
                    onChange={(options) => setData('languages', options)}
                    error={errors.languages}
                />

                <FormInputMultiSelect
                    id="branches"
                    label={t('Branches')}
                    options={branches}
                    selectedOptions={data.branches}
                    onChange={(options) => setData('branches', options)}
                    error={errors.branches}
                />

                <FormInputMultiSelect
                    id="conditions"
                    label={t('Conditions')}
                    options={conditions}
                    selectedOptions={data.conditions}
                    onChange={(options) => setData('conditions', options)}
                    error={errors.conditions}
                />

                <div className="flex flex-grow items-end justify-between">
                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full"
                    >
                        {t('Search')}
                    </Button>
                </div>
            </form>
        </MainLayout>
    );
};

export default Index;
