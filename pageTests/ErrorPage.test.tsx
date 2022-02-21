import ErrorPage from 'pages/_error';
import { render, screen } from '@testing-library/react';

describe('<ErrorPage />', () => {
    it('returns server side error', () => {
        render(<ErrorPage statusCode={500} />);
        expect(screen.getByText('Server side error')).toBeInTheDocument();
        expect(screen.getByText('500')).toBeInTheDocument();
    });

    it('returns client side error', () => {
        render(<ErrorPage />);
        expect(
            screen.getByText('This page could not be found')
        ).toBeInTheDocument();
        expect(screen.getByText('404')).toBeInTheDocument();
    });
});
