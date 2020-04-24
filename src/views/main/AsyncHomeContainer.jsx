import React from 'react';
import loadable from 'react-loadable';
import { GoogleApiWrapper } from 'google-maps-react';

const LoadingContainer = () => <h3>Loading...</h3>;

const HomeContainerPromise = () => {
    return import('./HomeContainer');
}

const AsyncHomeContainer = loadable({
    loader: HomeContainerPromise,
    loading: LoadingContainer
});

export default GoogleApiWrapper({
    apiKey: __GAPI_KEY__
})(AsyncHomeContainer)
