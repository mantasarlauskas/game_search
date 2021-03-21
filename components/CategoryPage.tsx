import useAppendableResults from 'hooks/useAppendableResults';
import { Game } from 'utils/types';
import { API_PATH, QueryParams } from 'utils/fetch';
import styles from 'styles/category-page.module.scss';
import GameCard from 'components/GameCard';
import PaginatorButton from 'components/PaginatorButton';

function CategoryPage({ games, query, pageSize, count, title }: CategoryPageProps) {
    const { results, loading, paginatorRef, paginatorVisible } = useAppendableResults<Game>({
        initialResults: games,
        path: API_PATH.GAMES,
        query,
        pageSize,
        count,
    });

    return (
        <div className={styles.root}>
            <h1 className={styles.title}>{title}</h1>
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

interface CategoryPageProps {
    games: Game[];
    count: number;
    query: QueryParams;
    pageSize: number;
    title: string;
}

export default CategoryPage;
