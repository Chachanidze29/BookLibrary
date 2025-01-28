import { useState } from 'react';

import { Book } from '@/types/model';

import AuthorsList from './AuthorsList';

const BooksShelf = ({ books }: { books: Book[] }) => {
    const [hoveredBook, setHoveredBook] = useState<Book | null>(null);

    return (
        <div className="bookshelf-container grid grid-cols-10 gap-2 p-4">
            {books.map((book) => (
                <div
                    key={book.id}
                    className="book relative h-40 w-6 cursor-pointer rounded-lg bg-gray-800"
                    onMouseEnter={() => setHoveredBook(book)}
                    onMouseLeave={() => setHoveredBook(null)}
                >
                    <div className="absolute left-0 top-0 h-full w-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white opacity-0 transition-opacity hover:opacity-100">
                        {book.title}
                    </div>
                </div>
            ))}

            {hoveredBook && (
                <div className="hovered-book-overlay fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                    <div className="book-detail max-w-md rounded-xl bg-white p-4 shadow-lg">
                        <h2 className="mb-2 text-xl font-bold">
                            {hoveredBook.title}
                        </h2>
                        <p className="text-sm text-gray-700">
                            <AuthorsList authors={hoveredBook.authors} />
                        </p>
                        <p className="mt-2 text-sm text-gray-600">
                            {hoveredBook.description}
                        </p>
                        <button
                            className="mt-4 rounded-lg bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
                            onClick={() =>
                                alert(`You selected: ${hoveredBook.title}`)
                            }
                        >
                            Select Book
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BooksShelf;
