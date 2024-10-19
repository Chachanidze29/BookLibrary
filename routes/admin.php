<?php

use App\Http\Controllers\Admin\AuthorController;
use App\Http\Controllers\Admin\BookController;
use App\Http\Controllers\Admin\BookCopyController;
use App\Http\Controllers\Admin\BookCopyStatusController;
use App\Http\Controllers\Admin\BranchController;
use App\Http\Controllers\Admin\CheckoutController;
use App\Http\Controllers\Admin\ConditionController;
use App\Http\Controllers\Admin\ConfigurationController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\GenreController;
use App\Http\Controllers\Admin\MemberController;
use App\Http\Controllers\ReviewController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth', 'admin'])
    ->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])
            ->name('dashboard');

        Route::resource('checkout', CheckoutController::class)
            ->only(['store']);
        Route::put('checkout/massUpdate', [CheckoutController::class, 'massUpdate'])
            ->name('checkout.massUpdate');

        Route::resource('members', MemberController::class);

        Route::resource('books', BookController::class)->except(['update']);
        Route::post('books/{book}', [BookController::class, 'update'])->name('books.update');
        Route::post('books/massDelete', [BookController::class, 'massDelete'])
            ->name('books.massDelete');

        Route::resource('books.copies', BookCopyController::class)
            ->only(['create', 'store', 'update', 'destroy'])
            ->shallow();

        Route::resource('authors', AuthorController::class)
            ->only(['index', 'show', 'store', 'update', 'destroy']);

        Route::resource('genres', GenreController::class)
            ->only(['index', 'store', 'update', 'destroy']);

        Route::resource('conditions', ConditionController::class)
            ->only(['index', 'store', 'update', 'destroy']);

        Route::resource('statuses', BookCopyStatusController::class)
            ->only(['index', 'store', 'update', 'destroy']);

        Route::get('branches', [BranchController::class, 'index'])->name('branches.index');
        Route::post('branches', [BranchController::class, 'store'])->name('branches.store');
        Route::put('branches/{branch}', [BranchController::class, 'update'])->name('branches.update');
        Route::delete('branches/{branch}', [BranchController::class, 'destroy'])->name('branches.destroy');

        Route::get('configuration', [ConfigurationController::class, 'index'])
            ->name('configuration.index');
        Route::put('configuration', [ConfigurationController::class, 'update'])
            ->name('configuration.update');

        Route::delete('/reviews/{review}', [ReviewController::class, 'destroy'])->name('reviews.destroy');
    });
