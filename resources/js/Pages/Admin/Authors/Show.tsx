import { Head } from '@inertiajs/react';

import AuthorDetails from '@/Components/AuthorDetails';
import AdminLayout from '@/Layouts/AdminLayout';
import { Author, Book } from '@/types/model';

export default function Show({ author }: { author: Author }) {
    return (
        <AdminLayout>
            <Head title={author.name} />
            <AuthorDetails author={author} />
        </AdminLayout>
    );
}
