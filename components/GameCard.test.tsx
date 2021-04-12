import GameCard from 'components/GameCard';
import { getGames } from 'testing/testFactories';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<GameCard />', () => {
    const [game] = getGames();

    it('matches snapshot', () => {
        const { container } = render(<GameCard game={game} />);
        expect(container).toMatchSnapshot();
    });

    it('shows game info', () => {
        render(<GameCard game={game} />);
        expect(screen.getByAltText('Portal 2')).toBeInTheDocument();
        expect(screen.getByText('95')).toBeInTheDocument();
        expect(screen.getByText(/PC/)).toBeInTheDocument();
        expect(screen.getByText('Xbox One')).toBeInTheDocument();
        expect(screen.getByText('Portal 2')).toBeInTheDocument();
    });

    it('on image hover shows video', () => {
        const { container } = render(<GameCard game={game} />);
        expect(screen.getByRole('img')).toBeInTheDocument();
        userEvent.hover(screen.getByRole('button'));
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
        expect(container.querySelector('video')).toBeInTheDocument();

        userEvent.unhover(screen.getByRole('button'));
        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(container.querySelector('video')).not.toBeInTheDocument();
    });

    it('on image click shows video', () => {
        const { container } = render(<GameCard game={game} />);
        expect(screen.getByRole('img')).toBeInTheDocument();
        userEvent.click(screen.getByRole('button'));
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
        expect(container.querySelector('video')).toBeInTheDocument();
    });

    it('on name click goes to game page', () => {
        render(<GameCard game={game} />);
        userEvent.click(screen.getByText('Portal 2'));
        expect(window.location.href).toEqual('/games/portal-2');
    });

    it('on platform name click goes to platform page', () => {
        render(<GameCard game={game} />);
        userEvent.click(screen.getByText('Xbox One'));
        expect(window.location.href).toEqual('/platforms/1');
    });
});
