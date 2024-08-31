import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { Link, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Button } from '@/Components/Button';
import MainLayout from '@/Layouts/MainLayout';
import useRoute from '@/lib/hooks/useRoute';
import { PageProps as MainPageProps } from '@/types';
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

    const {
        auth: { user },
    } = usePage<MainPageProps>().props;

    return (
        <MainLayout>
            <div className="mx-auto w-9/12">
                <h1 className="text-2xl font-bold">
                    {t(':count Search Results', { count: data.length })}
                </h1>
                <div className="flex flex-col items-start justify-start">
                    {data.map((book) => (
                        <Button key={book.id} variant="link" asChild>
                            <Link
                                className="pl-0"
                                href={useRoute('books.show', book.id)}
                            >
                                {book.title} -{' '}
                                {book.authors
                                    .map((author) => author.name)
                                    .join(', ')}
                            </Link>
                        </Button>
                    ))}
                </div>
                <div className="mt-4">
                    <div className="flex justify-center">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                disabled={!link.url}
                                className={`mx-1 px-2 py-1 ${link.active ? 'font-bold' : 'text-gray-500'}`}
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
