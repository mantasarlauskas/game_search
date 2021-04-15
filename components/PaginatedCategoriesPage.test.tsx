import { render, screen } from '@testing-library/react';
import PaginatedCategoriesPage from 'components/PaginatedCategoriesPage';
import { getCategories } from 'testing/testFactories';
import { Route } from 'utils/routes';
import { ApiPath } from 'utils/fetch';

jest.mock('hooks/usePaginatedQuery');

describe('<PaginatedCategoriesPage />', () => {
    const props = {
        categories: getCategories(),
        route: Route.DEVELOPERS,
        path: ApiPath.DEVELOPERS,
    };

    it('matches snapshot', () => {
        const { container } = render(<PaginatedCategoriesPage {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('shows name, games and categories', () => {
        render(<PaginatedCategoriesPage {...props} />);
        expect(screen.getByText('Developers')).toBeInTheDocument();
        expect(screen.getByText('Feral Interactive')).toBeInTheDocument();
        expect(screen.getByText('Rise of the Tomb Raider')).toBeInTheDocument();
        expect(screen.getByText('Middle-earth: Shadow of Mordor')).toBeInTheDocument();
        expect(screen.getByText('Hitman')).toBeInTheDocument();
        expect(screen.getByText('Ubisoft')).toBeInTheDocument();
        expect(screen.getByText('Far Cry 3')).toBeInTheDocument();
        expect(screen.getByText('For Honor')).toBeInTheDocument();
        expect(screen.getByText('Watch Dogs')).toBeInTheDocument();
    });
});
