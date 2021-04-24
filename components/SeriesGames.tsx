import { Game } from 'utils/types';
import styles from 'components/SeriesGames.module.scss';
import GameCard from 'components/GameCard';
import PaginatorButton from 'components/PaginatorButton';
import usePaginatedQuery from 'hooks/usePaginatedQuery';
import { ApiPath } from 'utils/fetch';

export const seriesGamesPageSize = 6;

function SeriesGames({ games, slug, nextPage }: SeriesGamesProps) {
    const {
        data,
        isFetching,
        fetchNextPage,
        hasNextPage,
    } = usePaginatedQuery<Game, HTMLButtonElement>({
        initialData: games,
        initialNextPage: nextPage,
        path: `${ApiPath.GAMES}/${slug}/game-series`,
        pageSize: seriesGamesPageSize,
    });

    if (!data.length) {
        return null;
    }

    return (
        <div className={styles.root}>
            <div className={styles.title}>
                Games from the same series
            </div>
            <div className={styles.cards}>
                {data.map((game) => (
                    <GameCard key={game.slug} game={game} />
                ))}
            </div>
            <div className={styles.button}>
                <PaginatorButton
                    isVisible={!!hasNextPage}
                    isFetching={isFetching}
                    onClick={fetchNextPage}
                />
            </div>
        </div>
    );
}

interface SeriesGamesProps {
    games: Game[];
    slug: string;
    nextPage?: string;
}

export default SeriesGames;
