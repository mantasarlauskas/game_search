import React from 'react';
import MetaBlock from 'components/MetaBlock';
import styles from 'styles/meta-info.module.scss';
import InfoList from 'components/InfoList';
import { Game } from 'utils/types';

function MetaInfo({
    game: {
        platforms,
        metacritic,
        genres,
        released,
        developers,
        publishers,
        esrb_rating,
        tags,
    },
}: MetaInfoProps) {
    return (
        <div className={styles.root}>
            <div className={styles.item}>
                <MetaBlock
                    title="Platforms"
                    content={<InfoList list={platforms} />}
                />
            </div>
            {typeof metacritic === 'number' && (
                <div className={styles.item}>
                    <MetaBlock
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
                    <MetaBlock
                        title="Genres"
                        content={<InfoList list={genres} />}
                    />
                </div>
            )}
            {released && (
                <div className={styles.item}>
                    <MetaBlock
                        title="Release date"
                        content={released}
                    />
                </div>
            )}
            {developers?.length > 0 && (
                <div className={styles.item}>
                    <MetaBlock
                        title="Developers"
                        content={<InfoList list={developers} />}
                    />
                </div>
            )}
            {publishers?.length > 0 && (
                <div className={styles.item}>
                    <MetaBlock
                        title="Publishers"
                        content={<InfoList list={publishers} />}
                    />
                </div>
            )}
            {tags?.length > 0 && (
                <div className={styles.item}>
                    <MetaBlock
                        title="Tags"
                        content={<InfoList list={tags} />}
                    />
                </div>
            )}
            <div className={styles.item}>
                <MetaBlock
                    title="Age rating"
                    content={esrb_rating?.name || 'Not rated'}
                />
            </div>
        </div>
    );
}

interface MetaInfoProps {
    game: Game;
}

export default MetaInfo;
