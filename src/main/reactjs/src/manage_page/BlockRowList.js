import React from 'react';
import {Button, Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";
import userimg from "../k_manage_image/k_mange_user.jpg";
import DialogActions from "@mui/material/DialogActions";
import blockimg from '../image/alert.png';
import './UserList.css';

function BlockRowList(props) {
    const { idx, row, no, onDelete, currentPage } = props;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const limitMsg =(msg, maxLength)=>{
        if(msg.length > maxLength){
            return msg.substring(0,maxLength-3)+"...";
        }else {
            return msg;
        }
    };

    const ShortMsg=limitMsg(row.msg, 10);

    return (
        <tr className={'userBlockRowList'} style={{borderStyle:'unset',border:'none'}} >
            <td>{idx+1}</td>
            <td>{row.email}</td>
            <td style={{ cursor:'pointer' }} onClick={handleClickOpen}>{ShortMsg}</td>

            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                className={'k_blockuser_detail'}

            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}   style={{width:'22rem'}} >
                    <img alt={'슬픔이'} src={userimg} style={{width:'4rem',height:'4rem',borderRadius:'100px',marginRight:'4px'}}/>
                    &nbsp;{row.email}
                </DialogTitle>
                <DialogContent dividers style={{whiteSpace: 'pre-line'}}>
                    <Typography gutterBottom>
                        <img alt={'경고이미지'} src={blockimg} style={{width:'1.5rem'}}/>
                        &nbsp;
                    </Typography>

                    <Typography variant="body2">
                        {row.msg}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        상세조회 닫기
                    </Button>
                </DialogActions>
            </Dialog>
        </tr>
    );
}

export default BlockRowList;
