import React from 'react';
import Link from 'next/link';
import { Info } from 'utils/types';
import styles from 'styles/info-list.module.scss';

function InfoList({ list }: InfoListProps) {
    return (
        <>
            {list.map(({ name, id, url }, idx) => {
                const content = idx < list.length - 1 ? `${name}, ` : name;
                return !url ? content : (
                    <Link key={id} href={url}>
                        <span className={styles.item}>
                            {content}
                        </span>
                    </Link>
                );
            })}
        </>
    );
}

interface InfoListProps {
    list: Info[];
}

export default InfoList;
