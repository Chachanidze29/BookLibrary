import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { BookOpenTextIcon } from 'lucide-react';

import { BookReservationDialog } from '@/Components/BookReservationDialog';
import Image from '@/Components/Image';
import { WishlistButton } from '@/Components/WishlistButton';
import { Book } from '@/types/model';

import AuthorsList from './AuthorsList';

export const BookCardLarge = ({ book }: { book: Book }) => {
    const { t } = useLaravelReactI18n();

    return (
        <>
            <div className="flex items-center">
                {book.cover_image ? (
                    <Image
                        src={'/storage/' + book.cover_image}
                        alt={book.title}
                        className="h-full w-16 rounded object-cover"
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
                        <AuthorsList authors={book.authors} />
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                        {t('Published in :date', {
                            date: book.publication_date,
                        })}
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <BookReservationDialog book={book} />
                <WishlistButton book={book} isIcon={false} />
            </div>
        </>
    );
};
