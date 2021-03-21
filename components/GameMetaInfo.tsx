import Link from 'next/link';
import GameMetaBlock from 'components/GameMetaBlock';
import styles from 'styles/game-meta-info.module.scss';
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
                            list={platforms.map(({ platform }) => ({
                                ...platform,
                                url: `${Route.PLATFORMS}/${platform.id}`,
                            }))}
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
                            list={genres.map((genre) => ({
                                ...genre,
                                url: `${Route.GENRES}/${genre.id}`,
                            }))}
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
                        <InfoList list={developers} />
                    </GameMetaBlock>
                </div>
            )}
            {publishers?.length > 0 && (
                <div className={styles.item}>
                    <GameMetaBlock title="Publishers">
                        <InfoList list={publishers} />
                    </GameMetaBlock>
                </div>
            )}
            {tags?.length > 0 && (
                <div className={styles.item}>
                    <GameMetaBlock title="Tags">
                        <InfoList
                            list={tags.map((tag) => ({
                                ...tag,
                                url: `${Route.TAGS}/${tag.id}`,
                            }))}
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
