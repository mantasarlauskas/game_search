import Link from 'next/link';
import { Category } from 'utils/types';
import styles from 'styles/category-card.module.scss';
import { Route } from 'utils/routes';
import { cropImageUrl } from 'utils/image';

function CategoryCard({
    route,
    category: { image_background, name, id, games_count, games },
    visibleGameCount = 3,
}: CategoryCardProps) {
    const imageUrl = cropImageUrl(image_background);
    const backgroundImage = `linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url(${imageUrl})`;
    return (
        <div
            className={styles.root}
            style={{ backgroundImage }}
        >
            <Link href={`${route}/${id}`}>
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
    route: Route;
}

export default CategoryCard;
