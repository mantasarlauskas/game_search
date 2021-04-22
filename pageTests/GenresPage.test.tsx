import GenresPage from 'pages/genres';
import { render, screen } from '@testing-library/react';
import { getCategories } from 'testing/testFactories';

jest.mock('utils/fetch');

const mockedCategories = getCategories();
jest.mock('pages/_app', () => ({
    useAppContext() {
        return {
            genres: mockedCategories,
        };
    },
}));

describe('<GenresPage />', () => {
    it('matches snapshot', () => {
        const { container } = render(<GenresPage />);
        expect(container).toMatchSnapshot();
    });

    it('renders content', () => {
        render(<GenresPage />);
        expect(screen.getByText('Genres')).toBeInTheDocument();
        expect(screen.getByText('Feral Interactive')).toBeInTheDocument();
        expect(screen.getByText('Ubisoft')).toBeInTheDocument();
    });
});
