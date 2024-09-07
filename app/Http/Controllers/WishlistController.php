<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $wishlists = $user->wishlists()
            ->with(['book.authors', 'book.bookCopies.branch'])
            ->orderBy('created_at', 'desc')
            ->get();

        $wishlistBookIds = $user->wishlists->pluck('book_id')->toArray();

        $wishlists->each(function ($wishlist) use ($wishlistBookIds) {
            $wishlist->book->is_in_wishlist = in_array($wishlist->book->id, $wishlistBookIds);
        });

        return inertia('Wishlist', ['wishlists' => $wishlists]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
        ]);

        $user = Auth::user();
        $exists = $user->wishlists()->where('book_id', $request->book_id)->exists();

        if ($exists) {
            return redirect()->route('wishlist')->with('message', 'Book is already in your wishlist.');
        }

        $user->wishlists()->create([
            'book_id' => $request->book_id,
        ]);

        return redirect()->route('wishlist')->with('message', 'Book added to your wishlist.');
    }

    public function destroy($id)
    {
        $user = Auth::user();
        $wishlist = $user->wishlists()->where('book_id', $id)->first();

        $wishlist->delete();

        return redirect()->route('wishlist');
    }
}
