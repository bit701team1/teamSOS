import React from 'react';
import RouteMain from './RouteMain';
import { BrowserRouter } from 'react-router-dom';

function Root(props) {
    return (
        <BrowserRouter>
            <div>
                <RouteMain/>
            </div>
        </BrowserRouter>
    );
}

export default Root;