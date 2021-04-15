import { render } from '@testing-library/react';
import Spinner from 'components/Spinner';

describe('<Spinner />', () => {
    it('matches snapshot', () => {
        const { container } = render(<Spinner />);
        expect(container).toMatchSnapshot();
    });
});
