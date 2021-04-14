import { render, screen } from '@testing-library/react';
import InfoList from 'components/InfoList';
import userEvent from '@testing-library/user-event';

describe('<InfoList />', () => {
    const list = [
        { name: 'name1', id: 1 },
        { name: 'name2', id: 2, url: 'url2' },
    ];

    it('matches snapshot', () => {
        const { container } = render(<InfoList list={list} />);
        expect(container).toMatchSnapshot();
    });

    it('shows info list and on click opens correct page', () => {
        render(<InfoList list={list} />);
        userEvent.click(screen.getByText('name2'));
        expect(window.location.href).toEqual('url2');
        userEvent.click(screen.getByText(/name1/));
        expect(window.location.href).toEqual('url2');
    });
});
