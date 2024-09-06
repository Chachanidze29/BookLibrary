import { Head } from '@inertiajs/react';

import AuthorDetails from '@/Components/AuthorDetails';
import MainLayout from '@/Layouts/MainLayout';
import { Author } from '@/types/model';

export default function Show({ author }: { author: Author }) {
    return (
        <MainLayout>
            <Head title={author.name} />

            <div className="container flex flex-grow flex-col">
                <AuthorDetails author={author} />
            </div>
        </MainLayout>
    );
}
