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
import { LoadingSpinner } from '../loading-spinner/loading-spinner';


const ArtistPage = withRouter(({ match, history }: RouteComponentProps) => {
  const artistId = (match.params as any).id;

  const [artist, setArtist] = React.useState<Artist>();
  const [artistTopTracks, setArtistTopTracks] = React.useState<Track[]>();
  const [artistAlbums, setArtistAlbums] = React.useState<Album[]>();
  const [relatedArtists, setRelatedArtists] = React.useState<Artist[]>();

  React.useEffect(() => {
    artistService.getArtist(artistId).then(setArtist);
    artistService.getArtistTopTracks(artistId, 'US').then(setArtistTopTracks);
    artistService.getArtistAlbums(artistId).then(setArtistAlbums);
    artistService.getRelatedArtists(artistId).then(setRelatedArtists);
  }, [artistId]);

  const loading = <LoadingSpinner/>

  const goToTrackDetails = React.useCallback((track) => {
    history.push(`/tracks/${track.id}`, track);
  }, []);

  const goToOtherArtist = React.useCallback((artist) => {
    setArtist(null);
    setArtistTopTracks(null);
    setArtistAlbums(null);
    setRelatedArtists(null);

    history.push(`/artists/${artist.id}`, artist);
    window.scrollTo({ top: 0 });
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
});

export default ArtistPage;