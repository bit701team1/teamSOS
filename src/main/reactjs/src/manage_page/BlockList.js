import React, {useCallback, useEffect, useState} from 'react';
import k_people_icon from "../k_manage_image/k_people_icon.svg";
import k_search_icon from "../k_manage_image/k_search_icon.svg";
import './ManagePageMain.css';
import {Link, NavLink, useNavigate, useParams} from "react-router-dom";
import Axios from "axios";
import BlockRowList from "./BlockRowList";
import './UserList.css';

function BlockList(props) {

    const [data,setData]=useState([]);
    const {currentPage}=useParams();
    const [searchValueBlock, setSearchValueBlock] = useState('');
    const navi=useNavigate();

    //출력 이벤트
    const Blocklist=useCallback(()=>{
        const url="/manage/blocklist?currentPage="+(currentPage==null?1:currentPage)+"&search="+(searchValueBlock || '');
        Axios.get(url)
            .then(res=>{
                console.log("res.data="+res.data);
                setData(res.data);
            })

    },[currentPage,searchValueBlock]);

    const handleSearchChange=(e)=>{
        setSearchValueBlock(e.target.value);
    };

    const handleSearch=()=>{
        Blocklist();
    };

    const deleteBlockUser=(user_id)=>{
        const url="/manage/delete?user_id="+user_id;
        Axios.delete(url)
            .then(res=>{
                alert("삭제 되었습니다");
                Blocklist();
            })
    }

    useEffect(()=>{
        Blocklist();
    },[Blocklist])


    return (
        <div>
            <div className="k-searchbox">
                <img className="k-people-icon" alt="" src={k_people_icon} />
                <input type={'text'} className="k-search-bar" onChange={handleSearchChange} value={searchValueBlock} style={{fontSize:'1rem'}}>
                </input>
                <img className="k-search-icon" alt="검색" src={k_search_icon} onClick={handleSearch} style={{cursor:'pointer'}} />
            </div>

            <div className={'k-list-show'}  style={{fontSize:'1rem'}}>

                <b style={{marginLeft:'15%'}}>총 {data.totalCount} 명</b>

                <table className={"table k_table-blacklist"}>
                    <tr style={{backgroundColor:'lightpink',textAlign:'center'}}>
                        <th style={{width:'80px'}}>번호</th>
                        <th style={{width:'80px'}}>이메일</th>
                        <th style={{width:'80px'}}>신고내용</th>
                        {/*<th style={{width:'80px'}}>삭제</th>*/}
                    </tr>
                    {
                        data.Blocklist &&
                        data.Blocklist.map((row,idx)=><BlockRowList key={idx} row={row} no={data.no} idx={idx} onDelete={deleteBlockUser} currentPage={currentPage}/>)
                    }
                </table>

                <div style={{width:'100%',textAlign:'center',fontSize:'0.8rem'}}>
                    {/* 페이징처리 */}
                    {
                        //이전
                        data.startPage>1?
                            <Link to={`/manage/blocklist/${data.startPage-1}`}
                                  style={{textDecoration:'none',cursor:'pointer',marginRight:'10px'}}>
                                이전</Link>:''
                    }
                    {
                        data.barr &&
                        data.barr.map((pno,i)=>
                            <NavLink to={`/manage/blocklist/${pno}`} style={{textDecoration:'none'}} key={i}>
                                <b style={{marginRight:'10px',
                                    color:pno===Number(currentPage)?'red':'black'}}>{pno}</b>
                            </NavLink>)
                    }
                    {
                        // 다음
                        data.endPage<data.totalPage?
                            <Link to={`/manage/blocklist/${data.endPage+1}`}
                                  style={{textDecoration:'none',cursor:'pointer'}}>
                                다음</Link>:''
                    }
                </div>
            </div>
        </div>
    );
}

export default BlockList;