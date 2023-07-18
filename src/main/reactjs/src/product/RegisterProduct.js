import React, { useState } from 'react';
import Axios from 'axios';
import {useNavigate} from "react-router-dom";

function RegisterProduct(props) {
    const [product_name, setProductName] = useState('');
    const [transaction_date, setTransactionDate] = useState('');
    const [description, setDescription] = useState('');
    const [winner, setWinner] = useState('');
    const [final_price, setFinalPrice] = useState('');

    const navi=useNavigate();

    const onSubmitEvent = (e) => {
        e.preventDefault();
        const productData = {
            product_name: product_name,
            transaction_date: transaction_date,
            description: description,
            winner: winner,
            final_price: final_price
        };

        Axios.post("/product/insert", productData)
            .then(res => {
                // 처리 완료 후 수행할 작업
                navi("/")
            })
            .catch(err => {
                // 오류 처리
            });
    }

    return (
        <div>
            <form onSubmit={onSubmitEvent}>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <label>Product Name:</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                value={product_name}
                                onChange={e => setProductName(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Transaction Date:</label>
                        </td>
                        <td>
                            <input
                                type="date"
                                value={transaction_date}
                                onChange={e => setTransactionDate(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Description:</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Winner:</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                value={winner}
                                onChange={e => setWinner(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Final Price:</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                value={final_price}
                                onChange={e => setFinalPrice(e.target.value)}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>

                <button type="submit">상품등록</button>
            </form>
        </div>
    );
}

export default RegisterProduct;
