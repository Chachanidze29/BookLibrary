import { Link, router } from '@inertiajs/react';
import { BookOpenTextIcon, HeartIcon } from 'lucide-react';
import { Fragment } from 'react';

import { Card, CardContent, CardHeader } from '@/Components/Card';
import Image from '@/Components/Image';
import { cn } from '@/lib/utils';
import { Book } from '@/types/model';

export function BookCard({ book }: { book: Book }) {
    const addToWishlist = () => {
        router.post(route('wishlist.store', { book_id: book.id }));
    };

    const removeFromWishlist = () => {
        router.delete(route('wishlist.destroy', book.id));
    };

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (book.is_in_wishlist) {
            removeFromWishlist();
        } else {
            addToWishlist();
        }
    };

    return (
        <Link href={route('books.show', book.id)}>
            <Card className="transition-shadow duration-300 hover:shadow-md">
                <CardHeader className="relative aspect-3/4 justify-center">
                    <HeartIcon
                        onClick={handleWishlistClick}
                        className={cn(
                            'absolute right-1 top-1 text-red-500 hover:fill-red-500',
                            { 'fill-red-500': book.is_in_wishlist },
                            'transition-transform duration-300 hover:scale-110',
                        )}
                    />

                    {book.cover_image ? (
                        <Image
                            src={'/storage/' + book.cover_image}
                            alt={book.title}
                            className="h-full rounded object-cover"
                            fallbackSrc="https://via.placeholder.com/150?text=Book+Image"
                        />
                    ) : (
                        <BookOpenTextIcon className="h-1/3 w-full text-gray-300" />
                    )}
                </CardHeader>

                <CardContent className="flex flex-col gap-1">
                    <p className="line-clamp-3 text-lg font-semibold">
                        {book.title}
                    </p>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
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
                </CardContent>
            </Card>
        </Link>
    );
}
