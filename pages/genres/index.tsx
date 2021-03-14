import React from 'react';
import { useAppContext } from 'pages/_app';
import GenreCard from 'components/GenreCard';
import styles from 'styles/genres.module.scss';

function Genres() {
    const { genres } = useAppContext();
    return (
        <div className={styles.root}>
            {genres.map((genre) => (
                <GenreCard
                    key={genre.slug}
                    genre={genre}
                />
            ))}
        </div>
    );
}

export default Genres;
