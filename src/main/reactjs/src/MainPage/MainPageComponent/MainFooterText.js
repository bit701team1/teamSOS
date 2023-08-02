import React from 'react';
import './MainFooterText.css';

function MainFooterText(props) {
    return (
        <div className='main-footer-text'>
            <section className='footer-section'>
                <div className='footer-image' id='footer-container'>
                    <div className='content center'>
                        <h1 id='footer-header'>
                            <div>우리는 당신의</div>
                            <div id='footer-container-scroller'>
                                <div className='footer-text-item'>
                                    <p className='footer-text'>특별한 경험</p>
                                </div>
                                <div className='footer-text-item'>
                                    <p className='footer-text'>맛있는 음식</p>
                                </div>
                                <div className='footer-text-item'>
                                    <p className='footer-text'>갖고싶은 재능</p>
                                </div>
                                <div className='footer-text-item'>
                                    <p className='footer-text'>아름다운 미소</p>
                                </div>
                                <div className='footer-text-item'>
                                    <p className='footer-text'>소중한 기억</p>
                                </div>
                                <div className='footer-text-item'>
                                    <p className='footer-text'>영원한 추억</p>
                                </div>
                                <div className='footer-text-item'>
                                    <p className='footer-text'>멈추지 않는 심장</p>
                                </div>
                                <div className='footer-text-item'>
                                    <p className='footer-text'>당신의 애장품</p>
                                </div>
                                <div className='footer-text-item'>
                                    <p className='footer-text'>잊지못할 순간</p>
                                </div>
                                <div className='footer-text-item'>당신만의 스토리</div>
                            </div>
                            <div>에 가치를 부여합니다.</div>
                        </h1>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MainFooterText;
