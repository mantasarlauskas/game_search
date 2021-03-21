import CategoriesPage from 'components/CategoriesPage';
import { useAppContext } from 'pages/_app';
import { PageTitle } from 'utils/page';

function PlatformsPage() {
    const { platforms } = useAppContext();
    return <CategoriesPage title={PageTitle.PLATFORMS} categories={platforms} />;
}

export default PlatformsPage;
