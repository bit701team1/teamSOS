import React from 'react';
import {Button, Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import userimg from '../k_manage_image/k_mange_user.jpg';
import hpimg from '../k_manage_image/k_hpimg.png';
import mailimg from '../k_manage_image/k_mailimg.png';
import hateimg from '../k_manage_image/k_hateimg.png';
import cardimg from '../k_manage_image/k_cardimg.png';
import blockimg from '../image/alert.png';

function UserRowList(props) {
    const {idx,row,no,onDelete,currentPage}=props;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <tr style={{backgroundColor:'white',textAlign:'center'}}>
            <td style={{width:'20px'}}>{no-idx}</td>
            <td style={{width:'80px'}}>{row.user_name}</td>
            <td style={{width:'80px'}}>{row.email}</td>
            <td style={{width:'80px'}}>
                <Button variant="outlined" onClick={handleClickOpen} style={{width:'100%',height:'200px',fontSize:'2.5rem'}}>
                    상세<br/>조회
                </Button>
            </td>
            <td style={{width:'80px'}}>
                <Button variant='outlined' style={{width:'100%',height:'200px',fontSize:'2.5rem',color:'red'}}
                        onClick={()=>{
                            const b=window.confirm("삭제하려면 확인을 누르십시요")
                            if(b){
                                console.log(row.user_id);
                                onDelete(row.user_id);
                            }
                        }}>
                    삭제
                </Button>
            </td>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}   style={{width:'35rem'}}>
                    <img alt={'슬픔이'} src={userimg} style={{width:'5rem',height:'5rem',borderRadius:'100px',marginRight:'10px'}}/>
                    &nbsp;{row.user_name}
                    <img alt={'싫어요 개수'} src={blockimg} style={{width:'2rem',marginLeft:'50%',marginTop:'-0.5rem'}}/> {row.report_num}
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <img alt={'mail이미지'} src={mailimg} style={{width:'2.5rem'}}/>
                        &nbsp; 이메일 : {row.email}
                    </Typography>
                    <Typography gutterBottom>
                        <img alt={'hp이미지'} src={hpimg} style={{width:'2.5rem'}}/>
                        &nbsp; 핸드폰 : {row.hp}
                    </Typography>
                    <Typography gutterBottom>
                        <img alt={'card이미지'} src={cardimg} style={{width:'2.5rem'}}/>
                        &nbsp;총 지불금액 : {row.total_payment}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </tr>
    );
}

export default UserRowList;