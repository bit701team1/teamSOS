import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './MainDownSlide.css';

function MainDownSlide(props) {

    const m_photo = process.env.REACT_APP_MAIN;
    const img1 = `${m_photo}MainDownSlide-money.jpeg`;
    const img2 = `${m_photo}MainDownSlide-honor.png`;
    const img3 = `${m_photo}MainDownSlide-time.jpeg`;
    const img4 = `${m_photo}MainDownSlide-love.webp`;
    const img5 = `${m_photo}MainDownSlide-hope.jpeg`;

    const urls = [img1,img2,img3,img4,img5];
    const names = ['money', 'honor', 'time', 'love', 'hope'];

    const [selectedName, setSelectedName] = useState(null);

    const itemsRef = useRef([]);

    const expand = (item, i) => {
        const items = itemsRef.current;

        item.clicked = !item.clicked;

        items.forEach((it, ind) => {
            if (i !== ind) {
                gsap.to(it, {
                    filter: item.clicked ? 'grayscale(1)' : 'none',
                    width: item.clicked ? '15vw' : '15vw',
                    duration: 2,
                    ease: 'elastic(1, .6)'
                });
                it.clicked = false;
            }
        });

        gsap.to(item, {
            width: item.clicked ? '42vw' : '15vw',
            filter: item.clicked ? 'none' : 'none',
            duration: 2.5,
            ease: 'elastic(1, .3)'
        });

        setSelectedName(item.clicked ? names[i] : null);
    }

    useEffect(() => {
        const items = itemsRef.current;

        items.forEach((item) => {
            item.clicked = false;
            gsap.to(item, { filter: 'none', duration: 0.5 });
        });
    }, []);

    return (
        <div className="MainDownSlideGroup">
            {urls.map((url, i) => (
                <div key={i}>
                    <div
                        onClick={() => {
                            const item = itemsRef.current[i];
                            if (item) {
                                expand(item, i);
                            }
                        }}
                        ref={el => itemsRef.current[i] = el}
                        className="MainDownSlideItem"
                        style={{backgroundImage: `url(${url})`}}
                    />
                    {selectedName === names[i] && <div className="SelectedName">{selectedName}</div>}
                </div>
            ))}
        </div>
    );
}

export default MainDownSlide;