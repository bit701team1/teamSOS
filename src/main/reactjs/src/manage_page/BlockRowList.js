import React from 'react';
import { Button } from "@mui/material";

function BlockRowList(props) {
    const { idx, row, no, onDelete, currentPage } = props;

    // report_num이 0이 아닌 경우에만 해당 정보를 표시
    if (row.report_num !== 0) {
        return (
            <tr style={{ backgroundColor: 'white', textAlign: 'center' }}>
                <td style={{ width: '20px' }}>{no - idx}</td>
                <td style={{ width: '80px' }}>{row.user_name}</td>
                <td style={{ width: '80px' }}>{row.email}</td>
                <td style={{ width: '80px' }}>{row.report_num} 회</td>
                <td style={{ width: '80px' }}>
                    <Button
                        variant="outlined"
                        style={{ width: '100%', height: '200px', fontSize: '2.5rem', color: 'red' }}
                        onClick={() => {
                            const b = window.confirm("삭제하려면 확인을 누르십시오");
                            if (b) {
                                console.log(row.user_id);
                                onDelete(row.user_id);
                            }
                        }}
                    >
                        삭제
                    </Button>
                </td>
            </tr>
        );
    } else {
        // report_num이 0인 경우 null을 반환하여 해당 정보를 렌더링하지 않음
        return null;
    }
}

export default BlockRowList;
