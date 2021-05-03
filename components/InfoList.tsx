import Link from 'next/link';
import { Info } from 'utils/types';
import styles from 'components/InfoList.module.scss';
import { Route } from 'utils/routes';

function InfoList({ list, route }: InfoListProps) {
    return (
        <>
            {list.map(({ name, id }, idx) => {
                const content = idx < list.length - 1 ? `${name}, ` : name;
                return (
                    <Link key={id} href={`${route}/${id}`}>
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
    route: Route;
}

export default InfoList;
