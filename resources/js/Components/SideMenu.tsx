import { useLaravelReactI18n } from 'laravel-react-i18n';
import React, { useEffect, useState } from 'react';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/Components/Accordion';
import { Button } from '@/Components/Button';
import { Checkbox } from '@/Components/Checkbox';
import { H4 } from '@/Components/Typography/H4';
import { Categories } from '@/Pages/Catalog';
import { capitalize } from '@/lib/utils';

interface SideMenuProps {
    categories: Categories;
    filters: SelectedFilters;
    onFilterChange: (filters: SelectedFilters) => void;
}

export type SelectedFilters = {
    authors: number[];
    genres: number[];
};

const SideMenu: React.FC<SideMenuProps> = ({
    categories,
    filters,
    onFilterChange,
}) => {
    const { t } = useLaravelReactI18n();

    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
        authors: filters.authors || [],
        genres: filters.genres || [],
    });

    const [visibleItems, setVisibleItems] = useState<{
        [key: string]: number;
    }>({});

    useEffect(() => {
        setSelectedFilters({
            authors: filters.authors || [],
            genres: filters.genres || [],
        });
    }, [filters]);

    useEffect(() => {
        const initialVisibleItems: { [key: string]: number } = {};
        Object.keys(categories).forEach((categoryName) => {
            initialVisibleItems[categoryName] = 5;
        });
        setVisibleItems(initialVisibleItems);
    }, [categories]);

    const handleCheckboxChange = (
        category: keyof SelectedFilters,
        itemId: number,
    ) => {
        setSelectedFilters((prevFilters) => {
            const updatedCategory = prevFilters[category].includes(itemId)
                ? prevFilters[category].filter((id) => id !== itemId)
                : [...prevFilters[category], itemId];

            const updatedFilters = {
                ...prevFilters,
                [category]: updatedCategory,
            };
            onFilterChange(updatedFilters);
            return updatedFilters;
        });
    };

    const isChecked = (categoryName: string, itemId: number) => {
        return selectedFilters[categoryName as keyof SelectedFilters].includes(
            itemId,
        );
    };

    const handleShowAll = (categoryName: string, totalItems: number) => {
        setVisibleItems((prevVisibleItems) => ({
            ...prevVisibleItems,
            [categoryName]: totalItems,
        }));
    };

    return (
        <div className="space-y-4">
            <Button
                variant="outline"
                onClick={() => {
                    setSelectedFilters({ authors: [], genres: [] });
                    onFilterChange({ authors: [], genres: [] });
                }}
                disabled={
                    !selectedFilters.authors.length &&
                    !selectedFilters.genres.length
                }
                className="w-full"
            >
                {t('Clear')}
            </Button>

            <Accordion type="multiple" defaultValue={[]}>
                {Object.entries(categories).map(([categoryName, items]) => (
                    <AccordionItem key={categoryName} value={categoryName}>
                        <AccordionTrigger>
                            <H4 className="m-0">
                                {t(capitalize(categoryName))}
                            </H4>
                        </AccordionTrigger>
                        <AccordionContent>
                            {items
                                .slice(0, visibleItems[categoryName])
                                .map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-2 rounded-sm p-2 hover:bg-muted"
                                    >
                                        <Checkbox
                                            checked={isChecked(
                                                categoryName as keyof SelectedFilters,
                                                item.id,
                                            )}
                                            onCheckedChange={() =>
                                                handleCheckboxChange(
                                                    categoryName as keyof SelectedFilters,
                                                    item.id,
                                                )
                                            }
                                            id={item.name + item.id}
                                        />
                                        <label
                                            className="w-full cursor-pointer"
                                            htmlFor={item.name + item.id}
                                        >
                                            {item.name}
                                        </label>
                                    </div>
                                ))}
                            {visibleItems[categoryName] < items.length && (
                                <Button
                                    variant="link"
                                    onClick={() =>
                                        handleShowAll(
                                            categoryName,
                                            items.length,
                                        )
                                    }
                                    className="mt-2 text-sm"
                                >
                                    {t('Show more')}
                                </Button>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default SideMenu;
