import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from 'components/SearchBar';
import { getGames } from 'testing/testFactories';
import userEvent from '@testing-library/user-event';
import { useQuery } from 'react-query';

jest.mock('components/Spinner', () => () => <span>Spinner</span>);
jest.mock('react-query', () => ({
    useQuery: jest.fn(),
}));

const mockPush = jest.fn();
jest.mock('next/router', () => ({
    useRouter() {
        return {
            push: mockPush,
        };
    },
}));

(useQuery as jest.Mock).mockReturnValue({
    data: { results: getGames() },
    isLoading: false,
});

describe('<SearchBar />', () => {
    it('matches snapshot', () => {
        const { container } = render(<SearchBar />);
        expect(container).toMatchSnapshot();
    });

    it('updates input value on change', () => {
        render(<SearchBar />);
        userEvent.type(screen.getByPlaceholderText('Search games'), 'text');
        expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual('text');
    });

    it('shows games on input click and hides them on outside click', () => {
        render(<SearchBar />);
        expect(screen.queryByText('Portal 2')).not.toBeInTheDocument();
        expect(screen.queryByText('Tomb Raider (2013)')).not.toBeInTheDocument();

        userEvent.click(screen.getByRole('textbox'));
        expect(screen.getByText('Portal 2')).toBeInTheDocument();
        expect(screen.getByText('Tomb Raider (2013)')).toBeInTheDocument();

        userEvent.click(document.body);
        expect(screen.queryByText('Portal 2')).not.toBeInTheDocument();
        expect(screen.queryByText('Tomb Raider (2013)')).not.toBeInTheDocument();
    });

    it('on game click goes to game page', () => {
        render(<SearchBar />);
        userEvent.click(screen.getByRole('textbox'));
        userEvent.click(screen.getByText('Portal 2'));
        expect(window.location.href).toEqual('/games/portal-2');
    });

    it('on enter click goes to search page', () => {
        render(<SearchBar />);
        userEvent.type(screen.getByPlaceholderText('Search games'), 'text');
        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
        expect(mockPush).toBeCalledTimes(1);
        expect(mockPush).toBeCalledWith('/search/text');
    });

    it('shows spinner if data is fetching', () => {
        (useQuery as jest.Mock).mockReturnValue({ isLoading: true });
        render(<SearchBar />);
        userEvent.click(screen.getByRole('textbox'));
        expect(screen.getByText('Spinner')).toBeInTheDocument();
    });
});
