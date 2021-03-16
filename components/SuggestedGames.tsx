import React from 'react';
import { Game } from 'utils/types';
import styles from 'styles/suggested-games.module.scss';
import GameCard from 'components/GameCard';
import PaginatorButton from 'components/PaginatorButton';
import useAppendableResults from 'hooks/useAppendableResults';
import { API_PATH } from 'utils/fetch';

export const suggestedGamesPageSize = 6;

function SuggestedGames({ initialGames, count, name, slug }: SuggestedGamesProps) {
    const {
        results,
        loading,
        paginatorVisible,
        incrementNumber,
    } = useAppendableResults<Game>({
        initialResults: initialGames,
        path: `${API_PATH.GAMES}/${slug}/suggested`,
        count,
        pageSize: suggestedGamesPageSize,
        useIntersectionObserver: false,
    });

    if (!results.length) {
        return null;
    }

    return (
        <div className={styles.root}>
            <div className={styles.title}>
                {`Games like ${name}`}
            </div>
            <div className={styles.cards}>
                {results.map((game) => (
                    <GameCard key={game.slug} game={game} />
                ))}
            </div>
            <div className={styles.button}>
                <PaginatorButton
                    visible={paginatorVisible}
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
