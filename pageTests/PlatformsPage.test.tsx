import PlatformsPage from 'pages/platforms';
import { render, screen } from '@testing-library/react';
import { getCategories } from 'testing/testFactories';

jest.mock('utils/fetch');

const mockedCategories = getCategories();
jest.mock('pages/_app', () => ({
    useAppContext() {
        return {
            platforms: mockedCategories,
        };
    },
}));

describe('<PlatformsPage />', () => {
    it('matches snapshot', () => {
        const { container } = render(<PlatformsPage />);
        expect(container).toMatchSnapshot();
    });

    it('renders content', () => {
        render(<PlatformsPage />);
        expect(screen.getByText('Platforms')).toBeInTheDocument();
        expect(screen.getByText('Feral Interactive')).toBeInTheDocument();
        expect(screen.getByText('Ubisoft')).toBeInTheDocument();
    });
});
