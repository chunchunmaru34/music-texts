import * as React from 'react';

import * as styles from './search-bar.styles.scss';

interface SearchBarProps {
    onSearchInputChange: (value: string) => void;
}

export const SearchBarComponent = ({ onSearchInputChange }: SearchBarProps) => {
    return (
        <div className={styles['search-bar']}>
            <input
                className={styles['search-input']}
                onChange={event => onSearchInputChange(event.target.value)}
            />
        </div>
    );
};
