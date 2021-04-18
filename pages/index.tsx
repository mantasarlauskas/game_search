import styles from 'pageStyles/HomePage.module.scss';
import { Game } from 'utils/types';
import { ApiPath, fetchData } from 'utils/fetch';
import GameCard from 'components/GameCard';
import usePaginatedQuery from 'hooks/usePaginatedQuery';
import GameSort from 'components/GameSort';
import Spinner from 'components/Spinner';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import { getOrdering } from 'utils/ordering';
import { DEFAULT_PAGE_SIZE } from 'utils/page';
import PaginationButtons from 'components/PaginationButtons';

function HomePage({ games, nextPage }: HomePageProps) {
    const router = useRouter();
    const ordering = getOrdering(router.query);
    const {
        data,
        isLoading,
        isFetching,
        paginatorRef,
        hasNextPage,
        hasPreviousPage,
    } = usePaginatedQuery<Game, HTMLButtonElement>({
        initialData: games,
        path: ApiPath.GAMES,
        initialNextPage: nextPage,
        queryParams: { ordering },
    });

    return (
        <div className={styles.root}>
            <div className={styles.sort}>
                <GameSort />
            </div>
            {isLoading && !data.length && (
                <div className={styles.spinner}>
                    <Spinner />
                </div>
            )}
            <div className={styles.content} style={{ display: isLoading ? 'none' : 'flex' }}>
                <div className={styles.cards}>
                    {data.map((game) => (
                        <GameCard key={game.name} game={game} />
                    ))}
                </div>
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

interface HomePageProps {
    games: Game[];
    nextPage?: string;
}

export async function getServerSideProps({ query }: NextPageContext): Promise<{ props: HomePageProps }> {
    const data = await fetchData(
        ApiPath.GAMES,
        {
            page: 1,
            page_size: DEFAULT_PAGE_SIZE,
            ordering: getOrdering(query),
        },
    );

    return {
        props: {
            games: data?.results || [],
            nextPage: data?.next,
        },
    };
}

export default HomePage;
