import { router } from '@inertiajs/react';
import { TrashIcon } from 'lucide-react';
//@ts-ignore
import ReactStars from 'react-rating-stars-component';

import { Button } from '@/Components/Button';
import { Review } from '@/types/model';

export default function ReviewItem({
    review,
    user,
}: {
    review: Review;
    user: any;
}) {
    const handleDelete = () => {
        router.delete(route('admin.reviews.destroy', review.id), {
            preserveScroll: true,
        });
    };

    return (
        <div className="mb-4">
            <div className="align-center flex gap-2">
                <ReactStars
                    count={5}
                    value={review.rating}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                />
                {user?.is_admin && (
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={handleDelete}
                    >
                        <TrashIcon className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <p>{review.review}</p>
            <p className="text-muted-foreground">
                {review.user.first_name} {review.user.last_name} -{' '}
                {new Date(review.created_at).toLocaleDateString()}
            </p>
        </div>
    );
}
