import { forwardRef, RefObject } from 'react';
import styles from 'components/PaginatorButton.module.scss';
import Spinner from 'components/Spinner';

function PaginatorButton(
    { isFetching, isVisible, onClick }: PaginatorButtonProps,
    ref: RefObject<HTMLButtonElement>
) {
    if (!isVisible) {
        return null;
    }

    return (
        <button
            type="button"
            ref={ref}
            className={styles.root}
            onClick={() => onClick?.()}
        >
            {isFetching ? <Spinner /> : 'Load more'}
        </button>
    );
}

interface PaginatorButtonProps {
    isFetching: boolean;
    isVisible: boolean;
    onClick?: () => void;
}

export default forwardRef(PaginatorButton);
