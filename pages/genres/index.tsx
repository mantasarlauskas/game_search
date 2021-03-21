import { useAppContext } from 'pages/_app';
import CategoriesPage from 'components/CategoriesPage';
import { PageTitle } from 'utils/page';

function GenresPage() {
    const { genres } = useAppContext();
    return <CategoriesPage title={PageTitle.GENRES} categories={genres} />;
}

export default GenresPage;
