import React from 'react';
import s1 from '../k_manage_image/s72.jpg';

function ProductListOld({productList}) {

    const k_photo=process.env.REACT_APP_MANAGE;

    const k_productimg=process.env.REACT_APP_Product;


    return (
        <>
            {productList.map((product, index) => (
                <div className='k_product_list_box'  key={index}>
                    <div className={'k_product_img_box'}>
                        <img className={'k_product_img'} alt='상품' src={`${k_productimg}${product.product_photo}`}/>
                    </div>
                    <div className={'k_product_list_detail_box'}>
                        <div className='k_product_list_detail_name'>
                            {product.product_name}
                        </div>
                        <div className='k_product_list_detail_winner'>
                            낙찰자 : {product.winner}
                        </div>
                        <div className='k_product_list_detail_date' >
                            <div className={'k_product_list_detail_text'}>
                                {product.transaction_date}
                            </div>
                        </div>
                        <div className='k_product_list_detail_price'>
                            ₩ {Number(product.final_price).toLocaleString('ko-KR')}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default ProductListOld;