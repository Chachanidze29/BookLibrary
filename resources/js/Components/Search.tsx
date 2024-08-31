import { router } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { SearchIcon } from 'lucide-react';
import * as React from 'react';

import { Input } from '@/Components/Input';
import { cn } from '@/lib/utils';

import { Button } from './Button';

export function Search({ className }: { className?: string }) {
    const { t } = useLaravelReactI18n();

    const [query, setQuery] = React.useState('');

    const handleSearch = () => {
        router.get(route('books.search'), { title: query });
    };

    return (
        <div
            className={cn('flex w-full flex-col items-center gap-2', className)}
        >
            <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSearch();
                    }
                }}
                id="search"
                placeholder={t('Search books by title...')}
                className="h-11"
            />

            <Button size="lg" className="mt-2" onClick={handleSearch}>
                <SearchIcon className="mr-2 h-4 w-4" />
                {t('Search')}
            </Button>
        </div>
    );
}
