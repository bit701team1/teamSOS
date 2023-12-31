import React, {useCallback, useEffect, useState} from 'react';
import Axios from "axios";
import UserRowList from "./UserRowList";
import {Link, NavLink, useNavigate, useParams} from "react-router-dom";
import '../../css/managepagecss/managepagemain.css';
import '../../css/managepagecss/userlist.css';



function UserList(props) {
    const k_photo=process.env.REACT_APP_MANAGE;
    const [data,setData]=useState([]);
    const {currentPage}=useParams();
    const [searchValue, setSearchValue] = useState('');
    const navi=useNavigate();

    //리스트 출력 함수
    const getUserList=useCallback(()=>{
        const url="/manage/userlist?currentPage="+(currentPage==null?1:currentPage)+"&search="+(searchValue || '');
        Axios.get(url)
            .then(res=>{
                setData(res.data);
            })

    },[currentPage,searchValue]);

    // 검색 이벤트
    const handleSearchChange=(e)=>{
        setSearchValue(e.target.value);
    };
    // 검색 후 목록 출력
    const handleSearch=()=>{
        getUserList();
    };

    // 유저 삭제 이벤트
    const deleteUser=(user_id)=>{
        const url="/manage/delete?user_id="+user_id;
        Axios.delete(url)
            .then(res=>{
                alert("삭제 되었습니다");
                getUserList();
            })
    }

    useEffect(()=>{
        getUserList();
    },[getUserList])


    return (
        <div>

            <div className="k-searchbox">
                <img className="k-people-icon" alt="" src={`${k_photo}k_icon_search.svg`} />
                <input type={'text'} className="k-search-bar" onChange={handleSearchChange} placeholder={'회원명 또는 Email을 입력하세요'} value={searchValue}>
                </input>
                <img className="k-search-icon" alt="필터" src={`${k_photo}k_icon_filtter.svg`} onClick={handleSearch}/>
            </div>

            <div className={'k-list-show'} style={{fontSize:'1rem'}}>

                <table className={"table k_table-userlist"}>
                    <tbody>
                    <tr className={'k_userlist_tr'}>
                        <th style={{width:'30%'}}>번호</th>
                        <th style={{width:'35%'}}>회원명</th>
                        <th style={{width:'35%'}}>이메일</th>
                    </tr>
                    {
                        // userlist.map((row,idx)=><UserRowList key={idx} row={row} idx={idx} onDelete={deleteUser}/>)
                        data.getUserList &&
                        data.getUserList.map((row,idx)=><UserRowList key={idx} row={row} no={data.no} idx={idx} onDelete={deleteUser} currentPage={currentPage}/>)
                    }
                    </tbody>

                </table>

                <div className={'k_paging'}>
                    {/* 페이징처리 */}
                    {
                        //이전
                        data.startPage>1?
                            <Link to={`/manage/userlist/${data.startPage-1}`}
                                  style={{textDecoration:'none',cursor:'pointer',marginRight:'10px'}}>
                                이전</Link>:''
                    }
                    {
                        data.parr &&
                        data.parr.map((pno,i)=>
                            <NavLink to={`/manage/userlist/${pno}`} style={{textDecoration:'none'}} key={i}>
                                <b style={{marginRight:'10px',
                                    color:pno===Number(currentPage)?'red':'black'}}>{pno}</b>
                            </NavLink>)
                    }
                    {
                        // 다음
                        data.endPage<data.totalPage?
                            <Link to={`/manage/userlist/${data.endPage+1}`}
                                  style={{textDecoration:'none',cursor:'pointer'}}>
                                다음</Link>:''
                    }
                </div>
            </div>
        </div>
    );
}

export default UserList;