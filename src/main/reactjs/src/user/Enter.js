import React, {useEffect} from 'react';
import gsap from 'gsap'; // gsap 라이브러리 import
import './Enter.css';
import {useNavigate} from "react-router-dom";
//import EnterLogo from "../image/EnterPage-Logo.png";

function Enter(props) {

    const navi = useNavigate();
    const EnterLogo = "https://kr.object.ncloudstorage.com/aaa-bucket-teamsos/intro/EnterPage-Logo.png";

    // 애니메이션 옵션 설정
    const animationOptions = {
        ease: 'expo.inOut'
    }

    // Intro 섹션 애니메이션 함수
    const introAnimation = () => {
        const tl = gsap.timeline({
            defaults: {
                ease: animationOptions.ease,
                duration: 1,
            }
        });

        tl.to('.OpeningSectionTitle', {
            duration: 1.5,
            y: 0,
            autoAlpha: 1,
            delay: 0.5,
        })
            .to('.OpeningSectionBackground--left, .OpeningSectionBackground--right', {
                scaleX: 1,
            })
            .to('.OpeningSectionBackground--left, .OpeningSectionBackground--right', {
                scaleY: 0,
                transformOrigin: 'top center',
            })
            .to('.OpeningSectionTitle', {
                duration: 1.5,
                y: -60,
                autoAlpha: 0,
            }, '-=0.6')
            .to('.IntroPage', {
                y: '-100%',
            }, '-=0.5')

        return tl;
    }

    // 요소들을 서서히 나타나게 하는 애니메이션 함수
    const fadeInElements = elements => {
        const tl = gsap.timeline();

        tl.from(elements, {
            duration: 1,
            ease: animationOptions.ease,
            y: '20px',
            autoAlpha: 0,
            stagger: 0.1,
        })

        return tl;
    }

    useEffect(() => {
        // 메인 타임라인 설정
        const master = gsap.timeline({
            paused: false,
            delay: 0.2,
        });

        // 애니메이션 추가
        master
            .add(introAnimation()) // Intro 섹션 애니메이션
    }, []);

    const handleLoginClick = ()=>{
        navi("/login");
    }

    const handleJoinClick = ()=>{
        navi("/join");
    }

    return (
        <div className="IntroPage">
            {/* Intro 섹션: 페이지 진입 시 화면에 표시되는 부분 */}
            <section className="OpeningSection">
                {/* Intro 섹션 제목 */}
                <h1 className="OpeningSectionTitle hidden">
                    <span>
                        세상의 모든 것에<br/>
                        가치를 부여하다
                    </span>
                </h1>
                {/* Intro 섹션 배경 요소 */}
                <div className="OpeningSectionBackground OpeningSectionBackground--left"></div>
                <div className="OpeningSectionBackground OpeningSectionBackground--right"></div>
            </section>

            {/* 입장페이지 섹션: 페이지의 주요 콘텐츠를 보여주는 부분 */}
            <section className="OpeningEnterSection">
                <div className="OpeningEnterPage">
                    <img alt="MainLogo" src={EnterLogo}/>

                    <div className="EnterLoginButton pulse-button" onClick={handleLoginClick}>
                        <span className="EnterLoginButtonText">Login</span>
                    </div>

                    <div className="EnterSignUpButton" onClick={handleJoinClick}>
                        <span className="EnterSignUpButtonText">SignUp</span>
                    </div>

                </div>
            </section>
        </div>
    );
}

export default Enter;