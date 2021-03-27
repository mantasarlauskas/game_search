import { Game } from 'utils/types';
import styles from 'components/SuggestedGames.module.scss';
import GameCard from 'components/GameCard';
import PaginatorButton from 'components/PaginatorButton';
import usePaginatedQuery from 'hooks/usePaginatedQuery';
import { ApiPath } from 'utils/fetch';

export const suggestedGamesPageSize = 6;

function SuggestedGames({ initialGames, name, slug, nextPage }: SuggestedGamesProps) {
    const {
        data,
        isFetching,
        fetchNextPage,
        hasNextPage,
    } = usePaginatedQuery<Game, HTMLButtonElement>({
        initialData: initialGames,
        initialNextPage: nextPage,
        path: `${ApiPath.GAMES}/${slug}/suggested`,
        pageSize: suggestedGamesPageSize,
    });

    if (!data.length) {
        return null;
    }

    return (
        <div className={styles.root}>
            <div className={styles.title}>
                {`Games like ${name}`}
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

interface SuggestedGamesProps {
    initialGames: Game[];
    name: string;
    slug: string;
    nextPage?: string;
}

export default SuggestedGames;
