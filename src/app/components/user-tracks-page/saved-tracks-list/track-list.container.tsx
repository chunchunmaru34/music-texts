import * as React from 'react';

import { SavedTrack } from '@app/models/saved-track.model';
import * as libraryService from '@services/library/library.service';
import { Track } from '@app/models/track.model';
import { SavedTracksListComponent } from './track-list.component';

type SavedTracksListContainerProps = {
    selectedTrack: Track;
    onTrackSelected(track: Track): void;
};

export const SavedTracksListContainer = ({
    selectedTrack,
    onTrackSelected
}: SavedTracksListContainerProps) => {
    const [savedTracksPage, setTracksPage] = React.useState<
        PagingObject<SavedTrack>
    >();
    const [
        isAdditionalTracksLoading,
        setIsAdditionalTracksLoading
    ] = React.useState<boolean>();

    const savedTracksPageRef = React.useRef(savedTracksPage);
    savedTracksPageRef.current = savedTracksPage;

    React.useEffect(() => {
        libraryService.getUserTracks().then(setTracksPage);
    }, []);

    const fetchNext = React.useCallback(() => {
        if (
            savedTracksPageRef.current &&
            savedTracksPageRef.current.items.length !==
                savedTracksPageRef.current.total
        ) {
            setIsAdditionalTracksLoading(true);
            libraryService
                .getUserTracks({ nextPage: savedTracksPageRef.current.next })
                .then(tracksPage => {
                    const newTracks = [
                        ...savedTracksPageRef.current.items,
                        ...tracksPage.items
                    ];
                    tracksPage.items = newTracks;
                    setTracksPage(tracksPage);
                    setIsAdditionalTracksLoading(false);
                });
        }
    }, [savedTracksPage, savedTracksPageRef]);

    return (
        <SavedTracksListComponent
            savedTracks={savedTracksPage?.items}
            selectedTrack={selectedTrack}
            isAdditionalTracksLoading={isAdditionalTracksLoading}
            onSelectTrack={onTrackSelected}
            onBoundaryReached={fetchNext}
            totalTracks={savedTracksPage ? savedTracksPage.total : 0}
        />
    );
};
