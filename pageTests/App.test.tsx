import App from 'pages/_app';
import { render, screen } from '@testing-library/react';
import { AppProps } from 'next/app';
import { Router } from 'next/router';
import { getCategories } from 'testing/testFactories';
import { fetchData } from 'utils/fetch';

jest.mock('utils/fetch');
jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: 'Games',
        };
    },
}));

const categories = getCategories();
(fetchData as jest.Mock).mockResolvedValue({ results: categories });

describe('<App />', () => {
    const [category1, category2] = categories;
    const props = {
        Component: () => <span>Component</span>,
        pageProps: {} as AppProps,
        router: {} as Router,
        genres: [category1],
        platforms: [category2],
        stores: [],
    };

    it('matches snapshot', () => {
        const { container } = render(<App {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('shows content', () => {
        render(<App {...props} />);
        expect(screen.getByText('Genres')).toBeInTheDocument();
        expect(screen.getByText('Feral Interactive')).toBeInTheDocument();
        expect(screen.getByText('Platforms')).toBeInTheDocument();
        expect(screen.getByText('Ubisoft')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search games')).toBeInTheDocument();
    });

    describe('getInitialProps', () => {
        it('returns initial props', async () => {
            const res = await App.getInitialProps();
            expect(res).toEqual({
                genres: categories,
                platforms: categories,
                stores: categories,
            });

            expect(fetchData).toBeCalledWith('genres');
            expect(fetchData).toBeCalledWith('platforms');
            expect(fetchData).toBeCalledWith('stores');
        });
    });
});
