import { CategoryPageProps, NextPageContextWithID } from 'utils/types';
import CategoryPage from 'components/CategoryPage';
import { getCategoryAndGamesServerSideProps } from 'utils/categories';
import { ApiPath } from 'utils/fetch';
import { DEFAULT_PAGE_SIZE } from 'utils/page';

function DeveloperPage({ games, count, id, name }: CategoryPageProps) {
    return (
        <CategoryPage
            games={games}
            count={count}
            query={{ developers: id }}
            pageSize={DEFAULT_PAGE_SIZE}
            title={`Developed by ${name}`}
        />
    );
}

export async function getServerSideProps({ params: { id } }: NextPageContextWithID) {
    return getCategoryAndGamesServerSideProps(ApiPath.DEVELOPERS, id, DEFAULT_PAGE_SIZE, { developers: id });
}

export default DeveloperPage;
