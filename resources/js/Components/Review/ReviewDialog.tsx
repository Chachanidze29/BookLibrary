import { useLaravelReactI18n } from 'laravel-react-i18n';
import React from 'react';

import { Button } from '@/Components/Button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/Components/Dialog';
import { Textarea } from '@/Components/Textarea';

export default function ReviewDialog({
    isOpen,
    setIsOpen,
    newReview,
    setNewReview,
    handleReviewSubmit,
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    newReview: string;
    setNewReview: (value: string) => void;
    handleReviewSubmit: (e: React.FormEvent) => void;
}) {
    const { t } = useLaravelReactI18n();

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t('Write a review')}</DialogTitle>
                </DialogHeader>
                <Textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder={t('Write a review')}
                    required
                />
                <Button onClick={handleReviewSubmit}>{t('Submit')}</Button>
            </DialogContent>
        </Dialog>
    );
}
