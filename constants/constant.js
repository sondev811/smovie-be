const define = (name, value) => {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
};

define('MOVIE', {
    POPULAR: 'movie/popular',
    TOP_RATED: 'movie/top_rated',
    UPCOMING: 'movie/upcoming',
    VIDEOS: (id) => `movie/${id}/videos`,
    DISCOVER: 'discover/movie',
    GENRES: 'genre/movie/list',
    SEARCH: 'search/movie',
    DETAILS: (id) => `movie/${id}`,
    CREDITS: (id) => `movie/${id}/credits`,
    SIMILAR: (id) => `movie/${id}/similar`
});
define('TV', {
    POPULAR: 'tv/popular',
    TOP_RATED: 'tv/top_rated',
    ON_THE_AIR: 'tv/on_the_air',
    AIRING_TODAY: 'tv/airing_today',
    VIDEOS: (id) => `tv/${id}/videos`,
    DISCOVER: 'discover/tv',
    GENRES: 'genre/tv/list',
    SEARCH: 'search/tv',
    DETAILS: (id) => `tv/${id}`,
    CREDITS: (id) => `tv/${id}/credits`,
    SIMILAR: (id) => `tv/${id}/similar`
});

