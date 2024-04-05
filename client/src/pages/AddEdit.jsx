import React, { useState, useEffect } from 'react'
import { redirect, useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"
import axios from 'axios';
import "./AddEdit.css"


const initialState = {
    name: "",
    email: "",
    contact: "",
};

const AddEdit = () => {

    const [state, setState] = useState(initialState)
    const { name, email, contact, } = state;
    const navigate = useNavigate();
    // const history = useHistory()

    const { id } = useParams()
    useEffect(() => {
        if (id) {
            getSingleUser(id)
        }
    }, [id])


    const getSingleUser = async () => {
        const response = await axios.get(`http://localhost:5000/api/users/${id}`);

        if (response.status === 200) {
            setState({ ...response.data[0] })
        }
    }

    const addUser = async (data) => {
        const response = await axios.post("http://localhost:5000/api/users", data);
        if (response.status === 200) {
            toast.success(response.data);
            // console.log(response.data);
            navigate("/");
        }

    }
    const updateUser = async (data, id) => {
        const response = await axios.put(`http://localhost:5000/api/users/${id}`, data);
        if (response.status === 200) {
            toast.success(response.data);
            navigate("/");
            // redirect("/")
        }

    }
    const handeSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !contact) {
            toast.error("Please provide value into each field");
        }
        else {
            if (!id) {

                addUser(state);
            }
            else {
                updateUser(state, id)
            }
            // history.push("/")
        }
        redirect("/")

    }
    const handleInputChange = (e) => {
        let { name, value } = e.target
        setState({ ...state, [name]: value })
    };
    return (
        <div style={{ marginTop: "100px" }}>
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}
                onSubmit={handeSubmit}
            >

                <label htmlFor='name'>Name</label>
                <input
                    type="text"
                    id='name'
                    name='name'
                    placeholder='Enter name....'
                    onChange={handleInputChange}
                    value={name}
                />
                <label htmlFor='email'>Email</label>
                <input
                    type="email"
                    id='email'
                    name='email'
                    placeholder='Enter Email....'
                    onChange={handleInputChange}
                    value={email}
                />
                <label htmlFor='contact'>Contact</label>
                <input
                    type="number"
                    id='contact'
                    name='contact'
                    placeholder='Enter contact....'
                    onChange={handleInputChange}
                    value={contact}
                />
                <input type="submit" value={id ? "Update" : "Add"} />
            </form>
        </div>
    )
}

export default AddEdit
