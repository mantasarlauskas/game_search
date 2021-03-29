import usePaginatedQuery from 'hooks/usePaginatedQuery';
import { Game } from 'utils/types';
import { ApiPath, QueryParams } from 'utils/fetch';
import styles from 'components/CategoryPage.module.scss';
import GameCard from 'components/GameCard';
import PaginationButtons from 'components/PaginationButtons';
import PageHead from 'components/PageHead';

function CategoryPage({ games, queryParams, count, title, nextPage, name }: CategoryPageProps) {
    const {
        data,
        isFetching,
        paginatorRef,
        hasNextPage,
        hasPreviousPage,
    } = usePaginatedQuery<Game, HTMLButtonElement>({
        initialData: games,
        path: ApiPath.GAMES,
        queryParams,
        initialNextPage: nextPage,
    });

    return (
        <div className={styles.root}>
            <PageHead title={name} />
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
                <PaginationButtons
                    hasNextPage={!!hasNextPage}
                    hasPreviousPage={!!hasPreviousPage}
                    isFetching={isFetching}
                    paginatorRef={paginatorRef}
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
    name?: string;
}

export default CategoryPage;
