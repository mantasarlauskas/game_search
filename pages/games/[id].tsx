import React from 'react';
import { API_PATH, fetchData } from 'utils/fetch';
import styles from 'styles/game.module.scss';
import useBackgroundImage from 'hooks/useBackgroundImage';
import { roundNumber } from 'utils/number';
import Description from 'components/Description';
import GameMetaInfo from 'components/GameMetaInfo';
import InfoList from 'components/InfoList';
import { Game, NextPageContextWithID } from 'utils/types';
import SuggestedGames, { suggestGamesPageSize } from 'components/SuggestedGames';

function Games({ game, suggestedGames, suggestedGameCount }: GameProps) {
    const {
        background_image,
        released,
        name,
        platforms,
        rating,
        ratings,
        description,
        ratings_count,
        clip,
        slug,
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
                    <InfoList list={platforms.map(({ platform }) => platform)} />
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
                {clip?.clip && (
                    <video
                        className={styles.video}
                        src={clip.clip}
                        controls
                        loop
                        playsInline
                        autoPlay
                        muted
                    />
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
                <GameMetaInfo game={game} />
            </div>
            <SuggestedGames
                name={name}
                slug={slug}
                initialGames={suggestedGames}
                count={suggestedGameCount}
            />
        </div>
    );
}

interface GameProps {
    game: Game;
    suggestedGames: Game[];
    suggestedGameCount: number;
}

export async function getServerSideProps({ params: { id } }: NextPageContextWithID) {
    const [game, suggestedGames] = await Promise.all([
        fetchData(`${API_PATH.GAMES}/${id}`),
        fetchData(`${API_PATH.GAMES}/${id}/suggested`, `page=1&page_size=${suggestGamesPageSize}`),
    ]);

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
            game,
            suggestedGames: suggestedGames.results,
            suggestedGameCount: suggestedGames.count,
        },
    };
}

export default Games;
