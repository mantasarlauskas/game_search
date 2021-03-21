import React, { ReactNode } from 'react';
import styles from 'styles/game-meta-block.module.scss';

function GameMetaBlock({ title, children }: GameMetaBlockProps) {
    return (
        <div className={styles.root}>
            <div className={styles.title}>
                {title}
            </div>
            {children}
        </div>
    );
}

interface GameMetaBlockProps {
    title: string;
    children: ReactNode;
}

export default GameMetaBlock;
