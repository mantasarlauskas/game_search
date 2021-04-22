import { CategoryPageWithNameProps, NextPageContextWithID } from 'utils/types';
import CategoryPage from 'components/CategoryPage';
import { ApiPath } from 'utils/fetch';
import { getCategoryAndGamesServerSideProps } from 'utils/categories';

function TagPage({ games, count, id, name, nextPage }: CategoryPageWithNameProps) {
    return (
        <CategoryPage
            name={name}
            games={games}
            count={count}
            nextPage={nextPage}
            queryParams={{ tags: id }}
            title={`${name} Games`}
        />
    );
}

export async function getServerSideProps({ params: { id }, query }: NextPageContextWithID) {
    return getCategoryAndGamesServerSideProps(query, ApiPath.TAGS, id, { tags: id });
}

export default TagPage;
