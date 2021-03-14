import { Game, NextPageContextWithID } from 'utils/types';
import { API_PATH, fetchData } from 'utils/fetch';
import useAppendableResults from 'hooks/useAppendableResults';
import styles from 'styles/genre.module.scss';
import GameCard from 'components/GameCard';
import PaginatorButton from 'components/PaginatorButton';
import { Route } from 'utils/routes';

const pageSize = 20;

function Genre({ games, count, id }: GenreProps) {
    const { results, loading, paginatorRef, paginatorVisible } = useAppendableResults<Game>({
        initialResults: games,
        path: API_PATH.GAMES,
        query: { genres: id },
        pageSize,
        count,
    });

    return (
        <div className={styles.root}>
            <div className={styles.count}>
                {`Total ${count} games`}
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

interface GenreProps {
    id: string;
    games: Game[];
    count: number;
}

export async function getServerSideProps({ params: { id } }: NextPageContextWithID) {
    const data = await fetchData(API_PATH.GAMES, {
        genres: id,
        page: 1,
        page_size: pageSize,
    });

    if (!data?.count || !data?.results) {
        return {
            redirect: {
                destination: Route.NOT_FOUND,
                permanent: false,
            },
        };
    }

    return {
        props: {
            id,
            count: data.count,
            games: data.results,
        },
    };
}

export default Genre;
