import { render, screen } from '@testing-library/react';
import InfoList from 'components/InfoList';
import userEvent from '@testing-library/user-event';
import { Route } from 'utils/routes';

describe('<InfoList />', () => {
    const props = {
        route: Route.PUBLISHERS,
        list: [
            { name: 'name1', id: 1 },
            { name: 'name2', id: 2 },
        ],
    };

    it('matches snapshot', () => {
        const { container } = render(<InfoList {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('shows info list and on click opens correct page', () => {
        render(<InfoList {...props} />);
        userEvent.click(screen.getByText('name2'));
        expect(window.location.href).toEqual('/publishers/2');
        userEvent.click(screen.getByText(/name1/));
        expect(window.location.href).toEqual('/publishers/1');
    });
});
