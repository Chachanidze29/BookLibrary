<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'review' => 'required|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $user_id = Auth::id();
        $book_id = $request->input('book_id');

        $existingReview = Review::where('user_id', $user_id)
            ->where('book_id', $book_id)
            ->first();

        if ($existingReview) {
            return redirect()->back();
        }

        Review::create([
            'user_id' => $user_id,
            'book_id' => $book_id,
            'review' => $request->input('review'),
            'rating' => $request->input('rating'),
        ]);

        return redirect()->route('books.show', $book_id);
    }

    public function destroy(Review $review) {
        $review->delete();

        return redirect()->back();
    }
}
