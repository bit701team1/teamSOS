import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material';

function JoinForm(props) {

    const [data, setData] = useState({
        email: '',
        password: "",
        user_name: "",
        hp: "",
        isAuth: false
    })

    const [authnum, setAuthnum] = useState("");
    const [inputauthnum, setInputAuthnum] = useState("");

    const handleJoinClick = (e) => {
        e.preventDefault();
        Axios.post("/user/join", data)
            .then(res => {
                if (res.data === 1) {
                    alert("이미 존재하는 이메일입니다");
                } else if (res.data === 2) {
                    alert("유효한 이메일 형식을 입력해주세요");
                } else {
                    alert("성공적으로 가입되었습니다");
                }
            }).catch(error => {
            // 회원가입 실패 처리
            alert("회원가입에 실패했습니다.");
        });
    }

    //modal
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        if (data.hp == "") {
            alert("전화번호를 입력해주세요");
        } else {
            Axios.post("/sms/send-one", data).then(res => {
                    //console.log(res.data);
                    setAuthnum(res.data);
                }
            )
            setOpen(true);
        }
        setOpen(true);
    }


    const handleClose = () => {
        setOpen(false);
    };

    const handleAuthClick = () => {
        if (authnum == inputauthnum) {
            setData({
                ...data,
                isAuth: true
            })
            handleClose();
        } else {
            alert("authnum : " + authnum, " inputauthnum : " + inputauthnum)
            alert("인증번호가 틀렸습니다");
        }
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: '#d6b4a2', // 변경하고 싶은 기본 색상을 설정
            },
            // 다른 색상들도 필요에 따라 설정 가능
            // secondary: {
            //   main: '#00ff00',
            // },
        },
    });


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
                                <button type='button' onClick={handleClickOpen}>휴대폰 인증</button>
                                {
                                    data.isAuth && <div>인증 OOO</div>
                                }
                                {
                                    !data.isAuth && <div>인증 XXX</div>
                                }
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
            <ThemeProvider theme={theme}>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle><b>SMS 인증</b></DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            입력하신 휴대전화 번호로 전송받은 인증번호를 입력해주세요
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="인증번호"
                            InputLabelProps={{
                                style: { fontWeight: 'bold' },
                            }}
                            type="email"
                            fullWidth
                            variant="standard"
                            onChange={(event) => {
                                setInputAuthnum(event.target.value);
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAuthClick}>확인</Button>
                        <Button onClick={handleClose}>취소</Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </div>
    );
}

export default JoinForm;