<?php

namespace App\Services;

use App\Models\Book;
use DateTime;
use Exception;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class BookService
{
    /**
     * @param array $data
     *
     * @return Book
     *
     * @throws Exception
     */
    public function createBook(array $data): Book
    {
        return DB::transaction(function () use ($data) {
            if (isset($data['cover_image']) && $data['cover_image'] instanceof UploadedFile) {
                $path = $data['cover_image']->store('books', 'public');
                $data['cover_image'] = $path;
            }

            $publicationDate = new DateTime($data['publication_date']);

            $book = Book::create([
                ...$data,
                'publication_date' => $publicationDate->format('Y-m-d'),
            ]);

            $book->genres()->sync($data['genres']);
            $book->authors()->sync($data['authors']);

            return $book;
        });
    }


    /**
     * @param array $data
     * @param string $id
     *
     * @return Book
     *
     * @throws Exception
     */
    public function updateBook(array $data, string $id): Book
    {
        return DB::transaction(function () use ($data, $id) {
            $book = Book::findOrFail($id);
            if (array_key_exists('cover_image', $data) && $data['cover_image'] instanceof UploadedFile) {
                $path = $data['cover_image']->store('books', 'public');
                $data['cover_image'] = $path;
            }

            $book->update([
                'title' => $data['title'] ?? $book->title,
                'isbn' => $data['isbn'] ?? $book->isbn,
                'description' => $data['description'] ?? $book->description,
                'publication_date' => isset($data['publication_date']) ? (new DateTime($data['publication_date']))->format('Y-m-d') : $book->publication_date,
                'language_id' => $data['language_id'] ?? $book->language_id,
                'cover_image' => $data['cover_image'] ?? $book->cover_image,
            ]);

            if (array_key_exists('genres', $data)) {
                $book->genres()->sync($data['genres']);
            }

            if (array_key_exists('authors', $data)) {
                $book->authors()->sync($data['authors']);
            }

            return $book;
        });
    }
}
