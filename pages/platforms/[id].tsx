import { CategoryPageProps, NextPageContextWithID } from 'utils/types';
import CategoryPage from 'components/CategoryPage';
import { useAppContext } from 'pages/_app';
import { getCategoryPageServerSideProps, getCategoryTitle } from 'utils/categories';

function PlatformPage({ games, count, id, nextPage }: CategoryPageProps) {
    const { platforms } = useAppContext();
    const title = getCategoryTitle(platforms, id);
    return (
        <CategoryPage
            games={games}
            count={count}
            nextPage={nextPage}
            queryParams={{ platforms: id }}
            title={`Games for ${title}`}
        />
    );
}

export async function getServerSideProps({ params: { id } }: NextPageContextWithID) {
    return getCategoryPageServerSideProps(id, { platforms: id });
}

export default PlatformPage;
