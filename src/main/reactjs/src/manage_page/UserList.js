import React, {useCallback, useEffect, useState} from 'react';
import Axios from "axios";
import UserRowList from "./UserRowList";
import {Link, NavLink, useNavigate, useParams} from "react-router-dom";
import k_people_icon from "../k_manage_image/k_people_icon.svg";
import k_search_icon from "../k_manage_image/k_search_icon.svg";
import './ManagePageMain.css';



function UserList(props) {

    const [data,setData]=useState([]);
    const {currentPage}=useParams();
    const [searchValue, setSearchValue] = useState('');
    const navi=useNavigate();

    //출력 이벤트
    const getUserList=useCallback(()=>{
        const url="/manage/userlist?currentPage="+(currentPage==null?1:currentPage)+"&search="+(searchValue || '');
        Axios.get(url)
            .then(res=>{
                console.log(res.data);
                setData(res.data);
            })
            .catch(error=>{
                console.log(error);
            });

    },[currentPage,searchValue]);

    const handleSearchChange=(e)=>{
        setSearchValue(e.target.value);
    };

    const handleSearch=()=>{
        getUserList();
    };


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
        <div style={{fontSize:'2.5rem'}}>
            <div className="k-searchbox">
                <img className="k-people-icon" alt="" src={k_people_icon} />
                <input type={'text'} className="k-search-bar" onChange={handleSearchChange} value={searchValue}>
                </input>
                <img className="k-search-icon" alt="검색" src={k_search_icon} onClick={handleSearch} style={{cursor:'pointer'}} />
            </div>
            <b style={{marginLeft:'200px'}}>총 {data.totalCount}개</b>

            <table className={"table table-bordered k_table-userlist"}>
                <tr style={{backgroundColor:'white',textAlign:'center'}}>
                    <th style={{width:'80px'}}>번호</th>
                    <th style={{width:'80px'}}>회원명</th>
                    <th style={{width:'80px'}}>이메일</th>
                    <th style={{width:'80px'}}>조회</th>
                    <th style={{width:'80px'}}>삭제</th>
                </tr>
                {
                    // userlist.map((row,idx)=><UserRowList key={idx} row={row} idx={idx} onDelete={deleteUser}/>)
                    data.getUserList &&
                    data.getUserList.map((row,idx)=><UserRowList key={idx} row={row} no={data.no} idx={idx} onDelete={deleteUser} currentPage={currentPage}/>)
                }
            </table>

            <div style={{width:'100%',textAlign:'center'}}>
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
    );
}

export default UserList;