import { render, screen } from '@testing-library/react';
import MenuItemList from 'components/MenuItemList';
import { getCategories } from 'testing/testFactories';
import { Route } from 'utils/routes';
import userEvent from '@testing-library/user-event';

describe('<MenuItemList />', () => {
    const props = {
        route: Route.DEVELOPERS,
        items: getCategories(),
    };

    it('matches snapshot', () => {
        const { container } = render(<MenuItemList {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('shows menu list items', () => {
        render(<MenuItemList {...props} />);
        expect(screen.getByText('Developers')).toBeInTheDocument();
        expect(screen.getByText('Feral Interactive')).toBeInTheDocument();
        expect(screen.getByAltText('Feral Interactive')).toBeInTheDocument();
        expect(screen.getByText('Ubisoft')).toBeInTheDocument();
        expect(screen.getByAltText('Ubisoft')).toBeInTheDocument();
    });

    it('on click goes to correct page', () => {
        render(<MenuItemList {...props} />);
        userEvent.click(screen.getByText('Developers'));
        expect(window.location.href).toEqual('/developers');
        userEvent.click(screen.getByText('Ubisoft'));
        expect(window.location.href).toEqual('/developers/405');
        userEvent.click(screen.getByText('Feral Interactive'));
        expect(window.location.href).toEqual('/developers/18893');
    });

    it('it expands and collapses list on click with limit value set', () => {
        render(<MenuItemList {...props} visibleCount={1} />);
        expect(screen.getByText('Feral Interactive')).toBeInTheDocument();
        expect(screen.queryByText('Ubisoft')).not.toBeInTheDocument();
        userEvent.click(screen.getByRole('button', { name: 'Show all' }));
        expect(screen.getByText('Ubisoft')).toBeInTheDocument();
        userEvent.click(screen.getByRole('button', { name: 'Hide' }));
        expect(screen.queryByText('Ubisoft')).not.toBeInTheDocument();
    });
});
