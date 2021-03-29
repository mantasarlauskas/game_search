import CategoriesPage from 'components/CategoriesPage';
import { Route } from 'utils/routes';
import { useAppContext } from 'pages/_app';

function StoresPage() {
    const { stores } = useAppContext();
    return (
        <CategoriesPage
            categories={stores}
            route={Route.STORES}
        />
    );
}

export default StoresPage;
