import { ChangeEvent, useEffect, useRef, useState, KeyboardEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from 'components/SearchBar.module.scss';
import { ApiPath, fetchData } from 'utils/fetch';
import { roundNumber } from 'utils/number';
import Spinner from 'components/Spinner';
import SearchIcon from 'assets/search.svg';
import { Game } from 'utils/types';
import { Route } from 'utils/routes';
import { getCroppedImageUrl } from 'utils/media';
import { useQuery } from 'react-query';
import useDebouncedValue from 'hooks/useDebouncedValue';

function SearchBar() {
    const router = useRouter();
    const [value, setValue] = useState('');
    const debouncedValue = useDebouncedValue(value, 300);
    const ref = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const { data, isLoading } = useQuery<{ results: Game[] }>(
        ['search', debouncedValue],
        () => fetchData(ApiPath.GAMES, {
            search: value,
            page: 1,
            page_size: 5,
        }),
    );

    useEffect(() => {
        function handleClick({ target }: MouseEvent) {
            if (!ref.current?.contains(target as HTMLElement)) {
                setIsOpen(false);
                ref.current?.blur();
            }
        }

        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);

    function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
        setValue(target.value);
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            const target = e.target as HTMLInputElement;
            router.push(`/search/${target.value}`);
            setIsOpen(false);
            ref.current?.blur();
        }
    }

    const results = data?.results || [];
    return (
        <div className={styles.root}>
            <div className={styles.inputWrapper}>
                <input
                    ref={ref}
                    value={value}
                    className={styles.input}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Search games"
                />
                <SearchIcon className={styles.icon} />
                <div className={styles.enter}>
                    &#9166;
                </div>
            </div>
            {(isLoading || results.length > 0) && isOpen && (
                <div className={styles.results}>
                    {isLoading ? <Spinner /> : results.map(({
                        name,
                        slug,
                        background_image,
                        rating,
                    }) => (
                        <Link key={slug} href={`${Route.GAMES}/${slug}`}>
                            <div className={styles.result}>
                                <div
                                    className={styles.image}
                                    style={{ backgroundImage: `url(${getCroppedImageUrl(background_image)})` }}
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

export default SearchBar;
