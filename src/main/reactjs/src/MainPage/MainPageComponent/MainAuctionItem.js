import React, { useEffect } from 'react';
import Splitting from 'splitting';
import './MainAuctionItem.css';

function MainAuctionItem({imgSrc, altText, title, description}) {

    useEffect(() => {
        Splitting();
    }, []);

    return (
        <div id="mainAuctionSection">
            <div className="AuctionCard" tabIndex="0">
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
