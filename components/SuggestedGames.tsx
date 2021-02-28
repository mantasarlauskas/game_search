import React from 'react';
import { Game } from 'utils/types';
import styles from 'styles/suggested-games.module.scss';
import GameCard from 'components/GameCard';
import usePaginator from 'hooks/usePaginator';
import PaginatorButton from 'components/PaginatorButton';
import useAppendableResults from 'hooks/useAppendableResults';
import { API_PATH } from 'utils/fetch';
import useValueChanged from '../hooks/useValueChanged';

export const suggestGamesPageSize = 6;

function SuggestedGames({ initialGames, count, name, slug }: SuggestedGamesProps) {
    const slugChanged = useValueChanged(slug);
    const { pageNumber, visible, pageChanged, incrementNumber } = usePaginator({
        pageSize: suggestGamesPageSize,
        count,
        reset: slugChanged,
        useIntersectionObserver: false,
    });

    const [games, loading] = useAppendableResults<Game>({
        initialResults: initialGames,
        path: `${API_PATH.GAMES}/${slug}/suggested`,
        query: `page=${pageNumber}&page_size=${suggestGamesPageSize}`,
        shouldAppend: pageChanged,
        reset: slugChanged,
    });

    if (!games.length) {
        return null;
    }

    return (
        <div className={styles.root}>
            <div className={styles.title}>
                {`Games like ${name}`}
            </div>
            <div className={styles.cards}>
                {games.map((game) => (
                    <div key={game.slug} className={styles.card}>
                        <GameCard game={game} />
                    </div>
                ))}
            </div>
            <div className={styles.button}>
                <PaginatorButton
                    visible={visible}
                    loading={loading}
                    onClick={incrementNumber}
                />
            </div>
        </div>
    );
}

interface SuggestedGamesProps {
    initialGames: Game[];
    count: number;
    name: string;
    slug: string;
}

export default SuggestedGames;
