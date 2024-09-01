import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { Link, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { BookCard } from '@/Components/BookCard';
import { BookCardLarge } from '@/Components/BookCardLarge';
import MainLayout from '@/Layouts/MainLayout';
import { PaginationLink } from '@/types/global';
import { Book } from '@/types/model';

export interface Pagination {
    data: Book[];
    links: PaginationLink[];
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}

export interface PageProps extends InertiaPageProps {
    books: Pagination;
}

const BooksList = () => {
    const { books } = usePage<PageProps>().props;

    const { data, links } = books;

    const { t } = useLaravelReactI18n();

    return (
        <MainLayout>
            <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
                <h1 className="mt-4 text-center text-2xl font-bold">
                    {t(':count Search Results', { count: data.length })}
                </h1>
                <div className="mt-4 space-y-4">
                    {data.map((book) => (
                        <div
                            key={book.id}
                            className="block md:flex md:items-start md:justify-between"
                        >
                            <div className="md:hidden">
                                <BookCard book={book} />
                            </div>
                            <div className="hidden w-full items-start justify-between rounded-lg bg-white p-4 shadow-sm md:flex">
                                <BookCardLarge book={book} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8">
                    <div className="flex flex-wrap justify-center">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                disabled={!link.url}
                                className={`mx-1 px-2 py-1 text-sm ${link.active ? 'font-bold' : 'text-gray-500'} ${!link.url ? 'cursor-not-allowed' : ''}`}
                                href={link.url ? link.url : '#'}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default BooksList;
