import Link from 'next/link';
import { Category } from 'utils/types';
import styles from 'styles/category-card.module.scss';
import { Route } from 'utils/routes';

function CategoryCard({
    category: { image_background, name, id, games_count, games },
    visibleGameCount = 3,
}: CategoryCardProps) {
    const backgroundImage = `linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url(${image_background})`;
    return (
        <div
            className={styles.root}
            style={{ backgroundImage }}
        >
            <Link href={`${Route.GENRES}/${id}`}>
                <div className={styles.name}>
                    {name}
                </div>
            </Link>
            <div className={styles.heading}>
                <div className={styles.title}>
                    Games
                </div>
                <div className={styles.count}>
                    {games_count}
                </div>
            </div>
            {games.slice(0, visibleGameCount).map((game) => (
                <Link key={game.slug} href={`${Route.GAMES}/${game.slug}`}>
                    <div className={styles.row}>
                        {game.name}
                    </div>
                </Link>
            ))}
        </div>
    );
}

interface CategoryCardProps {
    category: Category;
    visibleGameCount?: number;
}

export default CategoryCard;
