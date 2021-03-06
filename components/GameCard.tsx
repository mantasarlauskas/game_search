import React, { useRef, useState } from 'react';
import Link from 'next/link';
import styles from 'styles/game-card.module.scss';
import { Game } from 'utils/types';
import InfoList from 'components/InfoList';

function GameCard({
    game: {
        slug,
        name,
        background_image,
        metacritic,
        clip,
        platforms,
    },
}: GameCardProps) {
    const [showVideo, setShowVideo] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);
    const [mediaHeight, setMediaHeight] = useState('auto');

    function onMouseEnter() {
        setShowVideo(true);
        const height = imageRef.current?.height;
        setMediaHeight(height ? `${height}px` : 'auto');
    }

    function onMouseLeave() {
        setShowVideo(false);
    }

    return (
        <Link href={`/games/${slug}`}>
            <div
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className={styles.root}
            >
                <div style={{ height: mediaHeight }}>
                    {showVideo && clip?.clip ? (
                        <video
                            className={styles.video}
                            src={clip.clip}
                            controls
                            loop
                            playsInline
                            autoPlay
                            muted
                        />
                    ) : background_image && (
                        <img
                            ref={imageRef}
                            className={styles.image}
                            src={background_image}
                            alt={name}
                        />
                    )}
                </div>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            {name}
                        </div>
                        {metacritic && (
                            <div className={styles.score}>
                                {metacritic}
                            </div>
                        )}
                    </div>
                    {!!platforms?.length && (
                        <div className={styles.platforms}>
                            {'Platforms: '}
                            <InfoList list={platforms.map(({ platform }) => platform)} />
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}

interface GameCardProps {
    game: Game;
}

export default GameCard;
