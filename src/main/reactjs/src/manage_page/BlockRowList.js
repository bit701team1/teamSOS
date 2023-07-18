import React from 'react';
import { Button } from "@mui/material";

function BlockRowList(props) {
    const { idx, row, no, onDelete, currentPage } = props;

        return (
            <tr style={{backgroundColor:'white',textAlign:'center'}}>
                <td style={{width:'20px'}}>{no-idx}</td>
                <td style={{width:'80px'}}>{row.user_name}</td>
                <td style={{width:'80px'}}>{row.email}</td>
                <td style={{width:'80px'}}>{row.report_num}</td>
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
            </tr>
        );
}

export default BlockRowList;
