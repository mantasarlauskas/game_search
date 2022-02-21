import PublishersPage, { getServerSideProps } from 'pages/publishers';
import { render, screen } from '@testing-library/react';
import { getCategories, getGames } from 'testing/testFactories';
import { fetchData } from 'utils/fetch';

jest.mock('hooks/usePaginatedQuery');
jest.mock('utils/fetch');

describe('<PublishersPage />', () => {
    const props = {
        categories: getCategories(),
        nextPage: '2',
    };

    it('matches snapshot', () => {
        const { container } = render(<PublishersPage {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('renders content', () => {
        render(<PublishersPage {...props} />);
        expect(screen.getByText('Publishers')).toBeInTheDocument();
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
            expect(fetchData).toBeCalledWith('publishers', {
                page: 1,
                page_size: 20,
            });
        });
    });
});
