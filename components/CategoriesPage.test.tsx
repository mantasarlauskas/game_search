import { render, screen } from '@testing-library/react';
import CategoriesPage from 'components/CategoriesPage';
import { getCategories } from 'testing/testFactories';
import { Route } from 'utils/routes';

describe('<CategoriesPage />', () => {
    const props = {
        route: Route.DEVELOPERS,
        categories: getCategories(),
    };

    it('matches snapshot', () => {
        const { container } = render(<CategoriesPage {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('shows page title and categories', () => {
        render(<CategoriesPage {...props} />);
        expect(screen.getByText('Developers')).toBeInTheDocument();
        expect(screen.getByText('Feral Interactive')).toBeInTheDocument();
        expect(screen.getByText('Ubisoft')).toBeInTheDocument();
    });
});
