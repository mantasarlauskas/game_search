import { CategoryPageProps, NextPageContextWithID } from 'utils/types';
import CategoryPage from 'components/CategoryPage';
import { useAppContext } from 'pages/_app';
import { getCategoryPageServerSideProps, getCategoryTitle } from 'utils/categories';
import { DEFAULT_PAGE_SIZE } from 'utils/page';

function GenrePage({ games, count, id }: CategoryPageProps) {
    const { genres } = useAppContext();
    const title = getCategoryTitle(genres, id);
    return (
        <CategoryPage
            games={games}
            count={count}
            query={{ genres: id }}
            pageSize={DEFAULT_PAGE_SIZE}
            title={`${title} Games`}
        />
    );
}

export async function getServerSideProps({ params: { id } }: NextPageContextWithID) {
    return getCategoryPageServerSideProps(id, DEFAULT_PAGE_SIZE, { genres: id });
}

export default GenrePage;
