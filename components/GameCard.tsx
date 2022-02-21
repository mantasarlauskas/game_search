import { useEffect, useRef, useState, MouseEvent } from 'react';
import debounce from 'debounce';
import Link from 'next/link';
import Image from 'next/image';
import styles from 'components/GameCard.module.scss';
import { Game } from 'utils/types';
import InfoList from 'components/InfoList';
import { Route } from 'utils/routes';
import DivButton from 'components/DivButton';
import { getCroppedImageUrl } from 'utils/media';
import { roundNumber } from 'utils/number';

function GameCard({
    game: { slug, name, background_image, clip, platforms, rating },
}: GameCardProps) {
    const imageUrl = getCroppedImageUrl(background_image);
    const [showVideo, setShowVideo] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);
    const [mediaHeight, setMediaHeight] = useState('auto');

    useEffect(() => {
        const handleResize = debounce(() => {
            const height = imageRef.current?.getBoundingClientRect()?.height;
            setMediaHeight(height ? `${height}px` : 'auto');
        }, 10);

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function startVideo() {
        setShowVideo(true);
        const height = imageRef.current?.getBoundingClientRect()?.height;
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
                    ) : (
                        imageUrl && (
                            <div ref={imageRef}>
                                <Image
                                    className={styles.image}
                                    height={400}
                                    width={600}
                                    layout="responsive"
                                    src={imageUrl}
                                    alt={name}
                                    quality={50}
                                />
                            </div>
                        )
                    )}
                </DivButton>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <div className={styles.title}>{name}</div>
                        {!!rating && (
                            <div className={styles.score}>
                                {roundNumber(rating)}
                            </div>
                        )}
                    </div>
                    {!!platforms?.length && (
                        <div className={styles.platforms}>
                            {'Platforms: '}
                            <InfoList
                                route={Route.PLATFORMS}
                                list={platforms.map(({ platform }) => platform)}
                            />
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
