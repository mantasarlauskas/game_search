import Link from 'next/link';
import GameMetaBlock from 'components/GameMetaBlock';
import styles from 'components/GameMetaInfo.module.scss';
import InfoList from 'components/InfoList';
import { Game } from 'utils/types';
import { Route } from 'utils/routes';

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
                    <GameMetaBlock title="Platforms">
                        <InfoList
                            route={Route.PLATFORMS}
                            list={platforms.map(({ platform }) => platform)}
                        />
                    </GameMetaBlock>
                </div>
            )}
            {typeof metacritic === 'number' && (
                <div className={styles.item}>
                    <GameMetaBlock title="Metascore">
                        <div className={styles.score}>
                            {metacritic}
                        </div>
                    </GameMetaBlock>
                </div>
            )}
            {genres?.length > 0 && (
                <div className={styles.item}>
                    <GameMetaBlock title="Genres">
                        <InfoList
                            route={Route.GENRES}
                            list={genres}
                        />
                    </GameMetaBlock>
                </div>
            )}
            {released && (
                <div className={styles.item}>
                    <GameMetaBlock title="Release date">
                        {released}
                    </GameMetaBlock>
                </div>
            )}
            {developers?.length > 0 && (
                <div className={styles.item}>
                    <GameMetaBlock title="Developers">
                        <InfoList
                            list={developers}
                            route={Route.DEVELOPERS}
                        />
                    </GameMetaBlock>
                </div>
            )}
            {publishers?.length > 0 && (
                <div className={styles.item}>
                    <GameMetaBlock title="Publishers">
                        <InfoList
                            list={publishers}
                            route={Route.PUBLISHERS}
                        />
                    </GameMetaBlock>
                </div>
            )}
            {tags?.length > 0 && (
                <div className={styles.item}>
                    <GameMetaBlock title="Tags">
                        <InfoList
                            route={Route.TAGS}
                            list={tags}
                        />
                    </GameMetaBlock>
                </div>
            )}
            <div className={styles.item}>
                <GameMetaBlock title="Age rating">
                    {esrb_rating?.name || 'Not rated'}
                </GameMetaBlock>
            </div>
            {website && (
                <div className={styles.item}>
                    <GameMetaBlock title="Website">
                        <Link href={website} passHref>
                            {website}
                        </Link>
                    </GameMetaBlock>
                </div>
            )}
        </div>
    );
}

interface GameMetaInfoProps {
    game: Game;
}

export default GameMetaInfo;
