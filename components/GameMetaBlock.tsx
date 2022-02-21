import { ReactNode } from 'react';
import styles from 'components/GameMetaBlock.module.scss';

function GameMetaBlock({ title, children }: GameMetaBlockProps) {
    return (
        <div className={styles.root}>
            <div className={styles.title}>{title}</div>
            {children}
        </div>
    );
}

interface GameMetaBlockProps {
    title: string;
    children: ReactNode;
}

export default GameMetaBlock;
