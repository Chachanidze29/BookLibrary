<?php

namespace App\Services;

use App\Enums\BookCopyStatus;
use App\Enums\RolesEnum;
use App\Models\BookCopy;
use App\Models\Checkout;
use App\Models\Configuration;
use App\Models\Reservation;
use App\Models\User;

class DashboardService
{
    /**
     * @return array
     */
    public function getLendData(): array
    {
        $maxLentBooks = Configuration::where('key', 'max_lent_books')->first()->value;

        return [
            'members' => User::role(RolesEnum::MEMBER)
                ->whereHas('checkouts', fn($query) => $query->isNotReturned(), '<', $maxLentBooks)
                ->select('id', 'first_name', 'last_name', 'personal_number')
                ->with(['reservations' => fn($query) => $query->select('id', 'user_id', 'book_copy_id')])
                ->withCount(['checkouts' => fn($query) => $query->isNotReturned()])
                ->orderByRaw('(SELECT COUNT(*) FROM reservations WHERE reservations.user_id = users.id) DESC')
                ->get(),
            'book_copies' => BookCopy::with('book:id,title', 'branch:id,name')
                ->withStatus([BookCopyStatus::AVAILABLE, BookCopyStatus::RESERVED])
                ->select('id', 'code', 'book_id', 'branch_id')
                ->get(),
            'max_lent_books' => $maxLentBooks,
        ];
    }

    /**
     * @return array
     */
    public function getReturnData(): array
    {
        return [
            'members' => User::role(RolesEnum::MEMBER)
                ->whereHas('checkouts', fn($query) => $query->isNotReturned())
                ->select('id', 'first_name', 'last_name', 'personal_number')
                ->get(),
            'checkouts' => Checkout::with(
                'bookCopy:id,code,book_id,status_id',
                'bookCopy.book:id,title'
            )->select('id', 'user_id', 'book_copy_id', 'checkout_date', 'due_date')
                ->isNotReturned()
                ->get(),
        ];
    }

    /**
     * @return array
     */
    public function getBooksChart(): array
    {
        return [
            'available' => BookCopy::withStatus([BookCopyStatus::AVAILABLE])->count(),
            'reserved' => BookCopy::withStatus([BookCopyStatus::RESERVED])->count(),
            'checked_out' => BookCopy::withStatus([BookCopyStatus::CHECKED_OUT])->count(),
            'lost' => BookCopy::withStatus([BookCopyStatus::LOST])->count(),
            'damaged' => BookCopy::withStatus([BookCopyStatus::DAMAGED])->count(),
        ];
    }

    /**
     * @param int $months
     *
     * @return array
     */
    public function getCheckoutsReturnsOverTime(int $months): array
    {
        $result = [];
        for ($i = $months - 1; $i >= 0; $i--) {
            $month = now()->subMonths($i)->format("Y-m");
            $result[$month] = ['month' => $month, 'checkouts' => 0, 'returns' => 0];
        }

        $checkoutsData = Checkout::selectRaw('DATE_FORMAT(checkout_date, "%Y-%m") as month, COUNT(*) as total')
            ->where('checkout_date', '>=', now()->subMonths($months)->startOfMonth())
            ->groupBy('month')
            ->get()
            ->keyBy('month');

        $returnsData = Checkout::selectRaw('DATE_FORMAT(return_date, "%Y-%m") as month, COUNT(*) as total')
            ->where('return_date', '>=', now()->subMonths($months)->startOfMonth())
            ->groupBy('month')
            ->get()
            ->keyBy('month');

        foreach ($result as $month => &$value) {
            $value['checkouts'] = $checkoutsData->get($month)->total ?? 0;
            $value['returns'] = $returnsData->get($month)->total ?? 0;
        }

        return array_values($result);
    }

    /**
     * @param int $limit
     *
     * @return array
     */
    public function getPopularBooks(int $limit): array
    {
        return Checkout::query()
            ->join('book_copies', 'checkouts.book_copy_id', '=', 'book_copies.id')
            ->join('books', 'book_copies.book_id', '=', 'books.id')
            ->selectRaw('books.id as book_id, books.title as title, COUNT(*) as count')
            ->groupBy('books.id', 'books.title')
            ->orderByDesc('count')
            ->limit($limit)
            ->get()
            ->toArray();
    }

    /**
     * @return array
     */
    public function getLatestCheckouts(): array
    {
        return Checkout::with(
            'user:id,first_name,last_name,personal_number',
            'bookCopy:id,code,book_id',
            'bookCopy.book:id,title',
            'status:id,name'
        )->orderByDesc('id')
            ->select('id', 'user_id', 'book_copy_id', 'status_id', 'checkout_date', 'due_date', 'return_date')
            ->get()
            ->map(function ($checkout) {
                return [
                    'id' => $checkout->id,
                    'member' => [
                        'first_name' => $checkout->user->first_name,
                        'last_name' => $checkout->user->last_name,
                        'personal_number' => $checkout->user->personal_number,
                    ],
                    'book' => [
                        'id' => $checkout->bookCopy->book->id,
                        'title' => $checkout->bookCopy->book->title,
                        'code' => $checkout->bookCopy->code,
                    ],
                    'status' => $checkout->status,
                    'checkout_date' => $checkout->checkout_date,
                    'due_date' => $checkout->due_date,
                    'return_date' => $checkout->return_date,
                ];
            })
            ->toArray();
    }

    /**
     * @return array
     */
    public function getLatestReservations(): array
    {
        return Reservation::with(
            'user:id,first_name,last_name,personal_number',
            'bookCopy:id,code,book_id',
            'bookCopy.book:id,title',
        )->orderByDesc('created_at')
            ->select('id', 'user_id', 'book_copy_id', 'reserve_date', 'due_date')
            ->get()
            ->map(function ($reservation) {
                return [
                    'id' => $reservation->id,
                    'book_copy_id' => $reservation->bookCopy->id,
                    'book' => [
                        'id' => $reservation->bookCopy->book->id,
                        'title' => $reservation->bookCopy->book->title,
                        'code' => $reservation->bookCopy->code,
                    ],
                    'member' => [
                        'id' => $reservation->user->id,
                        'first_name' => $reservation->user->first_name,
                        'last_name' => $reservation->user->last_name,
                        'personal_number' => $reservation->user->personal_number,
                    ],
                    'reserve_date' => $reservation->return_date,
                    'due_date' => $reservation->due_date,
                ];
            })
            ->toArray();
    }
}
