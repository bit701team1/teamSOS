import React, {useCallback, useEffect, useState} from 'react';
import k_people_icon from "../k_manage_image/k_people_icon.svg";
import k_search_icon from "../k_manage_image/k_search_icon.svg";
import './ManagePageMain.css';
import {Link, NavLink, useNavigate, useParams} from "react-router-dom";
import Axios from "axios";
import BlockRowList from "./BlockRowList";

function BlockList(props) {

    const [blockdata,setBlockdata]=useState([]);
    const {currentPage}=useParams();
    const [searchValueBlock, setSearchValueBlock] = useState('');
    const navi=useNavigate();

    //출력 이벤트
    const getBlocklist=useCallback(()=>{
        const url="/manage/blocklist?currentPage="+(currentPage==null?1:currentPage)+"&search="+(searchValueBlock || '');
        Axios.get(url)
            .then(res=>{
                console.log("res.data="+res.data);
                setBlockdata(res.data);
            })

    },[currentPage,searchValueBlock]);

    const handleSearchChange=(e)=>{
        setSearchValueBlock(e.target.value);
    };

    const handleSearch=()=>{
        getBlocklist();
    };

    const deleteBlockUser=(user_id)=>{
        const url="/manage/delete?user_id="+user_id;
        Axios.delete(url)
            .then(res=>{
                alert("삭제 되었습니다");
                getBlocklist();
            })
    }

    useEffect(()=>{
        getBlocklist();
    },[getBlocklist])


    return (
        <div style={{fontSize:'2.5rem'}}>
            <div className="k-searchbox">
                <img className="k-people-icon" alt="" src={k_people_icon} />
                <input type={'text'} className="k-search-bar" onChange={handleSearchChange} value={searchValueBlock}>
                </input>
                <img className="k-search-icon" alt="검색" src={k_search_icon} onClick={handleSearch} style={{cursor:'pointer'}} />
            </div>
            <b style={{marginLeft:'200px'}}>총 {blockdata.totalCount} 개</b>

            <table className={"table table-bordered k_table-userlist"}>
                <tr style={{backgroundColor:'white',textAlign:'center'}}>
                    <th style={{width:'80px'}}>번호</th>
                    <th style={{width:'80px'}}>회원명</th>
                    <th style={{width:'80px'}}>이메일</th>
                    <th style={{width:'80px'}}>신고수</th>
                    <th style={{width:'80px'}}>삭제</th>
                </tr>
                {
                    blockdata.getBlocklist &&
                    blockdata.getBlocklist.map((row,idx)=><BlockRowList key={idx} row={row} no={blockdata.no} idx={idx} onDelete={deleteBlockUser} currentPage={currentPage}/>)
                }
            </table>

            <div style={{width:'100%',textAlign:'center'}}>
                {/* 페이징처리 */}
                {
                    //이전
                    blockdata.startPage>1?
                        <Link to={`/manage/blocklist/${blockdata.startPage-1}`}
                              style={{textDecoration:'none',cursor:'pointer',marginRight:'10px'}}>
                            이전</Link>:''
                }
                {
                    blockdata.barr &&
                    blockdata.barr.map((pno,i)=>
                        <NavLink to={`/manage/blocklist/${pno}`} style={{textDecoration:'none'}} key={i}>
                            <b style={{marginRight:'10px',
                                color:pno===Number(currentPage)?'red':'black'}}>{pno}</b>
                        </NavLink>)
                }
                {
                    // 다음
                    blockdata.endPage<blockdata.totalPage?
                        <Link to={`/manage/blocklist/${blockdata.endPage+1}`}
                              style={{textDecoration:'none',cursor:'pointer'}}>
                            다음</Link>:''
                }
            </div>
        </div>
    );
}

export default BlockList;