import React, {useState, useEffect} from 'react';
import './MyAlertTest.css';
import {styled} from '@mui/system';
import Switch from '@mui/material/Switch';
import axios from 'axios';

// Switch component with custom styles
const StyledSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: '#f5dd4b',
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#81b0ff',
    },
    '& .MuiSwitch-switchBase': {
        color: '#f4f3f4',
    },
    '& .MuiSwitch-switchBase + .MuiSwitch-track': {
        backgroundColor: '#767577',
    },
}));

function MyAlertTest() {
    const [isEnabled, setIsEnabled] = useState(true);

    const toggleSwitch = () => {
        const url = "/myalert/toggle";
        axios.get(url, { withCredentials: true })
            .then(response => {
                setIsEnabled(response.data);
                console.log("리스폰스데이텅"+response.data);
            })
            .catch((error) => {
                console.error('도대체 이게 무슨에라야!!', error);
                console.log("에러데이터"+error.data);
            });
    };

    // const [alarm, setAlarm] = useState('');
    //
    // const toggleSwitch = () => {
    //     axios.get('/room/userdata')
    //         .then(response => {
    //             setAlarm(response.data);
    //             console.log(response.data);
    //         })
    //         .catch(error => {
    //             console.error('에러가 발생했습니다!', error);
    //         });
    // };


    useEffect(() => {
        // toggleSwitch();
    }, [isEnabled]);

    return (
        <div style={{margin:'0 auto', width:'100px'}}>
            <div style={{
                display:'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <StyledSwitch
                    onChange={toggleSwitch}
                    checked={isEnabled}
                />
            </div>
        </div>
    );
};

export default MyAlertTest;
