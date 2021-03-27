import usePaginatedQuery from 'hooks/usePaginatedQuery';
import { Game } from 'utils/types';
import { ApiPath, QueryParams } from 'utils/fetch';
import styles from 'components/CategoryPage.module.scss';
import GameCard from 'components/GameCard';
import PaginatorButton from 'components/PaginatorButton';

function CategoryPage({ games, queryParams, count, title, nextPage }: CategoryPageProps) {
    const { data, isFetching, paginatorRef, hasNextPage } = usePaginatedQuery<Game, HTMLButtonElement>({
        initialData: games,
        path: ApiPath.GAMES,
        queryParams,
        initialNextPage: nextPage,
    });

    return (
        <div className={styles.root}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.count}>
                {`Total ${count} games`}
            </div>
            <div className={styles.cards}>
                {data.map((game) => (
                    <GameCard key={game.name} game={game} />
                ))}
            </div>
            <div className={styles.button}>
                <PaginatorButton
                    ref={paginatorRef}
                    isFetching={isFetching}
                    isVisible={!!hasNextPage}
                />
            </div>
        </div>
    );
}

interface CategoryPageProps {
    games: Game[];
    count: number;
    queryParams: QueryParams;
    title: string;
    nextPage?: string;
}

export default CategoryPage;
