import { render, screen } from '@testing-library/react';
import Menu from 'components/Menu';
import { getCategories } from 'testing/testFactories';

const mockedCategories = getCategories();
jest.mock('pages/_app', () => ({
    useAppContext() {
        return {
            genres: [mockedCategories[0]],
            platforms: [mockedCategories[1]],
            stores: [],
        };
    },
}));

jest.mock('next/router', () => ({
    useRouter() {
        return {
            asPath: '',
        };
    },
}));

describe('<Menu />', () => {
    it('matches snapshot', () => {
        const { container } = render(<Menu />);
        expect(container).toMatchSnapshot();
    });

    it('shows menu items', () => {
        render(<Menu />);
        expect(screen.getByText('Feral Interactive')).toBeInTheDocument();
        expect(screen.getByAltText('Feral Interactive')).toBeInTheDocument();
        expect(screen.getByText('Ubisoft')).toBeInTheDocument();
        expect(screen.getByAltText('Ubisoft')).toBeInTheDocument();
    });
});
