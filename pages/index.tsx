import styles from 'styles/index.module.scss';
import { Game } from 'utils/types';
import { API_PATH, fetchData } from 'utils/fetch';
import GameCard from 'components/GameCard';
import useAppendableResults from 'hooks/useAppendableResults';
import PaginatorButton from 'components/PaginatorButton';
import GameSort, { SortMode } from 'components/GameSort';
import { useState } from 'react';
import useFetch from 'hooks/useFetch';
import Spinner from 'components/Spinner';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import { getOrdering } from 'utils/ordering';

const pageSize = 20;

function Home({ games, count }: HomeProps) {
    const router = useRouter();
    const [fetch, gamesLoading] = useFetch<{ results: Game[] }>();
    const [initialGames, setInitialGames] = useState(games);
    const ordering = getOrdering(router.query);
    const { results, loading: paginatorLoading, paginatorRef, paginatorVisible } = useAppendableResults<Game>({
        initialResults: initialGames,
        path: API_PATH.GAMES,
        query: { ordering },
        pageSize,
        count,
    });

    async function fetchInitialGames(sortMode: SortMode) {
        router.push({
            query: {
                ...(sortMode ? { ordering: sortMode || '' } : {}),
            },
        }, undefined, { shallow: true });

        const data = await fetch(
            API_PATH.GAMES,
            {
                page: 1,
                page_size: pageSize,
                ordering: sortMode,
            },
        );

        if (data) {
            setInitialGames(data.results);
        }
    }

    return (
        <div className={styles.root}>
            <GameSort
                activeSortMode={ordering}
                onSortModeChange={fetchInitialGames}
            />
            {gamesLoading && (
                <div className={styles.spinner}>
                    <Spinner />
                </div>
            )}
            <div className={styles.content} style={{ display: gamesLoading ? 'none' : 'flex' }}>
                <div className={styles.cards}>
                    {results.map((game) => (
                        <div key={game.name} className={styles.card}>
                            <GameCard game={game} />
                        </div>
                    ))}
                </div>
                <PaginatorButton
                    ref={paginatorRef}
                    loading={paginatorLoading}
                    visible={paginatorVisible}
                />
            </div>
        </div>
    );
}

interface HomeProps {
    games: Game[];
    count: number;
}

export async function getServerSideProps({ query }: NextPageContext): Promise<{ props: HomeProps }> {
    const { results, count } = await fetchData(
        API_PATH.GAMES,
        {
            page: 1,
            page_size: pageSize,
            ordering: getOrdering(query),
        },
    );

    return {
        props: {
            count,
            games: results,
        },
    };
}

export default Home;
