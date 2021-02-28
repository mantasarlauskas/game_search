import React, { forwardRef, RefObject } from 'react';
import styles from 'styles/paginator-button.module.scss';
import Spinner from 'components/Spinner';

function PaginatorButton({ loading, visible, onClick }: PaginatorButtonProps, ref: RefObject<HTMLButtonElement>) {
    if (!visible) {
        return null;
    }

    return (
        <button
            type="button"
            ref={ref}
            className={styles.root}
            onClick={() => onClick?.()}
        >
            {loading ? <Spinner /> : 'Load more'}
        </button>
    );
}

interface PaginatorButtonProps {
    loading: boolean;
    visible: boolean;
    onClick?: () => void;
}

export default forwardRef(PaginatorButton);
