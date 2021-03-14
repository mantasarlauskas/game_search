import classNames from 'classnames';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from 'styles/menu-item-list.module.scss';
import ChevronRight from 'assets/chevron-right.svg';
import { Route } from 'utils/routes';
import DivButton from 'components/DivButton';

function MenuItemList({ items, title, visibleCount = 5, onItemClick }: MenuItemListProps) {
    const [expanded, setExpanded] = useState(false);
    const visibleItems = items.length > visibleCount && !expanded ? items.slice(0, visibleCount) : items;
    return (
        <div className={styles.root}>
            <Link href={Route.GENRES}>
                <div className={styles.title}>
                    {title}
                </div>
            </Link>
            {visibleItems.map(({ name, slug, image_background }) => (
                <Link key={slug} href={`${Route.GENRES}/${slug}`}>
                    <DivButton onClick={onItemClick} className={styles.item}>
                        <img className={styles.background} src={image_background} alt={name} />
                        <div className={styles.name}>
                            {name}
                        </div>
                    </DivButton>
                </Link>
            ))}
            <DivButton
                onClick={() => setExpanded(!expanded)}
                className={classNames(styles.item, styles.toggle, expanded && styles.expanded)}
            >
                <div className={styles.background}>
                    <ChevronRight className={styles.icon} />
                </div>
                <div className={styles.name}>
                    {expanded ? 'Hide' : 'Show all'}
                </div>
            </DivButton>
        </div>
    );
}

interface MenuItem {
    name: string;
    slug: string;
    image_background: string;
}

interface MenuItemListProps {
    title: string;
    items: MenuItem[];
    visibleCount?: number;
    onItemClick?: () => void;
}

export default MenuItemList;
