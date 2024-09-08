import { router, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { HeartIcon } from 'lucide-react';

import { Button } from '@/Components/Button';
import { cn } from '@/lib/utils';
import { PageProps } from '@/types';
import { Book } from '@/types/model';

export const WishlistButton = ({
    book,
    isIcon = false,
}: {
    book: Book;
    isIcon?: boolean;
}) => {
    const { t } = useLaravelReactI18n();
    const {
        auth: { user },
    } = usePage<PageProps>().props;

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (book.is_in_wishlist) {
            removeFromWishlist();
        } else {
            addToWishlist();
        }
    };

    const addToWishlist = () => {
        router.post(route('wishlist.store'), { book_id: book.id });
    };

    const removeFromWishlist = () => {
        router.delete(route('wishlist.destroy', book.id));
    };

    if (user?.is_admin) return null;

    return isIcon ? (
        <HeartIcon
            onClick={handleWishlistClick}
            className={cn(
                'absolute right-1 top-1 text-red-500 hover:fill-red-500',
                { 'fill-red-500': book.is_in_wishlist },
                'cursor-pointer transition-transform duration-300 hover:scale-110', // Added 'cursor-pointer' for better UX
            )}
        />
    ) : (
        <Button
            variant="outline"
            onClick={handleWishlistClick}
            className="mt-2"
        >
            {t(`${!book.is_in_wishlist ? 'Add To' : 'Remove From'} Wishlist`)}
        </Button>
    );
};
