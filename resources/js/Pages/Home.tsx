import { Head } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { AuthorCard } from '@/Components/AuthorCard';
import { BookCard } from '@/Components/BookCard';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/Components/Carousel';
import { H3 } from '@/Components/Typography/H3';
import MainLayout from '@/Layouts/MainLayout';
import { Author, Book } from '@/types/model';

export default function Home({
    newBooks,
    authors,
}: {
    newBooks: Book[];
    authors: Author[];
}) {
    const { t } = useLaravelReactI18n();

    return (
        <MainLayout>
            <Head title={t('Home')} />

            <div className="-mt-8 bg-primary-foreground py-12">
                <div className="container">
                    <h1 className="text-4xl font-bold">
                        {t('Welcome to the Library')}
                    </h1>
                    <p className="text-lg">{t('Find your next book here')}</p>
                </div>
            </div>

            <div className="container">
                <H3 className="mb-4">{t('New Books')}</H3>

                <Carousel
                    opts={{
                        align: 'start',
                    }}
                    className="mx-12"
                >
                    <CarouselContent>
                        {newBooks.map((book) => (
                            <CarouselItem
                                key={book.id}
                                className="md:basis-1/3 lg:basis-1/4"
                            >
                                <div className="h-full p-2">
                                    <BookCard book={book} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

            <div className="container">
                <H3 className="mb-4">{t('Authors')}</H3>

                <Carousel
                    opts={{
                        align: 'start',
                    }}
                    className="mx-12"
                >
                    <CarouselContent>
                        {authors.map((author) => (
                            <CarouselItem
                                key={author.id}
                                className="md:basis-1/3 lg:basis-1/4"
                            >
                                <div className="h-full p-2">
                                    <AuthorCard author={author} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </MainLayout>
    );
}
