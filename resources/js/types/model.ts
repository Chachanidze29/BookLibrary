export type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: string;
    is_admin: boolean;
};

export type Member = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    personal_number: string;
};

export type Book = {
    id: number;
    title: string;
    is_enabled: boolean;
    isbn: string;
    description: string | null;
    cover_image?: string | null;
    publication_date: string;
    language: { id: number; name: string };
    genres: { id: number; name: string }[];
    authors: { id: number; name: string }[];
    book_copies_count: number;
    is_in_wishlist: boolean;
};

export type BookCopy = {
    id: number;
    code: string;
    book_id: number;
    branch: { id: number; name: string };
    branch_id: number;
    status: { id: number; name: string };
    status_id: number;
    condition: { id: number; name: string };
    condition_id: number;
};

export type Author = {
    id: number;
    name: string;
    bio: string | null;
    books_count: number;
    books?: Book[];
    cover_image?: File | string | null;
};

export type Genre = {
    id: number;
    name: string;
    books_count: number;
};

export type Condition = {
    id: number;
    name: string;
    books_count: number;
};

export type Status = {
    id: number;
    name: string;
    books_count: number;
};

export type Branch = {
    id: number;
    is_enabled: boolean;
    name: string;
    address: string;
    phone?: string;
    email?: string;
    working_hours: string;
    books_count: number;
};

export type Checkout = {
    id: number;
    book: {
        id: number;
        title: string;
        code: string;
    };
    member: {
        first_name: string;
        last_name: string;
        personal_number: string;
    };
    status: {
        id: number;
        name: string;
    };
    checkout_date: string;
    due_date: string;
    return_date: string | null;
};

export type Reservation = {
    id: number;
    book_copy_id: number;
    book: {
        id: number;
        title: string;
        code: string;
    };
    member: {
        id: number;
        first_name: string;
        last_name: string;
        personal_number: string;
    };
    reserve_date: string;
    due_date: string;
};

export type MyReservation = {
    id: number;
    book_copy: {
        id: number;
        code: string;
        book: {
            id: number;
            title: string;
        };
    };
    reserve_date: string;
    due_date: string;
};

export type MyCheckouts = {
    id: number;
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
    return_date: string;
};

export type Review = {
    id: number;
    review: string;
    created_at: Date;
    rating: number;
    user: {
        first_name: string;
        last_name: string;
    };
};
