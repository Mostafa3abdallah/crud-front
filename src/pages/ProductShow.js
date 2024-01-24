import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import Layout from "../components/Layout"


function ProductShow() {
    const navigate = useNavigate();
    const [id, setId] = useState(useParams().id)
    const [Product, setProduct] = useState({ title: '', description: '', title: '' })

    const token = localStorage.getItem('token');
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        }
    });

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/");
        }

        axiosInstance.get(`/api/products/${id}`)
            .then(function (response) {
                setProduct(response.data.product)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Show Product</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/dashboard"> View All Products
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">Title:</b>
                        <p>{Product.title}</p>
                        <b className="text-muted">Description:</b>
                        <p>{Product.description}</p>
                        <b className="text-muted">Image:</b>
                        <p><img width="50px" src={`http://localhost:8000/storage/product/image/${Product.image}`} /></p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProductShow;