<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CatalogController extends Controller
{
    public function index(Request $request)
    {
        $filters = [
            'authors' => array_map('intval', $request->input('authors', [])),
            'genres' => array_map('intval', $request->input('genres', [])),
        ];

        $query = Book::query();
        $query->orderBy('created_at', 'desc');

        if (!empty($filters['authors'])) {
            $query->whereHas('authors', function ($q) use ($filters) {
                $q->whereIn('authors.id', $filters['authors']);
            });
        }

        if (!empty($filters['genres'])) {
            $query->whereHas('genres', function ($q) use ($filters) {
                $q->whereIn('genres.id', $filters['genres']);
            });
        }

        $books = $query->with(['authors', 'genres', 'bookCopies.branch'])->paginate(27);

        // Get the current user's wishlist book IDs
        $wishlistBookIds = Auth::check() ? Auth::user()->wishlists->pluck('book_id')->toArray() : [];

        // Attach wishlist information to each book
        $books->getCollection()->transform(function ($book) use ($wishlistBookIds) {
            $book->is_in_wishlist = in_array($book->id, $wishlistBookIds);
            return $book;
        });

        return Inertia::render('Catalog', [
            'books' => $books,
            'categories' => [
                'authors' => Author::all(),
                'genres' => Genre::all(),
            ],
            'filters' => $filters,
        ]);
    }
}
