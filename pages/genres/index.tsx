import { useAppContext } from 'pages/_app';
import CategoriesPage from 'components/CategoriesPage';
import { PageTitle } from 'utils/page';
import { Route } from 'utils/routes';

function GenresPage() {
    const { genres } = useAppContext();
    return (
        <CategoriesPage
            title={PageTitle.GENRES}
            categories={genres}
            route={Route.GENRES}
        />
    );
}

export default GenresPage;
