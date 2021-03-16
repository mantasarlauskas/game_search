import React, { useEffect, useState } from 'react';
import styles from 'styles/game-description.module.scss';

function GameDescription({ description, slug, letterCount = 500 }: GameDescriptionProps) {
    const [expanded, setExpanded] = useState(false);
    const isOverLimit = description.length > letterCount;

    useEffect(() => {
        setExpanded(false);
    }, [slug]);

    return (
        <div className={styles.root}>
            <div dangerouslySetInnerHTML={{ __html: isOverLimit && !expanded
                ? `${description.substring(0, letterCount)}...` : description }}
            />
            {isOverLimit && (
                <button
                    className={styles.button}
                    type="button"
                    onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
                >
                    {expanded ? 'Show less' : 'Read more'}
                </button>
            )}
        </div>
    );
}

interface GameDescriptionProps {
    description: string;
    letterCount?: number
    slug: string;
}

export default GameDescription;
