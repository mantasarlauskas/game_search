import { CategoryPageProps, NextPageContextWithID } from 'utils/types';
import CategoryPage from 'components/CategoryPage';
import { useAppContext } from 'pages/_app';
import { getCategoryPageServerSideProps, getCategoryTitle } from 'utils/categories';

function GenrePage({ games, count, id, nextPage }: CategoryPageProps) {
    const { genres } = useAppContext();
    const title = getCategoryTitle(genres, id);
    return (
        <CategoryPage
            games={games}
            count={count}
            nextPage={nextPage}
            queryParams={{ genres: id }}
            title={`${title} Games`}
        />
    );
}

export async function getServerSideProps({ params: { id } }: NextPageContextWithID) {
    return getCategoryPageServerSideProps(id, { genres: id });
}

export default GenrePage;
