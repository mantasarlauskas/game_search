import React, { useEffect, useRef, useState, MouseEvent } from 'react';
import debounce from 'debounce';
import Link from 'next/link';
import styles from 'styles/game-card.module.scss';
import { Game } from 'utils/types';
import InfoList from 'components/InfoList';
import { Route } from 'utils/routes';
import DivButton from 'components/DivButton';

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

    useEffect(() => {
        const handleResize = debounce(() => {
            const height = imageRef.current?.height;
            setMediaHeight(height ? `${height}px` : 'auto');
        }, 10);

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function startVideo() {
        setShowVideo(true);
        const height = imageRef.current?.height;
        setMediaHeight(height ? `${height}px` : 'auto');
    }

    function onMouseLeave() {
        setShowVideo(false);
    }

    function onMediaClick(e: MouseEvent) {
        if (clip?.clip) {
            e.stopPropagation();

            if (!showVideo) {
                startVideo();
            }
        }
    }

    return (
        <Link href={`${Route.GAMES}/${slug}`}>
            <div
                onMouseEnter={startVideo}
                onMouseLeave={onMouseLeave}
                className={styles.root}
            >
                <DivButton
                    className={styles.media}
                    style={{ height: mediaHeight }}
                    onClick={onMediaClick}
                >
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
                </DivButton>
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
