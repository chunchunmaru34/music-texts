import * as React from 'react';

import { LoadingSpinner } from '@components/loading-spinner/loading-spinner';

type LoadingWrapperProps = {
    children: JSX.Element;
    isLoading: boolean;
};

export const LoadingWrapper = ({ children, isLoading }: LoadingWrapperProps) =>
    isLoading ? <LoadingSpinner /> : children;
