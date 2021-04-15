import { render, screen } from '@testing-library/react';
import PageHead from 'components/PageHead';

jest.mock('next/head', () => ({ children }: any) => children);
jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/developers',
        };
    },
}));

describe('<PageHead />', () => {
    it('matches snapshot', () => {
        const { container } = render(<PageHead />);
        expect(container).toMatchSnapshot();
    });

    it('renders page route as title', () => {
        render(<PageHead />);
        expect(screen.getByText('Developers')).toBeInTheDocument();
    });

    it('renders custom title', () => {
        render(<PageHead title="title" />);
        expect(screen.getByText('title')).toBeInTheDocument();
    });
});
