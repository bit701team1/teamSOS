import React from 'react';
import RouteMain from './RouteMain';
import { BrowserRouter } from 'react-router-dom';

function Root(props) {
    return (
        <div>
            <BrowserRouter>
                <RouteMain/>
            </BrowserRouter>            
        </div>
    );
}

export default Root;