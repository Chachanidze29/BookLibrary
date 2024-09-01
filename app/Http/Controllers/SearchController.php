<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\BookCopyStatus;
use App\Models\Branch;
use App\Models\Condition;
use App\Models\Genre;
use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index()
    {
        return Inertia::render('Search/Index', [
            'languages' => Language::get(['id', 'name']),
            'statuses' => BookCopyStatus::get(['id', 'name']),
            'conditions' => Condition::get(['id', 'name']),
            'genres' => Genre::get(['id', 'name']),
            'authors' => Author::get(['id', 'name']),
            'branches' => Branch::get(['id', 'name'])
        ]);
    }

    public function search(Request $request)
    {
        $query = Book::query();

        if ($request->filled('title')) {
            $query->where('title', 'like', '%' . $request->input('title') . '%');
        }

        if ($request->filled('authors') && !empty($request->input('authors'))) {
            $query->whereHas('authors', function ($q) use ($request) {
                $q->whereIn('authors.id', $request->input('authors'));
            });
        }

        if ($request->filled('genres') && !empty($request->input('genres'))) {
            $query->whereHas('genres', function ($q) use ($request) {
                $q->whereIn('genres.id', $request->input('genres'));
            });
        }

        if ($request->filled('statuses') && !empty($request->input('statuses'))) {
            $query->whereHas('bookCopies', function ($q) use ($request) {
                $q->whereIn('book_copies.status_id', $request->input('statuses'));
            });
        }

        if ($request->filled('languages') && !empty($request->input('languages'))) {
            $query->whereIn('language_id', $request->input('languages'));
        }

        if ($request->filled('branches') && !empty($request->input('branches'))) {
            $query->whereHas('bookCopies', function ($q) use ($request) {
                $q->whereIn('book_copies.branch_id', $request->input('branches'));
            });
        }

        if ($request->filled('conditions') && !empty($request->input('conditions'))) {
            $query->whereHas('bookCopies', function ($q) use ($request) {
                $q->whereIn('book_copies.condition_id', $request->input('conditions'));
            });
        }

        $books = $query->with('authors')->paginate(20);

        $wishlistBookIds = Auth::check() ? Auth::user()->wishlists->pluck('book_id')->toArray() : [];
        $books->getCollection()->transform(function ($book) use ($wishlistBookIds) {
            $book->is_in_wishlist = in_array($book->id, $wishlistBookIds);
            return $book;
        });

        return Inertia::render('Search/BooksList', [
            'books' => $books,
        ]);
    }
}
