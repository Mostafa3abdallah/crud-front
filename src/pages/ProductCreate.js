import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"


function ProductCreate() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [image, setImage] = useState()
    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate();

    const imageHandler = (event) => {
        setImage(event.target.files[0]);
    };

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/");
        }
    }, [])

    const token = localStorage.getItem('token');
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        }
    });

    const createProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);

        setIsSaving(true);
        await axiosInstance.post('/api/products', formData)
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Product saved successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
                setTitle('')
                setDescription('')
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
                <h2 className="text-center mt-5 mb-3">Create New Product</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/dashboard">View All Products
                        </Link>
                    </div>
                    <div className="card-body">
                        <form onSubmit={createProduct}>
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
                                className="btn btn-outline-primary mt-3">
                                Save Product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProductCreate;