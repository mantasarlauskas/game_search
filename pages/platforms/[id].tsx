import { CategoryPageProps, NextPageContextWithID } from 'utils/types';
import CategoryPage from 'components/CategoryPage';
import { useAppContext } from 'pages/_app';
import { getCategoryPageServerSideProps, getCategoryTitle } from 'utils/categories';
import { DEFAULT_PAGE_SIZE } from 'utils/page';

function PlatformPage({ games, count, id }: CategoryPageProps) {
    const { platforms } = useAppContext();
    const title = getCategoryTitle(platforms, id);
    return (
        <CategoryPage
            games={games}
            count={count}
            query={{ platforms: id }}
            pageSize={DEFAULT_PAGE_SIZE}
            title={`Games for ${title}`}
        />
    );
}

export async function getServerSideProps({ params: { id } }: NextPageContextWithID) {
    return getCategoryPageServerSideProps(id, DEFAULT_PAGE_SIZE, { platforms: id });
}

export default PlatformPage;
