import * as React from 'react';
import { Link } from 'react-router-dom';

import * as styles from './album-info.styles.scss';

import { Album } from '@app/models/album.model';

export const AlbumInfo = ({ album }: { album: Album }) => (
    <div className={styles['album-info']}>
        <div className={styles['album-cover-container']}>
            <img src={album.images[0]?.url}></img>
        </div>
        <div className={styles['album-details']}>
            <h1>{album.name}</h1>
            <div className={styles['album-']}>
                {album.artists.map(artist => (
                    <div key={artist.id} className={styles['artist']}>
                        <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
                    </div>
                ))}
            </div>
            <div>{album.label}</div>
            <div>
                {album.genres.map(genre => (
                    <div key={genre}>{genre}</div>
                ))}
            </div>
            <div>Released {album.releaseDate}</div>
            <div className={styles['track-list-container']}>
                <h2>Album tracks</h2>
                <div className={styles['track-list']}>
                    {album.tracks.map(track => (
                        <div key={track.id}>
                            <Link to={`/tracks/${track.id}`}>{track.name}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
