import { ApiPath, fetchData } from 'utils/fetch';
import styles from 'pageStyles/GamePage.module.scss';
import useBackgroundImage from 'hooks/useBackgroundImage';
import { roundNumber } from 'utils/number';
import GameDescription from 'components/GameDescription';
import GameMetaInfo from 'components/GameMetaInfo';
import { Game, NextPageContextWithID } from 'utils/types';
import SeriesGames, { seriesGamesPageSize } from 'components/SeriesGames';
import { Route } from 'utils/routes';
import PageHead from 'components/PageHead';
import { getMovieUrl } from 'utils/media';

function GamePage({ game, suggestedGames, suggestedGamesNextPage, movie }: GamePageProps) {
    const {
        background_image,
        released,
        name,
        rating,
        ratings,
        description,
        ratings_count,
        slug,
    } = game;
    useBackgroundImage(background_image);
    return (
        <div className={styles.root}>
            <PageHead title={name} />
            {released && (
                <div className={styles.releaseDate}>
                    {released}
                </div>
            )}
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
                {!!movie && (
                    <video
                        className={styles.video}
                        src={movie}
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
                    <GameDescription slug={slug} description={description} />
                </>
            )}
            <div className={styles.metaInfo}>
                <GameMetaInfo game={game} />
            </div>
            <SeriesGames
                slug={slug}
                games={suggestedGames}
                nextPage={suggestedGamesNextPage}
            />
        </div>
    );
}

interface GamePageProps {
    game: Game;
    movie?: string,
    suggestedGames: Game[];
    suggestedGamesNextPage?: string;
}

export async function getServerSideProps({ params: { id } }: NextPageContextWithID) {
    const [game, movies, suggestedGames] = await Promise.all([
        fetchData(`${ApiPath.GAMES}/${id}`),
        fetchData(`${ApiPath.GAMES}/${id}/movies`),
        fetchData(`${ApiPath.GAMES}/${id}/game-series`, {
            page: 1,
            page_size: seriesGamesPageSize,
        }),
    ]);

    if (!game) {
        return {
            redirect: {
                destination: Route.NOT_FOUND,
                permanent: false,
            },
        };
    }

    return {
        props: {
            game,
            movie: getMovieUrl(movies?.results || []),
            suggestedGames: suggestedGames?.results || [],
            suggestedGamesNextPage: suggestedGames?.next || null,
        },
    };
}

export default GamePage;
