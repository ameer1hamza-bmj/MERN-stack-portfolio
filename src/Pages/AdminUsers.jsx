import React from 'react'
import axios from 'axios'
import { useAuth } from '../Store/Auth'
import { Pencil, Trash2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const AdminUsers = () => {
  const { authorization, API } = useAuth()

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:3001/api/admin/users', {
      headers: { Authorization: authorization },
    })
    return res.data
  }

  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['admin-users'],
    queryFn: fetchUsers,
  })


  const handleDeleteUser = async (id) => {
    try {
      const res = await axios.delete(`${API}/api/admin/users/delete/${id}`, {
        headers: { Authorization: authorization },
      });
      console.log(res.data);
      toast.success('User Deleted SuccessFully')
      refetch();

    } catch (error) {
      console.log('Error from Server', error);

    }
  }






  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-pink-300 mb-6">Registered Users</h2>

      {/* Loader */}
      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="bg-red-500/10 text-red-300 p-4 rounded-lg text-center space-y-2">
          <p>Error: {error.message || 'Something went wrong!'}</p>
          <button
            onClick={refetch}
            className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md"
          >
            Retry
          </button>
        </div>
      )}

      {/* Table */}
      {!isLoading && !isError && (
        <div className="bg-white/10 rounded-xl shadow-lg p-4 overflow-x-auto">
          <table className="w-full text-sm text-left table-auto whitespace-nowrap">
            <thead className="border-b border-white/10 text-pink-200">
              <tr>
                <th className="py-3 px-2">Username</th>
                <th className="py-3 px-2">Email</th>
                <th className="py-3 px-2">Phone</th>
                <th className="py-3 px-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-white/90">
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="border-b border-white/5 hover:bg-white/5 transition-all"
                >
                  <td className="px-2 py-3">{u.username}</td>
                  <td className="px-2 py-3">{u.email}</td>
                  <td className="px-2 py-3">{u.phone}</td>
                  <td className="px-2 py-3">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/users/${u._id}/edit`}
                        className="bg-purple-600 hover:bg-purple-700 p-2 rounded-md"

                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="bg-red-600 hover:bg-red-700 p-2 rounded-md"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!users.length && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-6 text-center text-white/60"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminUsers
