import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Category } from 'utils/types';
import MenuItemList from 'components/MenuItemList';
import styles from 'styles/menu.module.scss';
import { Route } from 'utils/routes';
import Link from 'next/link';
import MenuIcon from 'assets/menu.svg';
import { useRouter } from 'next/router';
import { PageTitle } from 'utils/page';

function Menu({ genres, platforms }: MenuProps) {
    const [fullscreenVisible, setFullscreenVisible] = useState(false);
    const { asPath } = useRouter();

    useEffect(() => {
        setFullscreenVisible(false);
    }, [asPath]);

    useEffect(() => {
        document.body.style.overflow = fullscreenVisible ? 'hidden' : 'unset';
    }, [fullscreenVisible]);

    const menu = (
        <>
            <Link href={Route.HOME}>
                <div className={styles.item}>
                    {PageTitle.HOME}
                </div>
            </Link>
            <Link href={Route.DEVELOPERS}>
                <div className={styles.item}>
                    {PageTitle.DEVELOPERS}
                </div>
            </Link>
            <Link href={Route.PUBLISHERS}>
                <div className={styles.item}>
                    {PageTitle.PUBLISHERS}
                </div>
            </Link>
            <Link href={Route.STORES}>
                <div className={styles.item}>
                    {PageTitle.STORES}
                </div>
            </Link>
            <div className={styles.list}>
                <MenuItemList
                    title={PageTitle.GENRES}
                    items={genres}
                    route={Route.GENRES}
                />
            </div>
            <div className={styles.list}>
                <MenuItemList
                    title={PageTitle.PLATFORMS}
                    items={platforms}
                    expandedCount={8}
                    route={Route.PLATFORMS}
                />
            </div>
        </>
    );

    if (fullscreenVisible) {
        return createPortal(
            <div className={styles.portal}>
                <MenuIcon
                    onClick={() => setFullscreenVisible(false)}
                    className={styles.icon}
                />
                {menu}
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
                {menu}
            </div>
        </div>
    );
}

interface MenuProps {
    genres: Category[],
    platforms: Category[],
}

export default Menu;
