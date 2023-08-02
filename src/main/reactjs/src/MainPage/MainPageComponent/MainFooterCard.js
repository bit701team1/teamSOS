import React, {useEffect, useRef} from 'react';
import {gsap} from 'gsap';
import {Flip} from 'gsap/Flip';
import './MainFooterCard.css';

gsap.registerPlugin(Flip);

function MainFooterCard(props) {
    const imageUrls = [
        "https://assets.codepen.io/756881/amys-1.jpg",
        "https://assets.codepen.io/756881/amys-2.jpg",
        "https://assets.codepen.io/756881/amys-3.jpg",
        "https://assets.codepen.io/756881/amys-4.jpg",
        "https://assets.codepen.io/756881/amys-5.jpg",
        "https://assets.codepen.io/756881/amys-6.jpg",
        "https://assets.codepen.io/756881/amys-7.jpg",
        "https://assets.codepen.io/756881/amys-5.jpg",
        "https://assets.codepen.io/756881/amys-6.jpg",
        "https://assets.codepen.io/756881/amys-7.jpg"
    ];

    const wheelRef = useRef(null);
    const headerRef = useRef(null);
    const arrowRef = useRef(null);
    let lastClickedCard = null;
    let isDragging = false;
    let currentRotation = 0;
    let initialDragPosition = 0;

    useEffect(() => {
        let wheel = wheelRef.current;
        let images = gsap.utils.toArray(".main-footer-card__wheel-card");
        let header = headerRef.current;

        gsap.to(arrowRef.current, {y: 5, ease: "power1.inOut", repeat: -1, yoyo: true});

        function setup() {
            let radius = wheel.offsetWidth / 2;
            let center = wheel.offsetWidth / 2;
            let total = images.length;
            let slice = (2 * Math.PI) / (total * 4);

            images.forEach((item, i) => {
                let angle = i * slice;

                let x = center + radius * Math.sin(angle);
                let y = center - radius * Math.cos(angle);

                gsap.set(item, {
                    rotation: angle + "_rad",
                    xPercent: -50,
                    yPercent: -50,
                    x: x,
                    y: y
                });
            });
        }

        setup();

        window.addEventListener("resize", setup);

        document.addEventListener("touchend", () => {
            if (isDragging) {
                isDragging = false;
            }
        });

        wheel.addEventListener("touchstart", (e) => {
            isDragging = true;
            initialDragPosition = e.touches[0].pageX;
            currentRotation = gsap.getProperty(wheel, "rotate");
        });

        wheel.addEventListener("touchmove", (e) => {
            if (isDragging) {
                let dragDistance = e.touches[0].pageX - initialDragPosition;
                let rotation = currentRotation - dragDistance;

                // 각도 제한을 적용
                const maxRotation = 1; // 최대 회전 각도 (15도)
                const minRotation = -80; // 최소 회전 각도 (-15도)

                // 회전 각도를 최대 및 최소 각도로 제한
                rotation = Math.max(Math.min(rotation, maxRotation), minRotation);

                gsap.set(wheel, {rotate: rotation});
            }
        });

        let cards = gsap.utils.toArray(".main-footer-card__wheel-card");

        cards.forEach((card) => {
            card.addEventListener("click", (e) => {
                if (lastClickedCard) {
                    putBack(e);
                }
                flip(e);
            });
        });

        header.addEventListener("click", (e) => {
            if (!lastClickedCard) return;
            putBack(e);
        });

        function putBack(e) {
            let image = header.querySelector("img");
            let state = Flip.getState(image);
            lastClickedCard.appendChild(image);
            Flip.from(state, {
                duration: 0.6,
                ease: "sine.out",
                absolute: true
            });
            lastClickedCard = null;
        }

        function flip(e) {
            let image = e.target.querySelector("img");
            if (!image) return;
            let state = Flip.getState(image);
            header.appendChild(image);
            Flip.from(state, {
                duration: 0.6,
                ease: "sine.out",
                absolute: true
            });
            lastClickedCard = e.target;
        }
    }, []);

    return (
        <div className='MainFooterCard'>
            <div ref={headerRef} className="main-footer-card__header">
            </div>
            <section className="main-footer-card__slider-section">
                <div ref={wheelRef} className="main-footer-card__wheel">
                    {imageUrls.map((url, index) => {
                        return (
                            <div className="main-footer-card__wheel-card" key={index}>
                                <img className="MainFooterCardImg" src={url} alt="img"/>
                            </div>
                        );
                    })}
                </div>
            </section>
            <div className="main-footer-card__scroll-down">
                <div ref={arrowRef} className="main-footer-card__arrow"></div>
                사용자 리뷰
            </div>
        </div>
    );
}

export default MainFooterCard;
