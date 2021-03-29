import usePaginatedQuery from 'hooks/usePaginatedQuery';
import { Category } from 'utils/types';
import { ApiPath } from 'utils/fetch';
import CategoriesPage, { CategoriesPageProps } from 'components/CategoriesPage';
import PaginationButtons from 'components/PaginationButtons';

function PaginatedCategoriesPage({ categories, route, path, nextPage }: PaginatedCategoriesPageProps) {
    const {
        data,
        isFetching,
        paginatorRef,
        hasNextPage,
        hasPreviousPage,
    } = usePaginatedQuery<Category, HTMLButtonElement>({
        initialData: categories,
        initialNextPage: nextPage,
        path,
    });

    return (
        <>
            <CategoriesPage
                categories={data}
                route={route}
            />
            <PaginationButtons
                hasNextPage={!!hasNextPage}
                hasPreviousPage={!!hasPreviousPage}
                isFetching={isFetching}
                paginatorRef={paginatorRef}
            />
        </>
    );
}

interface PaginatedCategoriesPageProps extends CategoriesPageProps {
    path: ApiPath;
    nextPage?: string;
}

export default PaginatedCategoriesPage;
