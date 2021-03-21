import { Game, NextPageContextWithID } from 'utils/types';
import { API_PATH, fetchData } from 'utils/fetch';
import styles from 'styles/search-page.module.scss';
import useAppendableResults from 'hooks/useAppendableResults';
import GameCard from 'components/GameCard';
import PaginatorButton from 'components/PaginatorButton';

const pageSize = 20;

function SearchPage({ initialResults, count, id }: SearchPageProps) {
    const { results, loading, paginatorRef, paginatorVisible } = useAppendableResults<Game>({
        initialResults,
        path: API_PATH.GAMES,
        query: { search: id },
        pageSize,
        count,
    });

    return (
        <div className={styles.root}>
            <div className={styles.info}>
                {`${count} games found`}
            </div>
            <div className={styles.cards}>
                {results.map((game) => (
                    <GameCard key={game.name} game={game} />
                ))}
            </div>
            <div className={styles.button}>
                <PaginatorButton
                    ref={paginatorRef}
                    loading={loading}
                    visible={paginatorVisible}
                />
            </div>
        </div>
    );
}

interface SearchPageProps {
    id: string;
    initialResults: Game[];
    count: number;
}

export async function getServerSideProps({
    params: { id },
}: NextPageContextWithID): Promise<{ props: SearchPageProps }> {
    const data = await fetchData(API_PATH.GAMES, {
        search: id,
        page: 1,
        page_size: pageSize,
    });

    return {
        props: {
            id,
            initialResults: data?.results || [],
            count: data?.count || 0,
        },
    };
}

export default SearchPage;
