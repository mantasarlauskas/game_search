import React from 'react';
import Link from 'next/link';
import GameMetaBlock from 'components/GameMetaBlock';
import styles from 'styles/game-meta-info.module.scss';
import InfoList from 'components/InfoList';
import { Game } from 'utils/types';

function GameMetaInfo({
    game: {
        platforms,
        metacritic,
        genres,
        released,
        developers,
        publishers,
        esrb_rating,
        tags,
        website,
    },
}: GameMetaInfoProps) {
    return (
        <div className={styles.root}>
            {!!platforms?.length && (
                <div className={styles.item}>
                    <GameMetaBlock
                        title="Platforms"
                        content={<InfoList list={platforms.map(({ platform }) => platform)} />}
                    />
                </div>
            )}
            {typeof metacritic === 'number' && (
                <div className={styles.item}>
                    <GameMetaBlock
                        title="Metascore"
                        content={(
                            <div className={styles.score}>
                                {metacritic}
                            </div>
                        )}
                    />
                </div>
            )}
            {genres?.length > 0 && (
                <div className={styles.item}>
                    <GameMetaBlock
                        title="Genres"
                        content={<InfoList list={genres} />}
                    />
                </div>
            )}
            {released && (
                <div className={styles.item}>
                    <GameMetaBlock
                        title="Release date"
                        content={released}
                    />
                </div>
            )}
            {developers?.length > 0 && (
                <div className={styles.item}>
                    <GameMetaBlock
                        title="Developers"
                        content={<InfoList list={developers} />}
                    />
                </div>
            )}
            {publishers?.length > 0 && (
                <div className={styles.item}>
                    <GameMetaBlock
                        title="Publishers"
                        content={<InfoList list={publishers} />}
                    />
                </div>
            )}
            {tags?.length > 0 && (
                <div className={styles.item}>
                    <GameMetaBlock
                        title="Tags"
                        content={<InfoList list={tags} />}
                    />
                </div>
            )}
            <div className={styles.item}>
                <GameMetaBlock
                    title="Age rating"
                    content={esrb_rating?.name || 'Not rated'}
                />
            </div>
            {website && (
                <div className={styles.item}>
                    <GameMetaBlock
                        title="Website"
                        content={(
                            <Link href={website} passHref>
                                {website}
                            </Link>
                        )}
                    />
                </div>
            )}
        </div>
    );
}

interface GameMetaInfoProps {
    game: Game;
}

export default GameMetaInfo;
