import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import * as artistService from '@services/artist/artist.service';

import * as styles from './artist-page.styles.scss';
import { Artist } from '@app/models/artist.model';
import { Album } from '@app/models/album.model';
import { Track } from '@app/models/track.model';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { ArtistTopTracksComponent } from './artist-top-tracks/artist-top-tracks.component';
import { ArtistAlbumsComponent } from '../artist-albums/artist-albums.component';
import { RelatedArtistsComponent } from './related-artists/related-artists.component';
import { LoadingWrapper } from '../loading-wrapper/loading-wrapper.component';

type RouteParams = { id: string };

const ArtistPage = withRouter(
    ({ match, history }: RouteComponentProps<RouteParams>) => {
        const artistId = match.params.id;

        const [artist, setArtist] = React.useState<Artist>();
        const [artistTopTracks, setArtistTopTracks] = React.useState<Track[]>();
        const [artistAlbums, setArtistAlbums] = React.useState<Album[]>();
        const [relatedArtists, setRelatedArtists] = React.useState<Artist[]>();

        React.useEffect(() => {
            artistService.getArtist(artistId).then(setArtist);
            artistService
                .getArtistTopTracks(artistId, 'US')
                .then(setArtistTopTracks);
            artistService.getArtistAlbums(artistId).then(setArtistAlbums);
            artistService.getRelatedArtists(artistId).then(setRelatedArtists);
        }, [artistId]);

        const goToOtherArtist = React.useCallback(
            artist => {
                setArtist(null);
                setArtistTopTracks(null);
                setArtistAlbums(null);
                setRelatedArtists(null);

                history.push(`/artists/${artist.id}`, artist);
                window.scrollTo({ top: 0 });
            },
            [artist]
        );

        return (
            <div className={styles['artist-page-container']}>
                <div className={styles['artist-page']}>
                    <div className={styles['details-container']}>
                        <LoadingWrapper isLoading={!artist}>
                            <ArtistDetailsComponent artist={artist} />
                        </LoadingWrapper>
                    </div>
                    <div className={styles['top-tracks-container']}>
                        <LoadingWrapper isLoading={!artistTopTracks}>
                            <ArtistTopTracksComponent
                                artistTopTracks={artistTopTracks}
                            />
                        </LoadingWrapper>
                    </div>
                    <div className={styles['albums-container']}>
                        <LoadingWrapper isLoading={!artistAlbums}>
                            <ArtistAlbumsComponent
                                artistAlbums={artistAlbums}
                            />
                        </LoadingWrapper>
                    </div>
                    <div className={styles['related-artists-container']}>
                        <LoadingWrapper isLoading={!relatedArtists}>
                            <RelatedArtistsComponent
                                onClickAction={goToOtherArtist}
                                relatedArtists={relatedArtists}
                            />
                        </LoadingWrapper>
                    </div>
                </div>
            </div>
        );
    }
);

export default ArtistPage;
