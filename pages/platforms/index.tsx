import CategoriesPage from 'components/CategoriesPage';
import { useAppContext } from 'pages/_app';
import { PageTitle } from 'utils/page';
import { Route } from 'utils/routes';

function PlatformsPage() {
    const { platforms } = useAppContext();
    return (
        <CategoriesPage
            title={PageTitle.PLATFORMS}
            categories={platforms}
            route={Route.PLATFORMS}
        />
    );
}

export default PlatformsPage;
