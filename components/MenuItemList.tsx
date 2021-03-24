import classNames from 'classnames';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from 'styles/menu-item-list.module.scss';
import ChevronRight from 'assets/chevron-right.svg';
import { Route } from 'utils/routes';
import DivButton from 'components/DivButton';
import { cropImageUrl } from 'utils/image';

function MenuItemList({ items, title, visibleCount = 5, expandedCount, route }: MenuItemListProps) {
    const [expanded, setExpanded] = useState(false);
    const visibleItems = items.length > visibleCount && !expanded ? items.slice(0, visibleCount) : items;
    return (
        <div className={styles.root}>
            <Link href={route}>
                <div className={styles.title}>
                    {title}
                </div>
            </Link>
            {(expandedCount ? visibleItems.slice(0, expandedCount) : visibleItems)
                .map(({ name, id, image_background }) => (
                    <Link key={id} href={`${route}/${id}`}>
                        <div className={styles.item}>
                            <img
                                className={styles.background}
                                src={cropImageUrl(image_background)}
                                alt={name}
                            />
                            <div className={styles.name}>
                                {name}
                            </div>
                        </div>
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
    id: number;
    image_background: string;
}

interface MenuItemListProps {
    title: string;
    items: MenuItem[];
    visibleCount?: number;
    expandedCount?: number;
    route: Route;
}

export default MenuItemList;
