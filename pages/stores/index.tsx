import CategoriesPage from 'components/CategoriesPage';
import { PageTitle } from 'utils/page';
import { Route } from 'utils/routes';
import { useAppContext } from 'pages/_app';

function StoresPage() {
    const { stores } = useAppContext();
    return (
        <CategoriesPage
            categories={stores}
            title={PageTitle.STORES}
            route={Route.STORES}
        />
    );
}

export default StoresPage;
