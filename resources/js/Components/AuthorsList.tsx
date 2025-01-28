import { Link } from '@inertiajs/react';
import { Fragment } from 'react';

export type AuthorType = {
    id: number;
    name: string;
};

const AuthorsList = ({ authors }: { authors: AuthorType[] }) => {
    return (
        <>
            {authors.map((author, index) => (
                <Fragment key={author.id}>
                    <Link
                        className="hover:text-blue-500"
                        href={route('authors.show', author.id)}
                    >
                        {author.name}
                    </Link>
                    {index < authors.length - 1 && ', '}
                </Fragment>
            ))}
        </>
    );
};

export default AuthorsList;
