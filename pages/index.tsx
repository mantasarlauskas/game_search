import styles from 'styles/index.module.scss';
import { Game } from 'utils/types';
import { API_PATH, fetchData } from 'utils/fetch';
import GameCard from 'components/GameCard';
import usePaginator from 'hooks/usePaginator';
import useAppendableResults from 'hooks/useAppendableResults';
import PaginatorButton from '../components/PaginatorButton';

const pageSize = 20;

function Home({ initialGames, count }: HomeProps) {
    const { componentRef, pageNumber, visible, pageChanged } = usePaginator({ pageSize, count });
    const [games, loading] = useAppendableResults<Game>({
        initialResults: initialGames,
        path: API_PATH.GAMES,
        query: `page=${pageNumber}&page_size=${pageSize}`,
        shouldAppend: pageChanged,
    });

    return (
        <div className={styles.root}>
            <div className={styles.cards}>
                {games.map((game) => (
                    <div key={game.name} className={styles.card}>
                        <GameCard game={game} />
                    </div>
                ))}
            </div>
            <PaginatorButton
                ref={componentRef}
                loading={loading}
                visible={visible}
            />
        </div>
    );
}

interface HomeProps {
    initialGames: Game[];
    count: number;
}

export async function getServerSideProps(): Promise<{ props: HomeProps }> {
    const { results, count } = await fetchData(API_PATH.GAMES, `page=1&page_size=${pageSize}`);
    return {
        props: {
            count,
            initialGames: results,
        },
    };
}

export default Home;
