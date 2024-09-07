<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index() {
        $newBooks = Book::with(['authors', 'bookCopies.branch'])
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();

        $wishlistBookIds = Auth::check() ? Auth::user()->wishlists->pluck('book_id')->toArray() : [];
        $newBooks->each(function ($book) use ($wishlistBookIds) {
            $book->is_in_wishlist = in_array($book->id, $wishlistBookIds);
        });

        return Inertia::render('Home', [
            'newBooks' => $newBooks,
            'authors' => Author::limit(12)->get(),
        ]);
    }
}
