import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import * as artistService from '@services/artist/artist.service';

import * as styles from './artist-page.styles.scss';
import { Artist } from '@app/models/artist.model';
import { Album } from '@app/models/album.model';
import { Track } from '@app/models/track.model';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { ArtistTopTracksComponent } from './artist-top-tracks/artist-top-tracks.component';
import { ArtistAlbumsComponent } from './artist-albums/artist-albums.component';
import { RelatedArtistsComponent } from './related-artists/related-artists.component';


export const ArtistPage = withRouter(({ match, history }: RouteComponentProps) => {
  const artistId = (match.params as any).id;

  const [artist, setArtist]: [Artist, any] = React.useState();
  const [artistTopTracks, setArtistTopTracks]: [Track[], any] = React.useState();
  const [artistAlbums, setArtistAlbums]: [Album[], any] = React.useState();
  const [relatedArtists, setRelatedArtists]: [Artist[], any] = React.useState();

  React.useEffect(() => {
    artistService.getArtist(artistId).then(setArtist);
    artistService.getArtistTopTracks(artistId, 'US').then(setArtistTopTracks);
    artistService.getArtistAlbums(artistId).then(setArtistAlbums);
    artistService.getRelatedArtists(artistId).then(setRelatedArtists);
  }, [artistId]);

  const loading = <div>Loading</div>;

  const goToTrackDetails = React.useCallback((track) => {
    history.push(`/tracks/${track.id}`, track);
  }, []);

  const goToOtherArtist = React.useCallback((artist) => {
    history.push(`/artists/${artist.id}`, artist);
  }, [artist])

  return (
    <div className={styles['artist-page-container']}>
      <div className={styles['artist-page']}>
        <div className={styles['details-container']}>
          { artist ? <ArtistDetailsComponent artist={artist}></ArtistDetailsComponent> : loading }
        </div>
        <div className={styles['top-tracks-container']}>
          { artistTopTracks
            ? <ArtistTopTracksComponent artistTopTracks={artistTopTracks} onClickAction={goToTrackDetails}/>
            : loading
          }
        </div>
        <div className={styles['albums-container']}>
          { artistAlbums ? <ArtistAlbumsComponent artistAlbums={artistAlbums}></ArtistAlbumsComponent> : loading }
        </div>
        <div className={styles['related-artists-container']}>
          { relatedArtists ? <RelatedArtistsComponent onClickAction={goToOtherArtist} relatedArtists={relatedArtists}/> : loading }
        </div>
      </div>
    </div>
  );
})