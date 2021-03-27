import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import MenuItemList from 'components/MenuItemList';
import styles from 'components/Menu.module.scss';
import { Route } from 'utils/routes';
import Link from 'next/link';
import MenuIcon from 'assets/menu.svg';
import { useRouter } from 'next/router';
import { PageTitle } from 'utils/page';
import { useAppContext } from 'pages/_app';

const menuItems = [
    { route: Route.HOME, title: PageTitle.HOME },
    { route: Route.DEVELOPERS, title: PageTitle.DEVELOPERS },
    { route: Route.PUBLISHERS, title: PageTitle.PUBLISHERS },
    { route: Route.STORES, title: PageTitle.STORES },
    { route: Route.TAGS, title: PageTitle.TAGS },
];

function Menu() {
    const [fullscreenVisible, setFullscreenVisible] = useState(false);
    const { genres, platforms, stores } = useAppContext();
    const { asPath } = useRouter();

    useEffect(() => {
        setFullscreenVisible(false);
    }, [asPath]);

    useEffect(() => {
        document.body.style.overflow = fullscreenVisible ? 'hidden' : 'unset';
    }, [fullscreenVisible]);

    const menu = (
        <>
            {menuItems.map(({ route, title }) => (
                <Link key={title} href={route}>
                    <div className={styles.item}>
                        {title}
                    </div>
                </Link>
            ))}
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
            <div className={styles.list}>
                <MenuItemList
                    title={PageTitle.STORES}
                    items={stores}
                    route={Route.STORES}
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

export default Menu;
