<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\WishlistController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/catalog', [CatalogController::class, 'index'])->name('catalog');

Route::get('/about', [AboutController::class, 'index'])->name('about');

Route::get('/books/search', [SearchController::class, 'index'])->name('search');
Route::get('/books/searchList', [SearchController::class, 'search'])->name('books.search');

Route::get('/books/{book}', [BookController::class, 'show'])->name('books.show');
Route::get('/authors/{author}', [AuthorController::class, 'show'])->name('authors.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(['restrict_admin'])->group(function () {
        Route::get('/wishlist', [WishlistController::class, 'index'])->name('wishlist');
        Route::post('/wishlist', [WishlistController::class, 'store'])->name('wishlist.store');
        Route::delete('/wishlist/{id}', [WishlistController::class, 'destroy'])->name('wishlist.destroy');

        Route::post('/reviews/store', [ReviewController::class, 'store'])->name('reviews.store');

        Route::resource('reservation', ReservationController::class)
            ->only(['index', 'store', 'destroy']);

        Route::resource('checkout', CheckoutController::class)
            ->only(['index', 'store', 'destroy']);
    });
});

require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
