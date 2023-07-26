import React, {useState} from 'react';
import './Intro.css';
import OneDots from "../ImageTest/SlidePageOne-Icon.svg";
import TwoDots from "../ImageTest/SlidePageTwo-Icon.svg";
import ThreeDots from "../ImageTest/SlidePageThree-Icon.svg";
import OneSlideArrow from "../ImageTest/SlidePageOne-Arrow.svg";

function SlideTest(props) {

    const [section, setSection] = useState('a');

    const goToNextSection = () => {
        if (section === 'a') setSection('b');
        else if (section === 'b') setSection('c');
        else if (section === 'c') setSection('a');
    };

    return (
        <div className="slide-container">
            <div className={`SlideTestPageOne ${section === 'a' ? 'active' : ''}`}>
                <div className="SlideTestOnePageFrame">
                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300" fill="none">
                        <path d="M200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100V300H200V100Z"
                              fill="#D9D9D9"/>
                    </svg>
                </div>
                <h1>경매 어렵지 않아요</h1>
                <span>
                    경매라고 하면 너무 어렵게 생각하는데
                    누구나 쉽게 참여 할 수 있습니다.
                </span>
                <img className="OneDot" alt="dots" src={OneDots}/>
                <img className="OneArrow" alt="arrow" src={OneSlideArrow} onClick={goToNextSection}/>
            </div>

            <div className={`SlideTestPageTwo ${section === 'b' ? 'active' : ''}`}>
                <div className="SlideTestTwoPageFrame">
                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300" fill="none">
                        <path
                            d="M200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100V150C0 232.843 67.1573 300 150 300H200V100Z"
                            fill="#2B2B2B"/>
                    </svg>
                </div>
                <h1>영감을 얻어 보세요</h1>
                <span>
                    수많은 이용자들 이야기가 담긴
                    특별한 상품을 만나보세요.
                </span>
                <img className="TwoDot" alt="dots" src={TwoDots}/>
                <img className="TwoArrow" alt="arrow" src={OneSlideArrow} onClick={goToNextSection}/>
            </div>

            <div className={`SlideTestPageThree ${section === 'c' ? 'active' : ''}`}>
                <div className="SlideTestThreePageFrame">
                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="297" viewBox="0 0 200 297" fill="none">
                        <path
                            d="M100 0C155.228 0 200 44.7715 200 100V200H199.956C198.37 253.841 154.225 297 100 297C45.775 297 1.63048 253.841 0.0441397 200H0V100C0 44.7715 44.7715 0 100 0Z"
                            fill="#B24C4B"/>
                    </svg>
                </div>
                <h1>경쟁에서 승리하세요</h1>
                <span>
                    경매 참여하고 이용자들과 대화하며
                    의견을 나누고 원하는 상품을 쟁취하세요.
                </span>
                <img className="ThreeDot" alt="dots" src={ThreeDots}/>
                <img className="ThreeArrow" alt="arrow" src={OneSlideArrow} onClick={goToNextSection}/>
            </div>
        </div>
    );
}

export default SlideTest;
