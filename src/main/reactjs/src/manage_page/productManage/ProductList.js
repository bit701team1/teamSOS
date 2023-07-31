import React, {useCallback, useEffect, useState} from 'react';
import '../../css/ManagePageCSS/productList.css';
import {useNavigate} from "react-router-dom";
import {FormControl, MenuItem, Select} from "@mui/material";
import ProductListRecent from "./ProductListRecent";
import ProductListOld from "./ProductListOld";
import ProductListPrice from "./ProductListPrice";
import axios from "axios";

function ProductList(props) {
    const k_photo=process.env.REACT_APP_MANAGE;
    const navi=useNavigate();

    const [productList, setProductList] = useState([]);
    const [searchProduct, setSearchProduct] = useState('');


    const handleBeforePage=()=>{
        window.history.back();
    };

    const [check, setCheck] = useState(1);

    const handleChange = (e) => {
        setCheck(Number(e.target.value));
    };

    const handleSearchChange=(e)=>{
        setSearchProduct(e.target.value);
    };

    const getProductList=useCallback((searchUrl)=>{
        const url = searchUrl + "?search=" + (searchProduct || '');
        axios.get(url)
            .then(res=>{
                setProductList(res.data)
            })
    },[searchProduct]);


    useEffect(() => {
        if (check === 1) {
            getProductList("/productlist/recentlist");
        } else if (check === 2) {
            getProductList("/productlist/oldlist");
        } else if (check === 3) {
            getProductList("/productlist/highpricelist");
        }
    }, [check, getProductList, searchProduct]);


    return (
        <div className="k_productlist_main">

            <div className="k_product_info">
                <img className="k-back-icon" alt="" src={`${k_photo}k_back_icon.svg`} onClick={handleBeforePage}/>
                <div className="k_info_title">낙찰 목록 관리</div>
            </div>

            <div className="k_product_selectbar">
                <FormControl variant="filled" className={'k_productlist_main_form'} fullWidth>
                    <Select
                        labelId="k_product_select_label"
                        id="k_product_select"
                        value={check}
                        label="check"
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>최신순</MenuItem>
                        <MenuItem value={2}>오래된순</MenuItem>
                        <MenuItem value={3}>낙찰 가격순</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className="k_product_searchbar">
                <div className="k_product_searchbar_box">
                    <input type={'text'} placeholder={'검색 할 상품을 입력하세요'}
                           onChange={handleSearchChange} value={searchProduct}
                           className="k_product_searchbar_input"></input>

                </div>
            </div>

            <div className="k_product_list">
                <div className={'k_product_list_show'}>
                    {
                        check===1?<ProductListRecent productList={productList}/>:
                            check===2?<ProductListOld productList={productList}/>:
                                <ProductListPrice productList={productList}/>
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductList;
