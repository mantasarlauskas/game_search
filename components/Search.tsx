import { ChangeEvent, useEffect, useRef, useState } from 'react';
import debounce from 'debounce';
import Link from 'next/link';
import styles from 'styles/search.module.scss';
import { API_PATH, fetchData } from 'utils/fetch';
import { roundNumber } from 'utils/number';
import Spinner from 'components/Spinner';
import SearchIcon from 'assets/search.svg';
import { SearchResult } from 'utils/types';

function Search() {
    const ref = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<SearchResult[]>([]);

    useEffect(() => {
        function handleClick({ target }: MouseEvent) {
            if (!ref.current?.contains(target as HTMLElement)) {
                setIsOpen(false);
            }
        }

        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);

    const handleChange = debounce(async ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        const data = await fetchData(API_PATH.GAMES, `search=${value}&page=1&page_size=5`);
        setResults(data.results);
        setLoading(false);
    }, 200);

    return (
        <div className={styles.root}>
            <div className={styles.inputWrapper}>
                <input
                    ref={ref}
                    className={styles.input}
                    onChange={handleChange}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Search games"
                />
                <SearchIcon className={styles.icon} />
            </div>
            {(loading || results.length > 0) && isOpen && (
                <div className={styles.results}>
                    {loading ? <Spinner /> : results.map(({
                        name,
                        slug,
                        background_image,
                        rating,
                    }) => (
                        <Link key={slug} href={`/games/${slug}`}>
                            <div className={styles.result}>
                                <div
                                    className={styles.image}
                                    style={{ backgroundImage: `url(${background_image})` }}
                                />
                                <div>
                                    <div className={styles.name}>{name}</div>
                                    <div className={styles.rating}>{roundNumber(rating)}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Search;
