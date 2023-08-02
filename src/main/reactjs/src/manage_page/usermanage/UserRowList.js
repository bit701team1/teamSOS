import React from 'react';
import {Button, Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import '../../css/managepagecss/userlist.css';
import reportimg from '../../image/alert.png';

function UserRowList(props) {
    const k_photo=process.env.REACT_APP_MANAGE;
    const {idx,row,no,onDelete,currentPage}=props;
    const [open, setOpen] = React.useState(false);

    // 유저 상세보기 Dialog 열기
    const handleClickOpen = () => {
        setOpen(true);
    };
    // 유저 상세보기 Dialog 닫기
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <tr className={'userRowList'} style={{borderStyle:'unset',border:'snow'}}>
            <td>{no-idx}</td>
            <td >{row.user_name}</td>
            <td onClick={handleClickOpen} style={{cursor:'pointer'}} className={'k_userlist_email'}>{row.email}</td>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                className={'k_user_detail'}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}   style={{width:'22rem'}}>
                    <img alt={'슬픔이'} className={'k_user_dialog_header'} src={`${k_photo}k_mange_user.jpg`}/>
                    <div className={'k_user_dialog_header_text'}>
                        {row.user_name}
                    </div>
                    <div className={'k_report_numbox'}>
                        <img alt={'신고수'} className={'k_report_num'} src={reportimg}/>
                        <div className={'k_report_num_text'}>
                            {row.report_num} 회
                        </div>
                    </div>

                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <img alt={'mail이미지'} src={`${k_photo}k_mailimg.png`} className={'k_user_dialog_emailimg'}/>
                        &nbsp; 이메일 : <span className={'k_user_dialog_email'}>{row.email}</span>
                    </Typography>
                    <Typography gutterBottom>
                        <img alt={'hp이미지'} src={`${k_photo}k_hpimg.png`} style={{width:'2.5rem'}}/>
                        &nbsp; 핸드폰 : {row.hp.slice(0, 3) + "-" + row.hp.slice(3, 7) + "-" + row.hp.slice(7)}
                    </Typography>
                    <Typography gutterBottom>
                        <img alt={'card이미지'} src={`${k_photo}k_cardimg.png`} style={{width:'2.5rem'}}/>
                        &nbsp;총 지불금액 : ₩ {Number(row.total_payment).toLocaleString('ko-KR')}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <button className={'k_user_delete'}
                            onClick={()=>{
                                const b=window.confirm("삭제하려면 확인을 누르십시요")
                                if(b){
                                    console.log(row.user_id);
                                    onDelete(row.user_id);
                                }
                            }}>
                        회원 삭제
                    </button>
                    <Button autoFocus onClick={handleClose}>
                        상세조회 닫기
                    </Button>
                </DialogActions>
            </Dialog>
        </tr>
    );
}

export default UserRowList;