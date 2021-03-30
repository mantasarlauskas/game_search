import { CategoryPageProps, NextPageContextWithID } from 'utils/types';
import CategoryPage from 'components/CategoryPage';
import { getCategoryAndGamesServerSideProps } from 'utils/categories';
import { ApiPath } from 'utils/fetch';

function DeveloperPage({ games, count, id, name, nextPage }: CategoryPageProps) {
    return (
        <CategoryPage
            name={name}
            games={games}
            count={count}
            nextPage={nextPage}
            queryParams={{ developers: id }}
            title={`Developed by ${name}`}
        />
    );
}

export async function getServerSideProps({ params: { id }, query }: NextPageContextWithID) {
    return getCategoryAndGamesServerSideProps(query, ApiPath.DEVELOPERS, id, { developers: id });
}

export default DeveloperPage;
