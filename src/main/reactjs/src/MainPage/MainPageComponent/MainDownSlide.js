// React 및 필요한 라이브러리를 불러옵니다.
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './MainDownSlide.css';
// import img1 from '../../image/slide-show6.jpg';
// import img2 from '../../image/slide-show2.jpg';
// import img3 from '../../image/slide-show3.jpg';
// import img4 from '../../image/slide-show4.jpg';
// import img5 from '../../image/slide-show5.jpg';

// import img1 from 'https://kr.object.ncloudstorage.com/aaa-bucket-teamsos/main/MainDownSlide-money.jpeg';
// import img2 from 'https://kr.object.ncloudstorage.com/aaa-bucket-teamsos/main/MainDownSlide-honor.png';
// import img3 from 'https://kr.object.ncloudstorage.com/aaa-bucket-teamsos/main/MainDownSlide-time.jpeg';
// import img4 from 'https://kr.object.ncloudstorage.com/aaa-bucket-teamsos/main/MainDownSlide-love.webp';
// import img5 from 'https://kr.object.ncloudstorage.com/aaa-bucket-teamsos/main/MainDownSlide-hope.jpeg';




function MainDownSlide(props) {

    const m_photo = process.env.REACT_APP_MAIN;
    const img1 = `${m_photo}MainDownSlide-money.jpeg`;
    const img2 = `${m_photo}MainDownSlide-honor.png`;
    const img3 = `${m_photo}MainDownSlide-time.jpeg`;
    const img4 = `${m_photo}MainDownSlide-love.webp`;
    const img5 = `${m_photo}MainDownSlide-hope.jpeg`;


    // 이미지 URL들을 배열로 저장
    const urls = [
        img1,img2,img3,img4,img5
    ];

    // 각 이미지의 참조값을 저장하기 위한 useRef를 생성
    const itemsRef = useRef([]);

    // 이미지를 클릭했을 때 확장하는 함수를 정의
    const expand = (item, i) => {
        const items = itemsRef.current;

        // 클릭한 아이템 이외의 아이템은 원래 상태로 전환
        items.forEach((it, ind) => {
            if (i === ind) return;
            it.clicked = false;
        });

        // 클릭되지 않은 아이템들의 너비 줄이기
        gsap.to(items, {
            width: item.clicked ? '15vw' : '8vw',
            duration: 2,
            ease: 'elastic(1, .6)'
        });

        // 클릭 상태를 반전
        item.clicked = !item.clicked;

        // 클릭한 아이템의 너비 증가
        gsap.to(item, {
            width: item.clicked ? '42vw' : '15vw',
            duration: 2.5,
            ease: 'elastic(1, .3)'
        });
    }

    // 컴포넌트가 마운트될 때, 모든 아이템의 클릭 상태를 false로 설정
    useEffect(() => {
        const items = itemsRef.current;

        items.forEach((item, i) => {
            item.clicked = false;
        });
    }, []);

    return (
        // 이미지들을 반복적으로 출력합니다. 클릭 이벤트 리스너를 달고, 참조값을 저장합니다.
        <div className="MainDownSlideGroup">
            {urls.map((url, i) => (
                <div
                    key={i}
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
            ))}
        </div>
    );
}

export default MainDownSlide;
