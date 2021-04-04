import { render, screen } from '@testing-library/react';
import CategoriesPage from 'components/CategoriesPage';
import { getCategories } from 'utils/testFactories';
import { Route } from 'utils/routes';

describe('<CategoriesPage />', () => {
    const props = {
        route: Route.DEVELOPERS,
        categories: getCategories(),
    };

    it('shows page title and categories', () => {
        render(<CategoriesPage {...props} />);
        expect(screen.getByText('Developers')).toBeInTheDocument();
        expect(screen.getByText('Feral Interactive')).toBeInTheDocument();
        expect(screen.getByText('Ubisoft')).toBeInTheDocument();
    });
});
