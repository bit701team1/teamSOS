import React from 'react';
import s1 from '../k_manage_image/s72.jpg';

function ProductListOld({productList}) {

    return (
        <>
            {productList.map((product, index) => (
                <div className='k_product_list_box' style={{textAlign:'center'}} key={index}>
                    <img className={'k_product_img'} alt='product' src={s1}/>
                    <div className='k_product_list_detail_name'>
                         {product.product_name}<br/>
                    </div>
                    <div className='k_product_list_detail_winner'>
                        낙찰자 : {product.winner}<br/>
                    </div>
                    <div className='k_product_list_detail_price'>
                        $ {product.final_price}<br/>
                    </div>
                    <div className='k_product_list_detail_date' >
                         {product.transaction_date}
                    </div>
                </div>
            ))}
        </>
    );
}

export default ProductListOld;