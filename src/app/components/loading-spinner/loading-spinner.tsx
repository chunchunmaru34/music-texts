import * as React from 'react';

import * as styleSheet from './loading-spinner.scss';

type LoadingSpinnerProps = {
    size?: number;
    sizeUnit?: string;
    color?: string;
};

export const LoadingSpinner = ({
    size = 75,
    sizeUnit = 'px',
    color = '#b7bccb'
}: LoadingSpinnerProps) => {
    const styles = {
        width: `${size}${sizeUnit}`,
        height: `${size}${sizeUnit}`,
        borderColor: color
    };

    return (
        <div className={styleSheet['loading-spinner-container']}>
            <div className={styleSheet['loading-spinner']} style={styles} />
        </div>
    );
};
