import React, { ReactNode } from 'react';
import styles from 'styles/meta-block.module.scss';

function MetaBlock({ title, content }: MetaBlockProps) {
    return (
        <div className={styles.root}>
            <div className={styles.title}>
                {title}
            </div>
            {content}
        </div>
    );
}

interface MetaBlockProps {
    title: string;
    content: ReactNode;
}

export default MetaBlock;
