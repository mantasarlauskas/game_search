import { ApiPath } from 'utils/fetch';
import { CategoriesPageProps } from 'utils/types';
import { Route } from 'utils/routes';
import PaginatedCategoriesPage from 'components/PaginatedCategoriesPage';
import { getCategoriesPageServerSideProps } from 'utils/categories';

function PublishersPage({ categories, nextPage }: CategoriesPageProps) {
    return (
        <PaginatedCategoriesPage
            nextPage={nextPage}
            path={ApiPath.PUBLISHERS}
            categories={categories}
            route={Route.PUBLISHERS}
        />
    );
}

export async function getServerSideProps(): Promise<{
    props: CategoriesPageProps;
}> {
    return getCategoriesPageServerSideProps(ApiPath.PUBLISHERS);
}

export default PublishersPage;
