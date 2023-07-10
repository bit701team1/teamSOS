import React from 'react';
import {NavLink} from "react-router-dom";

function GitTestHome(props) {

    return (
        <div>
            <h1>연결 테스트 파일</h1>
            <h2>히스토리 맞추기용</h2>
            <h3>반갑다 나는 승리했다</h3>
            <ul>
                <li>
                    <NavLink to={'/manage'}>관리자페이지</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default GitTestHome;