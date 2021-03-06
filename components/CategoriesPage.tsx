import CategoryCard from 'components/CategoryCard';
import { Category } from 'utils/types';
import { Route } from 'utils/routes';
import styles from 'components/CategoriesPage.module.scss';
import { PageTitle } from 'utils/page';

function CategoriesPage({ categories, route }: CategoriesPageProps) {
    return (
        <div className={styles.root}>
            <h1 className={styles.title}>{PageTitle[route]}</h1>
            <div className={styles.categories}>
                {categories.map((category) => (
                    <CategoryCard
                        key={category.slug}
                        category={category}
                        route={route}
                    />
                ))}
            </div>
        </div>
    );
}

export interface CategoriesPageProps {
    categories: Category[];
    route: Route;
}

export default CategoriesPage;
