import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
function LiveStream(props) {
    const [videoUrl, setVideoUrl] = useState('');

    useEffect(() => {
        const fetchVideoUrl = async () => {
            try {
                const response = await axios.get('/livestream/api/video');
                setVideoUrl(response.data);
            } catch (error) {
                console.log('Error fetching video URL:', error);
            }
        };

        fetchVideoUrl();
    }, []);

    const handleVideo = () => {
        // handle video ending event
    };

    return (
            <div className='player-wrapper'>
                {videoUrl && (
                    <ReactPlayer
                        className='react-player'
                        url={videoUrl}
                        width='100%'
                        height='15.38rem'
                        playing={true}
                        muted={true}
                        controls={true}
                        light={false}
                        pip={true}
                        poster='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'
                        onEnded={() => handleVideo()}
                    />
                )}
            </div>
    );
}

export default LiveStream;