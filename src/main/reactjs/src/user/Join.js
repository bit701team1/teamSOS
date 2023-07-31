import React, {useState} from 'react';
import './Join.css';
import Axios from "axios";
import {createTheme, ThemeProvider} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

// import BackIcon2 from "../ImageTest/back-arrow2.svg";
// import UserIcon from "../ImageTest/user.svg";
// import EmailIcon from "../ImageTest/email-black.svg";
// import PassIcon from "../ImageTest/pass-black.svg";
// import PhoneIcon from "../ImageTest/phone-black.svg";

function SignUpPage(props) {

    const BackIcon2 = process.env.REACT_APP_BUCKET + "/iconblack/back-arrow2.svg";
    const UserIcon = process.env.REACT_APP_BUCKET + "/iconblack/user.svg";
    const EmailIcon = process.env.REACT_APP_BUCKET + "/iconblack/email-black.svg";
    const PassIcon = process.env.REACT_APP_BUCKET + "/iconblack/pass-black.svg";
    const PhoneIcon = process.env.REACT_APP_BUCKET + "/iconblack/phone-black.svg";

    const MsgIcon = process.env.REACT_APP_BUCKET + "/user/mail.png";
    const RedCrossIcon = process.env.REACT_APP_BUCKET + "/user/cross.png";
    const GreenCheckIcon = process.env.REACT_APP_BUCKET + "/user/check.png";

    const [data, setData] = useState({
        email: '',
        password: "",
        user_name: "",
        hp: "",
        isAuth: false
    })

    const [authnum, setAuthnum] = useState("");
    const [inputauthnum, setInputAuthnum] = useState("");

    const navi  = useNavigate();

    const handleJoinClick = (e) => {

        // const form = e.target.closest('form');
        // form.submit();

        if(data.user_name==""){
            alert("이름을 입력해주세요");
        } else if (data.email=="") {
            alert("이메일을 입력해주세요");
        } else if (data.password=="") {
            alert("비밀번호를 입력해주세요");
        } else if (data.hp=="") {
            alert("전화번호를 입력해주세요");
        } else if (!data.isAuth) {
            alert("전화번호 인증이 필요합니다");
        }  else {

            e.preventDefault();
            Axios.post("/api/user/join", data)
                .then(res => {
                    if (res.data === 1) {
                        alert("이미 존재하는 이메일입니다");
                    } else if (res.data === 2) {
                        alert("유효한 이메일 형식을 입력해주세요");
                    } else {
                        alert("성공적으로 가입되었습니다");
                        navi("/login");
                    }
                }).catch(error => {
                // 회원가입 실패 처리
                alert("회원가입에 실패했습니다.");
            });

        }
    }

    //모바일 인증 Dialog
    const [open, setOpen] = React.useState(false);

    const handleClickAuth = () => {
        if (data.hp == "") {
            alert("전화번호를 입력해주세요");
        } else {
            Axios.post("/api/sms/send-one", data).then(res => {
                    //console.log(res.data);
                    setAuthnum(res.data);
                }
            )
            setOpen(true);
        }
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
        <div className="SignUpBackgroundColor">
            <div className='SignUpPage'>
                <div className="SignUpPageHeader">
                    <a href='/enter'>
                        <img className="SignUpIcon" alt="뒤로가기 버튼" src={BackIcon2}/>
                    </a>
                    <span className="SignUpTitle">회원가입</span>
                </div>

                <div className="SignUpPageBody">
                    <form>
                        <div className="SignUpPageInput">
                            <input type="text" required placeholder='이름을 입력하세요'
                                   value={data.user_name} onChange={(e) => setData({
                                ...data,
                                user_name: e.target.value
                            })
                            }/>
                            <span className="SignUpHighlight"></span>
                            <span className="SignUpBar"></span>
                            <img className="UserIcon" src={UserIcon} alt="이름"/>
                            <label>이름</label>
                        </div>

                        <div className="SignUpPageInput">
                            <input type="text" required placeholder='이메일을 입력하세요'
                                   value={data.email} onChange={(e) => setData({
                                ...data,
                                email: e.target.value
                            })
                            }/>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <img className="EmailIcon" src={EmailIcon} alt="이메일"/>
                            <label>이메일</label>
                        </div>

                        <div className="SignUpPageInput">
                            <input type="password" required placeholder='비밀번호를 입력하세요'
                                   value={data.password} onChange={(e) => setData({
                                ...data,
                                password: e.target.value
                            })
                            }/>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <img className="PassIcon" src={PassIcon} alt="비밀번호"/>
                            <label>비밀번호</label>
                        </div>

                        <div className="SignUpPageInput">
                            <input type="text" required placeholder='휴대폰 번호를 입력하세요'
                                   value={data.hp} onChange={(e) => setData({
                                ...data,
                                hp: e.target.value
                            })
                            }/>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <img className="PhoneIcon" src={PhoneIcon} alt="휴대폰"/>
                            <label>휴대폰</label>
                        </div>
                    </form>

                    <div className="SignUpPageLink">
                        <span className="SignUpPageLinkText1">모바일 인증을 진행해주세요</span>
                        <span className="SignUpPageLinkText2">{` `}</span>
                        <span className="SignUpPageLinkText3" onClick={handleClickAuth}> 인증번호 전송  </span>
                        {/*<div className="SignUpAuthButton" onClick={handleClickAuth}>*/}
                        {/*    <span>*/}
                        {/*        <img src = {MsgIcon} alt = "MsgIcon" className="MsgIcon"/>*/}
                        {/*        <span className="SignUpPageLinkText3"> 인증번호 전송  </span>*/}
                        {/*    </span>*/}
                        {/*</div>*/}
                        <div>
                            {
                                !data.isAuth && <img src = {RedCrossIcon} alt = "RedCrossIcon" className="RedCrossIcon"/>
                            }
                            {
                                data.isAuth && <img src = {GreenCheckIcon} alt = "GreenCheckIcon" className="GreenCheckIcon"/>
                            }
                        </div>
                    </div>

                    <div className="SignUpButton" onClick={handleJoinClick} >
                        <span className="SignUpButtonText">회원가입</span>
                    </div>
                </div>

                <div className="SingUpPageFooter">
                    <span className="SingUpFooterText1">이미 회원이신가요?</span>
                    <span className="SingUpFooterText2">{` `}</span>
                    <a href="/login">
                        <span className="SingUpFooterText3">로그인</span>
                    </a>
                </div>

                {/*모바일 인증번호 Diaglog*/}
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
        </div>
    );
}

export default SignUpPage;
