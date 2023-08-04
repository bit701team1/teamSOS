import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import './Intro.css';
import OneDots from "../ImageTest/SlidePageOne-Icon.svg";
import TwoDots from "../ImageTest/SlidePageTwo-Icon.svg";
import ThreeDots from "../ImageTest/SlidePageThree-Icon.svg";
import OneSlideArrow from "../ImageTest/SlidePageOne-Arrow.svg";

function SlideTest(props) {

    const [section, setSection] = useState('a');
    const navigate = useNavigate();

    const split_photo = process.env.REACT_APP_BUCKET;
    const splitImgOne = `${split_photo}/intro/split-item-1.png`;
    const splitImgTwo = `${split_photo}/intro/split-item-2.png`;
    const splitImgThree = `${split_photo}/intro/split-item-3.png`;

    const goToNextSection = () => {
        if (section === 'a') setSection('b');
        else if (section === 'b') setSection('c');
        else if (section === 'c') navigate('/login');
    };

    return (
        <div className="slide-container">
            <div className={`SlideTestPageOne ${section === 'a' ? 'active' : ''}`}>
                <div className="SlideTestOnePageFrame">
                    <img alt='SplitPageImageOne' src={splitImgOne}/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300" fill="none">
                        <path d="M200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100V300H200V100Z"
                              fill="#D9D9D9"/>
                    </svg>
                </div>
                <h1>경매 어렵지 않아요</h1>
                <span>
                    간편한 절차, 온라인 채팅으로 <br/>
                    언제 어디서 참여해보세요.
                </span>
                <img className="OneDot" alt="dots" src={OneDots}/>
                <img className="OneArrow" alt="arrow" src={OneSlideArrow} onClick={goToNextSection}/>
            </div>

            <div className={`SlideTestPageTwo ${section === 'b' ? 'active' : ''}`}>
                <div className="SlideTestTwoPageFrame">
                    <img alt='SplitPageImageOne' src={splitImgTwo}/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300" fill="none">
                        <path
                            d="M200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100V150C0 232.843 67.1573 300 150 300H200V100Z"
                            fill="#2B2B2B"/>
                    </svg>
                </div>
                <h1>나만의 특별한 경험</h1>
                <span>
                    세상 단 하나뿐인 상품에 대한<br/>
                    가치를 경험해 보세요.
                </span>
                <img className="TwoDot" alt="dots" src={TwoDots}/>
                <img className="TwoArrow" alt="arrow" src={OneSlideArrow} onClick={goToNextSection}/>
            </div>

            <div className={`SlideTestPageThree ${section === 'c' ? 'active' : ''}`}>
                <div className="SlideTestThreePageFrame">
                    <img alt='SplitPageImageOne' src={splitImgThree}/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="297" viewBox="0 0 200 297" fill="none">
                        <path
                            d="M100 0C155.228 0 200 44.7715 200 100V200H199.956C198.37 253.841 154.225 297 100 297C45.775 297 1.63048 253.841 0.0441397 200H0V100C0 44.7715 44.7715 0 100 0Z"
                            fill="#B24C4B"/>
                    </svg>
                </div>
                <h1>지금 바로 시작하세요</h1>
                <span>
                    입찰 경쟁과 낙찰의 순간까지<br/>
                    경매의 재미를 느껴보세요.
                </span>
                <img className="ThreeDot" alt="dots" src={ThreeDots}/>
                <img className="ThreeArrow" alt="arrow" src={OneSlideArrow} onClick={goToNextSection}/>
            </div>
        </div>
    );
}

export default SlideTest;
