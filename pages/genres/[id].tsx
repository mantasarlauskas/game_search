import { Game, NextPageContextWithID } from 'utils/types';
import CategoryPage from 'components/CategoryPage';
import { useAppContext } from 'pages/_app';
import { getCategoriesServerSideProps, getCategoryTitle } from 'utils/categories';

const pageSize = 20;

function GenrePage({ games, count, id }: GenrePageProps) {
    const { genres } = useAppContext();
    const title = getCategoryTitle(genres, id);
    return (
        <CategoryPage
            games={games}
            count={count}
            query={{ genres: id }}
            pageSize={pageSize}
            title={`${title} Games`}
        />
    );
}

interface GenrePageProps {
    id: string;
    games: Game[];
    count: number;
}

export async function getServerSideProps({ params: { id } }: NextPageContextWithID) {
    return getCategoriesServerSideProps(id, pageSize, { genres: id });
}

export default GenrePage;
