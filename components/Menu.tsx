import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import MenuItemList from 'components/MenuItemList';
import styles from 'components/Menu.module.scss';
import { Route } from 'utils/routes';
import Link from 'next/link';
import MenuIcon from 'assets/menu.svg';
import { useRouter } from 'next/router';
import { PageTitle } from 'utils/page';
import { useAppContext } from 'pages/_app';

const menuRoutes = [
    Route.HOME,
    Route.DEVELOPERS,
    Route.PUBLISHERS,
    Route.STORES,
    Route.TAGS,
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
            {menuRoutes.map((route) => (
                <Link key={route} href={route}>
                    <div className={styles.item}>{PageTitle[route]}</div>
                </Link>
            ))}
            <div className={styles.list}>
                <MenuItemList items={genres} route={Route.GENRES} />
            </div>
            <div className={styles.list}>
                <MenuItemList
                    items={platforms}
                    expandedCount={8}
                    route={Route.PLATFORMS}
                />
            </div>
            <div className={styles.list}>
                <MenuItemList items={stores} route={Route.STORES} />
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
            document.body
        );
    }

    return (
        <div className={styles.root}>
            <MenuIcon
                onClick={() => setFullscreenVisible(true)}
                className={styles.icon}
            />
            <div className={styles.content}>{menu}</div>
        </div>
    );
}

export default Menu;
