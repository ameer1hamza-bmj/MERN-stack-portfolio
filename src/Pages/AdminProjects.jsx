import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../Store/Auth'

const AdminProjects = () => {
  const [form, setForm] = useState({ heading: '', paragraph: '', link: '', image: '' })
  const { authorization, API } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'image') {
      setForm((prev) => ({ ...prev, image: e.target.files[0] }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('heading', form.heading)
    data.append('paragraph', form.paragraph)
    data.append('link', form.link)
    data.append('image', form.image)
    try {
      const res = await axios.post(`${API}/api/admin/projects/uploads`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: authorization,
        },

      })
      setForm({ heading: '', paragraph: '', link: '', image: '' })
      toast.success('Projects Uploaded SucessFully')
      console.log(res.data);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white/10 p-6 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-bold text-pink-300 mb-4 text-center">Upload Project</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Image Upload */}
        <div>
          <label className="block text-sm text-white/70 mb-1">Project Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="block w-full text-white text-sm file:py-1.5 file:px-3
              file:rounded-md file:border-0
              file:bg-pink-600 file:text-white
              hover:file:bg-pink-700 transition"
          />
        </div>

        {/* heading */}
        <div>
          <label className="block text-sm text-white/70 mb-1">heading</label>
          <input
            type="text"
            name="heading"
            value={form.heading}
            onChange={handleChange}
            placeholder="Project Title"
            className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-md text-sm focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>

        {/* paragraph */}
        <div>
          <label className="block text-sm text-white/70 mb-1">paragraph</label>
          <textarea
            name="paragraph"
            rows="3"
            value={form.paragraph}
            onChange={handleChange}
            placeholder="Short Description..."
            className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-md text-sm resize-none focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>

        {/* Link */}
        <div>
          <label className="block text-sm text-white/70 mb-1">Project Link</label>
          <input
            type="url"
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-md text-sm focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2 text-center">
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 px-5 py-2 rounded-md text-sm font-medium transition"
          >
            Upload Project
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminProjects
