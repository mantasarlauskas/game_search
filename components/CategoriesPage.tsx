import CategoryCard from 'components/CategoryCard';
import styles from 'styles/categories-page.module.scss';
import { Category } from 'utils/types';

function CategoriesPage({ categories, title }: CategoryPageProps) {
    return (
        <div className={styles.root}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.categories}>
                {categories.map((category) => (
                    <CategoryCard
                        key={category.slug}
                        category={category}
                    />
                ))}
            </div>
        </div>
    );
}

interface CategoryPageProps {
    categories: Category[];
    title: string;
}

export default CategoriesPage;
