import React from 'react';

function ProductListRecent({productList}) {

    return (
        <>
            {productList.map((product, index) => (
                <div className='k_product_list_box' style={{textAlign:'center'}} key={index}>
                    <img alt='상품사진' src={''} style={{width:'15rem', marginTop:'3rem'}}/>
                    <div className='k_product_list_detail' style={{marginTop:'0.5rem', fontSize:'1.4rem'}}>
                        상품이름 : {product.product_name}<br/>
                    </div>
                    <div className='k_product_list_detail' style={{marginTop:'0.3rem', fontSize:'1.2rem'}}>
                        낙찰자 : {product.winner}<br/>
                    </div>
                    <div className='k_product_list_detail' style={{marginTop:'0.5rem', fontSize:'0.9rem'}}>
                        낙찰가격 : {product.final_price}<br/>
                    </div>
                    <div className='k_product_list_detail' style={{marginTop:'0.5rem', fontSize:'0.9rem'}}>
                        낙찰 일자 : {product.transaction_date}
                    </div>
                </div>
            ))}
        </>
    );
}

export default ProductListRecent;

