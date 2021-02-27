import React, { useState } from 'react';
import styles from 'styles/description.module.scss';

function Description({ description, letterCount = 500 }: DescriptionProps) {
    const [expanded, setExpanded] = useState(false);
    const isOverLimit = description.length > letterCount;
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

interface DescriptionProps {
    description: string;
    letterCount?: number
}

export default Description;
