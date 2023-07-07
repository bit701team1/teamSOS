import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Axios from "axios";

function JoinForm(props) {

    const [data, setData] = useState({
        id: '',
        email:'',
        password: "",
        user_name:"",
        hp:""
    })


    const handleJoinClick = ()=>{
        Axios.post("/user/join",data)
            .then(res=>{
                alert(res);
            })
    }

    return (
        <div>
            <NavLink to={"/"}><h2>Menu</h2></NavLink>
            <h1>JoinForm</h1>

            <div className='login'>
                <form onSubmit={handleJoinClick}>
                    <table className='table' style={{width:'400px'}}>
                        <caption align='top'><b>가입</b></caption>
                        <tbody>
                        <tr>
                            <th style={{width:'100px',backgroundColor:'#b0e0e6'}}>ID</th>
                            <td className='input-group'>
                                <input type="text" value={data.id} onChange={(e) => setData({
                                    ...data,
                                    id: e.target.value
                                })
                                }/>
                            </td>
                        </tr>
                        <tr>
                            <th style={{width:'100px',backgroundColor:'#b0e0e6'}}>비밀번호</th>
                            <td>
                                <input type="password" value={data.password} onChange={(e) => setData({
                                    ...data,
                                    password: e.target.value
                                })
                                }/>
                            </td>
                        </tr>
                        <tr>
                            <th style={{width:'100px',backgroundColor:'#b0e0e6'}}>email</th>
                            <td className='input-group'>
                                <input type="text" value={data.email} onChange={(e) => setData({
                                    ...data,
                                    email: e.target.value
                                })
                                }/>
                            </td>
                        </tr>
                        <tr>
                            <th style={{width:'100px',backgroundColor:'#b0e0e6'}}>user_name</th>
                            <td className='input-group'>
                                <input type="text" value={data.user_name} onChange={(e) => setData({
                                    ...data,
                                    user_name: e.target.value
                                })
                                }/>
                            </td>
                        </tr>
                        <tr>
                            <th style={{width:'100px',backgroundColor:'#b0e0e6'}}>hp</th>
                            <td className='input-group'>
                                <input type="text" value={data.hp} onChange={(e) => setData({
                                    ...data,
                                    hp: e.target.value
                                })
                                }/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} align='center'>
                                <button type='submit' className='btn btn-outline-success'
                                        style={{width:'100px'}}>가입</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
}

export default JoinForm;