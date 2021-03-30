import React, { useState } from 'react';
import { Popover } from 'react-tiny-popover';
import styles from 'components/GameSort.module.scss';
import { useRouter } from 'next/router';
import { getOrdering } from 'utils/ordering';

export enum SortMode {
    RELEVANCE = '',
    NAME = 'name',
    DATE_ADDED = 'added',
    RELEASE_DATE = '-released',
    RATING = '-rating'
}

const titles = {
    [SortMode.RELEVANCE]: 'Relevance',
    [SortMode.DATE_ADDED]: 'Date added',
    [SortMode.NAME]: 'Name',
    [SortMode.RELEASE_DATE]: 'Release date',
    [SortMode.RATING]: 'Average rating',
};

const sortOptions = [
    SortMode.RELEVANCE,
    SortMode.DATE_ADDED,
    SortMode.NAME,
    SortMode.RELEASE_DATE,
    SortMode.RATING,
];

function GameSort() {
    const router = useRouter();
    const ordering = getOrdering(router.query);
    const [isOpen, setIsOpen] = useState(false);

    function onOptionClick(value: SortMode) {
        setIsOpen(false);
        if (value !== ordering) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { ordering: prevOrdering, ...queryParams } = router.query;
            router.push({
                pathname: router.pathname,
                query: value ? {
                    ...queryParams,
                    ordering: value,
                } : queryParams,
            }, undefined, { shallow: true });
        }
    }

    const button = (
        <button
            type="button"
            className={styles.root}
            onClick={() => setIsOpen(!isOpen)}
        >
            Order by:
            <div className={styles.title}>
                {titles[ordering]}
            </div>
        </button>
    );

    if (typeof window === 'undefined') {
        return button;
    }

    return (
        <Popover
            isOpen={isOpen}
            padding={4}
            positions={['bottom']}
            align="start"
            onClickOutside={() => setIsOpen(false)}
            content={(
                <div className={styles.options}>
                    {sortOptions.map((value) => (
                        <button
                            type="button"
                            className={styles.option}
                            key={value}
                            onClick={() => onOptionClick(value)}
                        >
                            {titles[value]}
                        </button>
                    ))}
                </div>
            )}
        >
            {button}
        </Popover>
    );
}

export default GameSort;
