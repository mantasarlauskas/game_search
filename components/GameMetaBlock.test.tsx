import { render, screen } from '@testing-library/react';
import GameMetaBlock from 'components/GameMetaBlock';

describe('<GameMetaBlock />', () => {
    const props = {
        title: 'title',
        children: <span>children</span>,
    };

    it('matches snapshot', () => {
        const { container } = render(<GameMetaBlock {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('shows title with children', () => {
        render(<GameMetaBlock {...props} />);
        expect(screen.getByText('title')).toBeInTheDocument();
        expect(screen.getByText('children')).toBeInTheDocument();
    });
});
