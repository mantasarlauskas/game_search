import { CategoryPageProps, NextPageContextWithID } from 'utils/types';
import CategoryPage from 'components/CategoryPage';
import { getCategoryName, getCategoryPageServerSideProps } from 'utils/categories';
import { useAppContext } from 'pages/_app';

function StorePage({ games, count, id, nextPage }: CategoryPageProps) {
    const { stores } = useAppContext();
    const name = getCategoryName(stores, id);
    return (
        <CategoryPage
            name={name}
            games={games}
            count={count}
            nextPage={nextPage}
            queryParams={{ stores: id }}
            title={`Games available on ${name}`}
        />
    );
}

export async function getServerSideProps({ params: { id }, query }: NextPageContextWithID) {
    return getCategoryPageServerSideProps(query, id, { stores: id });
}

export default StorePage;
