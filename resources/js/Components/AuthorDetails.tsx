import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Card, CardContent } from '@/Components/Card';
import { DataTable } from '@/Components/DataTable';
import Image from '@/Components/Image';
import { H4 } from '@/Components/Typography/H4';
import { columns } from '@/Pages/Admin/Books/Partials/columns';
import { Author } from '@/types/model';

export default function AuthorDetails({ author }: { author: Author }) {
    const { t } = useLaravelReactI18n();

    const { books } = author;

    return (
        <Card className="flex flex-grow flex-col">
            <CardContent className="flex flex-grow flex-col">
                <section>
                    <H4>{t('Name')}</H4>
                    <p>{author.name}</p>
                </section>

                <section>
                    <H4>{t('Bio')}</H4>
                    <p>{author.bio}</p>
                </section>
                <Image
                    src={'/storage/' + author.cover_image}
                    alt={author.name}
                    fallbackSrc="https://via.placeholder.com/150?text=Author+Image"
                />
                <section className="flex flex-grow flex-col">
                    <H4>{t('Books')}</H4>
                    <DataTable
                        data={books ?? []}
                        columns={columns}
                        filterBy="title"
                    />
                </section>
            </CardContent>
        </Card>
    );
}
