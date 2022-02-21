import { useAppContext } from 'pages/_app';
import CategoriesPage from 'components/CategoriesPage';
import { Route } from 'utils/routes';

function GenresPage() {
    const { genres } = useAppContext();
    return <CategoriesPage categories={genres} route={Route.GENRES} />;
}

export default GenresPage;
