import { Game, NextPageContextWithID } from 'utils/types';
import CategoryPage from 'components/CategoryPage';
import { useAppContext } from 'pages/_app';
import { getCategoriesServerSideProps, getCategoryTitle } from 'utils/categories';

const pageSize = 20;

function PlatformPage({ games, count, id }: PlatformPageProps) {
    const { platforms } = useAppContext();
    const title = getCategoryTitle(platforms, id);
    return (
        <CategoryPage
            games={games}
            count={count}
            query={{ platforms: id }}
            pageSize={pageSize}
            title={`Games for ${title}`}
        />
    );
}

interface PlatformPageProps {
    id: string;
    games: Game[];
    count: number;
}

export async function getServerSideProps({ params: { id } }: NextPageContextWithID) {
    return getCategoriesServerSideProps(id, pageSize, { platforms: id });
}

export default PlatformPage;
