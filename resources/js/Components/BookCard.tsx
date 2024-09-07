import { Link } from '@inertiajs/react';
import { BookOpenTextIcon } from 'lucide-react';
import { Fragment } from 'react';

import { BookReservationDialog } from '@/Components/BookReservationDialog';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/Card';
import Image from '@/Components/Image';
import { WishlistButton } from '@/Components/WishlistButton';
import { Book } from '@/types/model';

export function BookCard({ book }: { book: Book }) {
    return (
        <Card className="group relative transition-shadow duration-300 hover:shadow-md">
            <Link href={route('books.show', book.id)} className="block">
                <CardHeader className="relative aspect-3/4 justify-center">
                    <WishlistButton book={book} isIcon />{' '}
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
            </Link>

            <CardFooter className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <BookReservationDialog book={book} />
            </CardFooter>
        </Card>
    );
}
