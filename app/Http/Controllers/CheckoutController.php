<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    public function index()
    {
        $checkouts = Auth::user()->checkouts()
            ->orderBy('created_at', 'desc')
            ->with('bookCopy:id,code,book_id', 'bookCopy.book:id,title')
            ->select('id', 'book_copy_id', 'checkout_date', 'due_date', 'return_date')
            ->get();

        return inertia('Checkouts/Index', [
            'checkouts' => $checkouts,
        ]);
    }
}
