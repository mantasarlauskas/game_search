import Image from 'next/image';
import Slider from 'react-slick';
import { ApiPath, fetchData } from 'utils/fetch';
import styles from 'pageStyles/GamePage.module.scss';
import useBackgroundImage from 'hooks/useBackgroundImage';
import { roundNumber } from 'utils/number';
import GameDescription from 'components/GameDescription';
import GameMetaInfo from 'components/GameMetaInfo';
import { Game, NextPageContextWithID, Screenshot } from 'utils/types';
import SeriesGames, { seriesGamesPageSize } from 'components/SeriesGames';
import { Route } from 'utils/routes';
import PageHead from 'components/PageHead';
import { getMovieData } from 'utils/media';

function GamePage({
    game,
    seriesGames,
    seriesGamesNextPage,
    movieUrl,
    moviePreview,
    screenshots,
}: GamePageProps) {
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
            {released && <div className={styles.releaseDate}>{released}</div>}
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
                                <div className={styles.count}>{count}</div>
                            </div>
                        ))}
                        <div className={styles.rating}>
                            Total ratings:
                            <div className={styles.count}>{ratings_count}</div>
                        </div>
                    </div>
                </div>
                {!!movieUrl && (
                    <video
                        className={styles.video}
                        poster={moviePreview}
                        src={movieUrl}
                        controls
                        loop
                        playsInline
                        preload="none"
                        muted
                    />
                )}
            </div>
            {description && (
                <>
                    <div className={styles.about}>About</div>
                    <GameDescription slug={slug} description={description} />
                </>
            )}
            <div className={styles.metaInfo}>
                <GameMetaInfo game={game} />
            </div>
            <div className={styles.screenshots}>
                <div className={styles.section}>Screenshots</div>
                <div className={styles.carousel}>
                    <Slider speed={1000}>
                        {screenshots.map(({ image }) => (
                            <Image
                                key={image}
                                className={styles.image}
                                layout="responsive"
                                width={350}
                                height={200}
                                src={image}
                                quality={50}
                            />
                        ))}
                    </Slider>
                </div>
            </div>
            <SeriesGames
                slug={slug}
                games={seriesGames}
                nextPage={seriesGamesNextPage}
            />
        </div>
    );
}

interface GamePageProps {
    game: Game;
    movieUrl?: string;
    moviePreview?: string;
    seriesGames: Game[];
    seriesGamesNextPage?: string;
    screenshots: Screenshot[];
}

export async function getServerSideProps({
    params: { id },
}: NextPageContextWithID) {
    const [game, movies, screenshots, seriesGames] = await Promise.all([
        fetchData(`${ApiPath.GAMES}/${id}`),
        fetchData(`${ApiPath.GAMES}/${id}/movies`),
        fetchData(`${ApiPath.GAMES}/${id}/screenshots`),
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

    const movie = getMovieData(movies?.results || []);
    return {
        props: {
            game,
            movieUrl: movie.url,
            moviePreview: movie.preview,
            seriesGames: seriesGames?.results || [],
            screenshots: screenshots?.results || [],
            seriesGamesNextPage: seriesGames?.next || null,
        },
    };
}

export default GamePage;
