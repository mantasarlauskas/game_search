import { render, screen } from '@testing-library/react';
import CategoryCard from 'components/CategoryCard';
import { getCategories } from 'testing/testFactories';
import { Route } from 'utils/routes';
import userEvent from '@testing-library/user-event';

describe('<CategoryCard />', () => {
    const props = {
        route: Route.DEVELOPERS,
        category: getCategories()[0],
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('matches snapshot', () => {
        const { container } = render(<CategoryCard {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('shows name and games', () => {
        render(<CategoryCard {...props} />);
        expect(screen.getByText('Feral Interactive')).toBeInTheDocument();
        expect(screen.getByText('Rise of the Tomb Raider')).toBeInTheDocument();
        expect(screen.getByText('Middle-earth: Shadow of Mordor')).toBeInTheDocument();
        expect(screen.getByText('Hitman')).toBeInTheDocument();
    });

    it('on name click goes to category page', () => {
        render(<CategoryCard {...props} />);
        userEvent.click(screen.getByText('Feral Interactive'));
        expect(window.open).toBeCalledWith('/developers/18893');
    });

    it('on game click goes to game page', () => {
        render(<CategoryCard {...props} />);
        userEvent.click(screen.getByText('Hitman'));
        expect(window.open).toBeCalledWith('/games/hitman');
    });
});
