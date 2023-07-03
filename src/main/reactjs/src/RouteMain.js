import React from 'react';
import { Route, Routes } from 'react-router-dom';

import errorimg from './image/ERR404.png';
import GitTestHome from './com/GitTestHome';

function RouteMain(props) {
    return (
        <div>
            <Routes>
                <Route path='/' element={<GitTestHome/>}/>
                <Route path='/*' element={
                    <div>
                        <h1>잘못된 URL 주소입니다</h1>
                        <br/><br/>
                        <img alt='' src={errorimg}/>
                    </div>
                }/>

            </Routes>
        </div>
    );
}

export default RouteMain;