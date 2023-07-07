import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Axios from "axios";

function LoginForm(props) {

    const [data, setData] = useState({
        id: '',
        email:'',
        password: ""
    })

    const handleDeleteClick = () => {
        Axios.delete("/api/delete-cookie")
            .then(res => {
                alert("쿠키값 제거")
            })
    }

    const handleLoginClick = () => {
        // alert(data.id);
        // alert(data.password);
        //dto로 /user/login 으로 넘겨야함
        let url = "/user/login";
        Axios.post(url, data).then(res => {
            console.log(res);
        })

    }

    return (
        <div>
            <NavLink to={"/"}><h2>Menu</h2></NavLink>
            <h1>LoginForm</h1>
            <h3 onClick={handleDeleteClick}>클릭시 쿠키값을 지웁니다</h3>
            <br/><br/>
            <div>
                <input type="text" value={data.id} onChange={(e) => setData({
                    ...data,
                    id: e.target.value
                })
                }/>
            </div>
            <div>
                <input type="text" value={data.email} onChange={(e) => setData({
                    ...data,
                    email: e.target.value
                })
                }/>
            </div>
            <div>
                <input type="password" value={data.password} onChange={(e) => setData({
                    ...data,
                    password: e.target.value
                })
                }/>
                <button onClick={handleLoginClick}>로그인</button>
            </div>
        </div>
    );
}

export default LoginForm;