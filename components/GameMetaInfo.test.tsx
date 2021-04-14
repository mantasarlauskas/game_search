import { render, screen } from '@testing-library/react';
import GameMetaInfo from 'components/GameMetaInfo';
import { getGames } from 'testing/testFactories';
import userEvent from '@testing-library/user-event';

describe('<GameMetaInfo />', () => {
    const [game] = getGames();

    it('matches snapshot', () => {
        const { container } = render(<GameMetaInfo game={game} />);
        expect(container).toMatchSnapshot();
    });

    it('renders meta info', () => {
        render(<GameMetaInfo game={game} />);
        expect(screen.getByText(/PC/)).toBeInTheDocument();
        expect(screen.getByText('Xbox One')).toBeInTheDocument();
        expect(screen.getByText('95')).toBeInTheDocument();
        expect(screen.getByText(/Shooter/)).toBeInTheDocument();
        expect(screen.getByText('Puzzle')).toBeInTheDocument();
        expect(screen.getByText('2011-04-18')).toBeInTheDocument();
        expect(screen.getByText('Singleplayer')).toBeInTheDocument();
        expect(screen.getByText('Everyone 10+')).toBeInTheDocument();
    });

    it('on click goes to correct page', () => {
        render(<GameMetaInfo game={game} />);
        userEvent.click(screen.getByText(/PC/));
        expect(window.location.href).toEqual('/platforms/4');
        userEvent.click(screen.getByText(/Shooter/));
        expect(window.location.href).toEqual('/genres/2');
        userEvent.click(screen.getByText('Singleplayer'));
        expect(window.location.href).toEqual('/tags/31');
    });
});
