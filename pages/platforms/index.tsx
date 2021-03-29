import CategoriesPage from 'components/CategoriesPage';
import { useAppContext } from 'pages/_app';
import { Route } from 'utils/routes';

function PlatformsPage() {
    const { platforms } = useAppContext();
    return (
        <CategoriesPage
            categories={platforms}
            route={Route.PLATFORMS}
        />
    );
}

export default PlatformsPage;
