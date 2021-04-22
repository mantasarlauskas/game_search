import StoresPage from 'pages/stores';
import { render, screen } from '@testing-library/react';
import { getCategories } from 'testing/testFactories';

jest.mock('utils/fetch');

const mockedCategories = getCategories();
jest.mock('pages/_app', () => ({
    useAppContext() {
        return {
            stores: mockedCategories,
        };
    },
}));

describe('<StoresPage />', () => {
    it('matches snapshot', () => {
        const { container } = render(<StoresPage />);
        expect(container).toMatchSnapshot();
    });

    it('renders content', () => {
        render(<StoresPage />);
        expect(screen.getByText('Stores')).toBeInTheDocument();
        expect(screen.getByText('Feral Interactive')).toBeInTheDocument();
        expect(screen.getByText('Ubisoft')).toBeInTheDocument();
    });
});
