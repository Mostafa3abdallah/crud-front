import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"

function ProductEdit() {
    const [id, setId] = useState(useParams().id)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)
    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate();

    const imageHandler = (event) => {
        setImage(event.target.files[0]);
    };

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
                let Product = response.data.product;
                setTitle(Product.title);
                setDescription(Product.description);
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })

    }, [])


    const handleSave = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('title', title);
        formData.append('description', description);
        if (image !== null) {
            formData.append('image', image);
        }

        setIsSaving(true);
        await axiosInstance.post(`/api/products/${id}`, formData)
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Product updated successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false)
            });
    }


    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Edit Product</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/dashboard">View All Products
                        </Link>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSave}>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    onChange={(event) => { setTitle(event.target.value) }}
                                    value={title}
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(event) => { setDescription(event.target.value) }}
                                    className="form-control"
                                    id="description"
                                    rows="3"
                                    name="description"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Image</label>
                                <input
                                    onChange={imageHandler}
                                    type="file"
                                    className="form-control"
                                    id="file"
                                    name="file" />
                            </div>
                            <button
                                disabled={isSaving}
                                type="submit"
                                className="btn btn-outline-success mt-3">
                                Update Product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProductEdit;