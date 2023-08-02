import React from 'react';
import {Button, Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import blockimg from '../../image/alert.png';
import '../../css/ManagePageCSS/blocklist.css';

function BlockRowList(props) {
    const { idx, row, no, onDelete, currentPage } = props;
    const [open, setOpen] = React.useState(false);

    // blockuser dialog
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const limitMsg =(msg, maxLength)=>{
        if(msg.length > maxLength){
            return msg.substring(0,maxLength-6)+"...";
        }else {
            return msg;
        }
    };

    const k_photo=process.env.REACT_APP_MANAGE;
    const ShortMsg=limitMsg(row.msg, 10);

    return (
        <tr className={'userBlockRowList'} style={{borderStyle:'unset',border:'snow'}} >
            <td>{idx+1}</td>
            <td className={'k_blocklist_email'}>{row.email}</td>
            <td style={{ cursor:'pointer' }} onClick={handleClickOpen}>{ShortMsg}</td>

            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                className={'k_blockuser_detail'}

            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}   style={{width:'22rem'}} >
                    <img alt={'슬픔이'} src={`${k_photo}k_mange_user.jpg`} className={'k_block_dialog_header'}/>
                    <div className={'k_block_dialog_header_text'}>
                        {row.email}
                    </div>
                </DialogTitle>
                <DialogContent dividers style={{whiteSpace: 'pre-line'}}>
                    <Typography gutterBottom>
                        <div className={'k_block_textbox'}>
                            <img alt={'경고이미지'} src={blockimg} className={'k_block_img'}/>
                            <div className={'k_block_text'}>신고 메세지</div>
                        </div>
                    </Typography>

                    <Typography variant="body2">
                        <div className={'k_block_msg'}>
                            {row.msg}
                        </div>
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
