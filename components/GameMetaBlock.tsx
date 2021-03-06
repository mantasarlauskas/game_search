import React, { ReactNode } from 'react';
import styles from 'styles/game-meta-block.module.scss';

function GameMetaBlock({ title, content }: GameMetaBlockProps) {
    return (
        <div className={styles.root}>
            <div className={styles.title}>
                {title}
            </div>
            {content}
        </div>
    );
}

interface GameMetaBlockProps {
    title: string;
    content: ReactNode;
}

export default GameMetaBlock;
