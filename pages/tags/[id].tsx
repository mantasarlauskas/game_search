import { CategoryPageProps, NextPageContextWithID } from 'utils/types';
import CategoryPage from 'components/CategoryPage';
import { ApiPath } from 'utils/fetch';
import { getCategoryAndGamesServerSideProps } from 'utils/categories';

function TagPage({ games, count, id, name, nextPage }: CategoryPageProps) {
    return (
        <CategoryPage
            games={games}
            count={count}
            nextPage={nextPage}
            queryParams={{ tags: id }}
            title={`${name} Games`}
        />
    );
}

export async function getServerSideProps({ params: { id } }: NextPageContextWithID) {
    return getCategoryAndGamesServerSideProps(ApiPath.TAGS, id, { tags: id });
}

export default TagPage;
