import { RowData } from '@tanstack/react-table';

import { Reservation, User } from '@/types/model';

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash: {
        success: string;
        error: string;
    };
};

export type SelectOption = {
    id: number;
    name: string;
};

export type LendData = {
    members: {
        id: number;
        first_name: string;
        last_name: string;
        personal_number: string;
        checkouts_count: number;
        reservations: Reservation[];
    }[];
    book_copies: {
        id: number;
        code: string;
        book: {
            id: number;
            title: string;
        };
        branch: {
            id: number;
            name: string;
        };
    }[];
    max_lent_books: number;
};

export type ReturnData = {
    members: {
        id: number;
        first_name: string;
        last_name: string;
        personal_number: string;
    }[];
    checkouts: {
        id: number;
        user_id: number;
        book_copy: {
            id: number;
            code: string;
            book: {
                id: number;
                title: string;
            };
        };
        checkout_date: string;
        due_date: string;
    }[];
};

export type BooksChartData = {
    available: number;
    reserved: number;
    checked_out: number;
    lost: number;
    damaged: number;
};

export type CheckoutsReturnsChartData = {
    month: string;
    checkouts: number;
    returns: number;
}[];

export type PopularBooksChartData = {
    title: string;
    total: number;
}[];

declare module '@tanstack/table-core' {
    interface TableMeta<TData extends RowData> {
        conditions: SelectOption[];
        branches: SelectOption[];
        statuses: SelectOption[];
    }
}
