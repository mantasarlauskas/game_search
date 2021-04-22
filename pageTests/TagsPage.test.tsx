import TagsPage, { getServerSideProps } from 'pages/tags';
import { render, screen } from '@testing-library/react';
import { getCategories, getGames } from 'testing/testFactories';
import { fetchData } from 'utils/fetch';

jest.mock('hooks/usePaginatedQuery');
jest.mock('utils/fetch');

describe('<TagsPage />', () => {
    const props = {
        categories: getCategories(),
        nextPage: '2',
    };

    it('matches snapshot', () => {
        const { container } = render(<TagsPage {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('renders content', () => {
        render(<TagsPage {...props} />);
        expect(screen.getByText('Tags')).toBeInTheDocument();
        expect(screen.getByText('Feral Interactive')).toBeInTheDocument();
        expect(screen.getByText('Ubisoft')).toBeInTheDocument();
    });

    describe('getServerSideProps', () => {
        it('returns server side props', async () => {
            const res = await getServerSideProps();
            expect(res).toEqual({
                props: {
                    categories: getGames(),
                    nextPage: '2',
                },
            });

            expect(fetchData).toBeCalledTimes(1);
            expect(fetchData).toBeCalledWith('tags', { page: 1, page_size: 20 });
        });
    });
});
