import React, { useState } from 'react';
import { Popover } from 'react-tiny-popover';
import styles from 'components/GameSort.module.scss';

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

function GameSort({ onSortModeChange, activeSortMode }: GameSortProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [sortMode, setSortMode] = useState(activeSortMode);

    if (typeof window === 'undefined') {
        return null;
    }

    function onOptionClick(value: SortMode) {
        setIsOpen(false);
        if (value !== sortMode) {
            setSortMode(value);
            onSortModeChange(value);
        }
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
            <button
                type="button"
                className={styles.root}
                onClick={() => setIsOpen(!isOpen)}
            >
                Order by:
                <div className={styles.title}>
                    {titles[sortMode]}
                </div>
            </button>
        </Popover>
    );
}

interface GameSortProps {
    activeSortMode: SortMode;
    onSortModeChange: (sortMode: SortMode) => void;
}

export default GameSort;
