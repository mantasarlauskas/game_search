import { Game, NextPageContextWithID } from 'utils/types';
import { ApiPath, fetchData } from 'utils/fetch';
import styles from 'styles/search-page.module.scss';
import usePaginatedQuery from 'hooks/usePaginatedQuery';
import GameCard from 'components/GameCard';
import PaginatorButton from 'components/PaginatorButton';
import { DEFAULT_PAGE_SIZE } from 'utils/page';

function SearchPage({ initialResults, count, id, nextPage }: SearchPageProps) {
    const { data, isLoading, paginatorRef, hasNextPage } = usePaginatedQuery<Game, HTMLButtonElement>({
        initialData: initialResults,
        initialNextPage: nextPage,
        path: ApiPath.GAMES,
        queryParams: { search: id },
    });

    return (
        <div className={styles.root}>
            <div className={styles.info}>
                {`${count} games found`}
            </div>
            <div className={styles.cards}>
                {data.map((game) => (
                    <GameCard key={game.name} game={game} />
                ))}
            </div>
            <div className={styles.button}>
                <PaginatorButton
                    ref={paginatorRef}
                    isFetching={isLoading}
                    isVisible={!!hasNextPage}
                />
            </div>
        </div>
    );
}

interface SearchPageProps {
    id: string;
    initialResults: Game[];
    count: number;
    nextPage?: string;
}

export async function getServerSideProps({
    params: { id },
}: NextPageContextWithID): Promise<{ props: SearchPageProps }> {
    const data = await fetchData(ApiPath.GAMES, {
        search: id,
        page: 1,
        page_size: DEFAULT_PAGE_SIZE,
    });

    return {
        props: {
            id,
            nextPage: data?.next,
            initialResults: data?.results || [],
            count: data?.count || 0,
        },
    };
}

export default SearchPage;
