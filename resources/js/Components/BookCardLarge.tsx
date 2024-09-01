import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { BookOpenTextIcon } from 'lucide-react';
import { Fragment } from 'react';

import { Button } from '@/Components/Button';
import Image from '@/Components/Image';
import { Book } from '@/types/model';

export const BookCardLarge = ({ book }: { book: Book }) => {
    const { t } = useLaravelReactI18n();

    return (
        <>
            <div className="flex items-center">
                {book.cover_image ? (
                    <Image
                        src={'/storage/' + book.cover_image}
                        alt={book.title}
                        className="h-full rounded object-cover"
                        fallbackSrc="https://via.placeholder.com/150?text=Book+Image"
                    />
                ) : (
                    <BookOpenTextIcon className="h-16 w-16 text-gray-300" />
                )}
                <div className="ml-4">
                    <Link href={route('books.show', book.id)}>
                        <h3 className="text-xl font-semibold">{book.title}</h3>
                    </Link>
                    <p className="text-gray-600">
                        {book.authors.map((author, index) => (
                            <Fragment key={author.id}>
                                <Link
                                    className="hover:text-blue-500"
                                    href={route('authors.show', author.id)}
                                >
                                    {author.name}
                                </Link>
                                {index < book.authors.length - 1 && ', '}
                            </Fragment>
                        ))}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                        {t('Published in :date', {
                            date: book.publication_date,
                        })}
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <Button variant="outline">{t('Reserve')}</Button>
                <Button variant="outline" className="mt-2">
                    {t('Add To Wishlist')}
                </Button>
            </div>
        </>
    );
};
