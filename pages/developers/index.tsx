import { ApiPath } from 'utils/fetch';
import { CategoriesPageProps } from 'utils/types';
import { Route } from 'utils/routes';
import PaginatedCategoriesPage from 'components/PaginatedCategoriesPage';
import { getCategoriesPageServerSideProps } from 'utils/categories';

function DevelopersPage({ categories, nextPage }: CategoriesPageProps) {
    return (
        <PaginatedCategoriesPage
            nextPage={nextPage}
            path={ApiPath.DEVELOPERS}
            categories={categories}
            route={Route.DEVELOPERS}
        />
    );
}

export async function getServerSideProps(): Promise<{
    props: CategoriesPageProps;
}> {
    return getCategoriesPageServerSideProps(ApiPath.DEVELOPERS);
}

export default DevelopersPage;
