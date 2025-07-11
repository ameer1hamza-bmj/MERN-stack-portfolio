import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../Store/Auth';
import { toast } from 'react-toastify';

const AdminUpdate = () => {
    const { id } = useParams();
    const { authorization,API } = useAuth()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: ''
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/admin/users/${id}`, {
                headers: {
                    Authorization: authorization
                }
            })
            const userData = res.data;
            if (!userData) {
                throw new Error('Failed to Fetch User Data')
            }
            console.log(userData);
            setFormData({
                username: userData.username,
                email: userData.email,
                phone: userData.phone
            })

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        if (id) fetchUsers();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { username, email, phone } = formData;
        if (!username || !email || !phone) {
            toast.error('Please fill all fields');
            return;
        }
        try {
            const res = await axios.patch(`${API}/api/admin/users/update/${id}`,
                formData,
                {
                    headers: {
                        Authorization: authorization,
                        'Content-Type': 'application/json'
                    },

                }
            )
            console.log('Updated Data:', res.data);
            toast.success('User Updated Successfully')

        } catch (error) {
            console.log(error);
        }


    }

    return (
        <div className="max-w-xl mx-auto bg-white/10 p-6 rounded-xl shadow-lg text-white">
            <h2 className="text-2xl font-bold text-pink-300 mb-6">Update User Info</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username */}
                <div>
                    <label className="block mb-1 text-sm text-white/70" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter username"
                        className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1 text-sm text-white/70" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                        className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="block mb-1 text-sm text-white/70" htmlFor="phone">
                        Phone
                    </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                        className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                </div>

                {/* Submit */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-medium transition-all"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AdminUpdate
