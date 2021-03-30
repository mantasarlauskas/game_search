import { CategoryPageProps, NextPageContextWithID } from 'utils/types';
import CategoryPage from 'components/CategoryPage';
import { useAppContext } from 'pages/_app';
import { getCategoryPageServerSideProps, getCategoryName } from 'utils/categories';

function PlatformPage({ games, count, id, nextPage }: CategoryPageProps) {
    const { platforms } = useAppContext();
    const name = getCategoryName(platforms, id);
    return (
        <CategoryPage
            name={name}
            games={games}
            count={count}
            nextPage={nextPage}
            queryParams={{ platforms: id }}
            title={`Games for ${name}`}
        />
    );
}

export async function getServerSideProps({ params: { id }, query }: NextPageContextWithID) {
    return getCategoryPageServerSideProps(query, id, { platforms: id });
}

export default PlatformPage;
