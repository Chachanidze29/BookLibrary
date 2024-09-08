import { router } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
//@ts-ignore
import ReactStars from 'react-rating-stars-component';

import ReviewItem from '@/Components/Review/ReviewItem';
import { H4 } from '@/Components/Typography/H4';
import { Review } from '@/types/model';

export default function ReviewList({
    reviews,
    user,
    userHasReview,
    setNewRating,
    setIsReviewDialogOpen,
    averageRating,
}: {
    reviews: Review[];
    user: any;
    userHasReview: boolean;
    setNewRating: (rating: number) => void;
    setIsReviewDialogOpen: (isOpen: boolean) => void;
    averageRating: number;
}) {
    const { t } = useLaravelReactI18n();

    return (
        <section>
            <ReactStars
                count={5}
                onChange={(newRating: number) => {
                    if (!user) {
                        router.visit(route('login'));
                        return;
                    }
                    setNewRating(newRating);
                    setIsReviewDialogOpen(true);
                }}
                value={averageRating}
                size={24}
                activeColor="#ffd700"
                edit={!userHasReview}
            />

            {reviews.length > 0 && (
                <>
                    <H4>{t('Reviews')}</H4>
                    {reviews.map((review) => (
                        <ReviewItem
                            key={review.id}
                            review={review}
                            user={user}
                        />
                    ))}
                </>
            )}
        </section>
    );
}
