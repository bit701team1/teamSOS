import React, {useEffect, useState} from 'react';
import productimg from '../k_manage_image/productimg.jpg';
import Axios from "axios";

function ProductListRecent({productList}) {


    // const [recentlist,setRecentlist]=useState([]);

    // const rlist=()=>{
    //     const recentlistUrl="/productlist/recentlist";
    //     Axios.get(recentlistUrl)
    //         .then(res=>{
    //             console.log("recentlist>>",res.data);
    //             setRecentlist(res.data);
    //         })
    // }
    //
    // useEffect(()=>{
    //     rlist();
    // },[]);

    return (
        <>
            {productList.map((product, index) => (
                <div className='k_product_list_box' style={{textAlign:'center'}} key={index}>
                    <img alt='상품사진' src={productimg} style={{width:'15rem', marginTop:'3rem'}}/>
                    <div className='k_product_list_detail' style={{marginTop:'1rem', fontSize:'1.5rem'}}>
                        상품이름 : {product.product_name}<br/>
                        낙찰자 : {product.winner}<br/>
                        낙찰가격 : {product.final_price}<br/>
                        상품날짜 : {product.transaction_date}
                    </div>
                </div>
            ))}
        </>
    );
}

export default ProductListRecent;

