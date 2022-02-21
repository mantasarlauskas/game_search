import usePaginatedQuery from 'hooks/usePaginatedQuery';
import { Game } from 'utils/types';
import { ApiPath, QueryParams } from 'utils/fetch';
import styles from 'components/CategoryPage.module.scss';
import GameCard from 'components/GameCard';
import PaginationButtons from 'components/PaginationButtons';
import PageHead from 'components/PageHead';
import GameSort from 'components/GameSort';
import { useRouter } from 'next/router';
import { getOrdering } from 'utils/ordering';

function CategoryPage({
    games,
    queryParams,
    count,
    title,
    nextPage,
    name,
}: CategoryPageProps) {
    const router = useRouter();
    const ordering = getOrdering(router.query);
    const { data, isFetching, paginatorRef, hasNextPage, hasPreviousPage } =
        usePaginatedQuery<Game, HTMLButtonElement>({
            initialData: games,
            path: ApiPath.GAMES,
            initialNextPage: nextPage,
            queryParams: {
                ...queryParams,
                ordering,
            },
        });

    return (
        <div className={styles.root}>
            <PageHead title={name} />
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.header}>
                <GameSort />
                <div className={styles.count}>{`Total ${count} games`}</div>
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
