import React from 'react'
import axios from 'axios'
import { useAuth } from '../Store/Auth'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const AdminContacts = () => {
  const { authorization, API } = useAuth()

  // Fetch contacts
  const fetchContacts = async () => {
    const res = await axios.get(`${API}/api/admin/contacts`, {
      headers: { Authorization: authorization }
    })
    return res.data
  }

  const {
    data: contacts = [],
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['admin-contacts'],
    queryFn: fetchContacts
  })



  const handleDeleteContact = async (id) => {
    try {
      const res = await axios.delete(`${API}/api/admin/contacts/delete/${id}`,
        {
          headers: { Authorization: authorization }
        }
      );
      console.log(res.data);
      toast.success('Contact Deleted SuccessFully')
      refetch()

    } catch (error) {
      console.log('Error from Server', error);

    }
  }



  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-pink-300 mb-6">Contacts</h2>

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

      {/* Contacts list */}
      {!isLoading && !isError && (
        <div className="space-y-4">
          {contacts.length === 0 ? (
            <p className="text-white/60 text-center">No contact messages found.</p>
          ) : (
            contacts.map((c) => (
              <div
                key={c._id}
                className="bg-white/10 p-4 rounded-xl flex flex-col md:flex-row justify-between md:items-center gap-4"
              >
                <div className="space-y-1">
                  <p>
                    <span className="font-semibold text-pink-300">{c.username || 'Anonymous'}</span>{' '}
                    <span className="text-white/70">({c.email})</span>
                  </p>
                  <p className="text-white/90">{c.message}</p>
                </div>
                <button
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm self-start md:self-auto"
                  onClick={() => handleDeleteContact(c._id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default AdminContacts
