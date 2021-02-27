import React from 'react';
import { API_PATH, fetchData } from 'utils/fetch';
import styles from 'styles/game.module.scss';
import useBackgroundImage from 'hooks/useBackgroundImage';
import { roundNumber } from 'utils/number';
import Description from 'components/Description';
import MetaInfo from 'components/MetaInfo';
import InfoList from 'components/InfoList';
import { Game, Info, NextPageContextWithID } from 'utils/types';

function Games({
    game,
}: { game: Game }) {
    const {
        background_image,
        released,
        name,
        platforms,
        rating,
        ratings,
        description,
        background_image_additional,
        ratings_count,
    } = game;
    useBackgroundImage(background_image);
    return (
        <div className={styles.root}>
            <div className={styles.meta}>
                {released && (
                    <div className={styles.releaseDate}>
                        {released}
                    </div>
                )}
                <div className={styles.platforms}>
                    {'Platforms: '}
                    <InfoList list={platforms} />
                </div>
            </div>
            <h1 className={styles.title}>{name}</h1>
            <div className={styles.main}>
                <div className={styles.info}>
                    <div className={styles.totalRating}>
                        {roundNumber(rating)}
                    </div>
                    <div className={styles.ratings}>
                        {ratings.map(({ title, count }) => (
                            <div key={title} className={styles.rating}>
                                {`${title}:`}
                                <div className={styles.count}>
                                    {count}
                                </div>
                            </div>
                        ))}
                        <div className={styles.rating}>
                            Total ratings:
                            <div className={styles.count}>
                                {ratings_count}
                            </div>
                        </div>
                    </div>
                </div>
                {background_image_additional && (
                    <div className={styles.image}>
                        <img
                            src={background_image_additional}
                            alt={name}
                        />
                    </div>
                )}
            </div>
            {description && (
                <>
                    <div className={styles.about}>
                        About
                    </div>
                    <div className={styles.description}>
                        <Description description={description} />
                    </div>
                </>
            )}
            <div className={styles.metaInfo}>
                <MetaInfo game={game} />
            </div>
        </div>
    );
}

export async function getServerSideProps({ params: { id } }: NextPageContextWithID) {
    const game = await fetchData(`${API_PATH.GAMES}/${id}`);
    if (!game) {
        return {
            redirect: {
                destination: '/not-found',
                permanent: false,
            },
        };
    }

    return {
        props: {
            game: {
                ...game,
                platforms: game.platforms.map(({ platform }: { platform: Info }) => platform),
            },
        },
    };
}

export default Games;
