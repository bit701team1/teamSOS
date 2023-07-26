import React, {useCallback, useEffect, useState} from 'react';
import './ManagePageMain.css';
import {Link, NavLink, useNavigate, useParams} from "react-router-dom";
import Axios from "axios";
import BlockRowList from "./BlockRowList";
import './UserList.css';

function BlockList(props) {
    const k_photo=process.env.REACT_APP_MANAGE;
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
                <img className="k-people-icon" alt="" src={`${k_photo}k_icon_search.svg`} />
                <input type={'text'} className="k-search-bar" onChange={handleSearchChange} placeholder={'회원명 또는 Email을 입력하세요'} value={searchValueBlock} style={{fontSize:'1rem',textAlign:'center'}}>
                </input>
                <img className="k-search-icon" alt="검색" src={`${k_photo}k_icon_filtter.svg`} onClick={handleSearch} style={{cursor:'pointer'}} />
            </div>

            <div className={'k-list-show'}  style={{fontSize:'1rem'}}>


                <table className={"table k_table-blacklist"}>
                    <tbody>
                    <tr className={'k_userBlocklist_tr'}>
                        <th style={{width:'20%'}}>번호</th>
                        <th style={{width:'30%'}}>이메일</th>
                        <th style={{width:'50%'}}>신고내용</th>
                    </tr>
                    </tbody>
                    {
                        data.Blocklist &&
                        data.Blocklist.map((row,idx)=><BlockRowList key={idx} row={row} no={data.no} idx={idx} onDelete={deleteBlockUser} currentPage={currentPage}/>)
                    }
                </table>

                <div className={'k_paging'}>
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