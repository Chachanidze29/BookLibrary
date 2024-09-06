<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Inertia\Inertia;

class AuthorController extends Controller
{
    public function show(Author $author) {
        $author = Author::with(['books.language', 'books' => function($query) {
            $query->withCount('bookCopies');
        }])->find($author->id);

        return Inertia::render('Authors/Show', [
            'author' => $author,
            'books' => $author->books,
        ]);
    }
}
