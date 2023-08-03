import React, { useEffect, useState, useCallback } from 'react';
import Splitting from 'splitting';
import './MainAuctionItem.css';

function MainAuctionItem({imgSrc, title, description}) {
    const [active, setActive] = useState(false);

    const handleClick = useCallback(() => {
        setActive(prevState => !prevState);
    }, []);

    useEffect(() => {
        Splitting();
    }, []);

    return (
        <div id="MainAuctionItem">
            <div
                className={`AuctionCard ${active ? 'active' : ''}`}
                tabIndex="0"
                onClick={handleClick}
            >
                <img className='AuctionCardImg' src={imgSrc} alt='auction-img' />

                <div className="AuctionText">
                    <h2 data-splitting="">{title}</h2>
                    <p data-splitting="">{description}</p>
                </div>
            </div>
        </div>
    );
}

export default MainAuctionItem;
