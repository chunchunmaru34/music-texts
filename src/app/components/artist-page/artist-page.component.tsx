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
import { RelatedAArtistsComponent } from './related-artists/related-artists.component';


export const ArtistPage = withRouter(({ match }: RouteComponentProps) => {
  const artistId = (match.params as any).id;

  const [artist, setArtist]: [Artist, any] = React.useState();
  const [artistTopTracks, setArtistTopTracks]: [Track[], any] = React.useState();
  const [artistAlbums, setArtistAlbums]: [Album[], any] = React.useState();
  const [relatedArtists, setRelatedArtists]: [Artist[], any] = React.useState();

  React.useEffect(() => {
    artistService.getArtist(artistId).then(setArtist);
    artistService.getArtistTopTracks(artistId).then(setArtistTopTracks);
    artistService.getArtistAlbums(artistId).then(setArtistAlbums);
    artistService.getRelatedArtists(artistId).then(setRelatedArtists);
  }, []);

  const loading = <div>Loading</div>;

  return (
    <div className={styles['artist-page-container']}>
      { artist ? <ArtistDetailsComponent artist={artist}></ArtistDetailsComponent> : loading }
      { artistTopTracks ? <ArtistTopTracksComponent artistTopTracks={artistTopTracks}></ArtistTopTracksComponent> : loading }
      { artistAlbums ? <ArtistAlbumsComponent artistAlbums={artistAlbums}></ArtistAlbumsComponent> : loading }
      { relatedArtists ? <RelatedAArtistsComponent relatedArtists={relatedArtists}></RelatedAArtistsComponent> : loading }
    </div>
  );
})