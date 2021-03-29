import { CategoryPageProps, NextPageContextWithID } from 'utils/types';
import CategoryPage from 'components/CategoryPage';
import { useAppContext } from 'pages/_app';
import { getCategoryPageServerSideProps, getCategoryName } from 'utils/categories';

function GenrePage({ games, count, id, nextPage }: CategoryPageProps) {
    const { genres } = useAppContext();
    const name = getCategoryName(genres, id);
    return (
        <CategoryPage
            name={name}
            games={games}
            count={count}
            nextPage={nextPage}
            queryParams={{ genres: id }}
            title={`${name} Games`}
        />
    );
}

export async function getServerSideProps({ params: { id } }: NextPageContextWithID) {
    return getCategoryPageServerSideProps(id, { genres: id });
}

export default GenrePage;
