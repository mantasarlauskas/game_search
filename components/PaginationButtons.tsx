import { RefObject } from 'react';
import PaginatorButton from 'components/PaginatorButton';
import BackToTopButton from 'components/BackToTopButton';

function PaginationButtons({
    hasNextPage,
    hasPreviousPage,
    isFetching,
    paginatorRef,
    onClick,
}: PaginationButtonsProps) {
    return (
        <>
            <PaginatorButton
                ref={paginatorRef}
                isFetching={isFetching}
                isVisible={hasNextPage}
                onClick={onClick}
            />
            <BackToTopButton
                isEnabled={hasPreviousPage}
            />
        </>
    );
}

interface PaginationButtonsProps {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    isFetching: boolean;
    onClick?: () => void;
    paginatorRef?: RefObject<HTMLButtonElement>;
}

export default PaginationButtons;
