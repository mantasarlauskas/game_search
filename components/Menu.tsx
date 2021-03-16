import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Genre } from 'utils/types';
import MenuItemList from 'components/MenuItemList';
import styles from 'styles/menu.module.scss';
import { Route } from 'utils/routes';
import Link from 'next/link';
import MenuIcon from 'assets/menu.svg';
import { useRouter } from 'next/router';

function Menu({ genres }: MenuProps) {
    const [fullscreenVisible, setFullscreenVisible] = useState(false);
    const { asPath } = useRouter();

    useEffect(() => {
        setFullscreenVisible(false);
    }, [asPath]);

    useEffect(() => {
        document.body.style.overflow = fullscreenVisible ? 'hidden' : 'unset';
    }, [fullscreenVisible]);

    if (fullscreenVisible) {
        return createPortal(
            <div className={styles.portal}>
                <MenuIcon
                    onClick={() => setFullscreenVisible(false)}
                    className={styles.icon}
                />
                <Link href={Route.HOME}>
                    <div className={styles.item}>
                        Home
                    </div>
                </Link>
                <MenuItemList
                    title="Genres"
                    items={genres}
                />
            </div>,
            document.body,
        );
    }

    return (
        <div className={styles.root}>
            <MenuIcon
                onClick={() => setFullscreenVisible(true)}
                className={styles.icon}
            />
            <div className={styles.content}>
                <Link href={Route.HOME}>
                    <div className={styles.item}>
                        Home
                    </div>
                </Link>
                <MenuItemList
                    title="Genres"
                    items={genres}
                />
            </div>
        </div>
    );
}

interface MenuProps {
    genres: Genre[],
}

export default Menu;
