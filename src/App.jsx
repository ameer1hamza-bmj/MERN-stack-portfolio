import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Services from './Pages/Services'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Layout from './Layout/Layout'
import ErrorPage from './Pages/ErrorPage'
import Projects from './Pages/Projects'
import Logout from './Pages/Logout'
import AdminUsers from './Pages/AdminUsers'
import AdminContacts from './Pages/AdminContacts'
import AdminProjects from './Pages/AdminProjects'
import AdminLayout from './Layout/AdminLayout'
import AdminUpdate from './Pages/AdminUpdate'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/about',
                element: <About />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/projects',
                element: <Projects />,
                errorElement: <ErrorPage />
            },
            {
                path: '/contact',
                element: <Contact />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/services',
                element: <Services />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/register',
                element: <Register />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/login',
                element: <Login />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/logout',
                element: <Logout />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/admin',
                errorElement: <ErrorPage />,
                element: <AdminLayout />,
                children: [
                    {
                        path: 'Users',
                        element: <AdminUsers />,
                        errorElement: <ErrorPage />,
                    },
                    {
                        path: 'users/:id/edit',
                        element: <AdminUpdate />,
                        errorElement: <ErrorPage />,
                    },
                    {
                        path: 'Contacts',
                        element: <AdminContacts />,
                        errorElement: <ErrorPage />,
                    },
                    {
                        path: 'Projects',
                        element: <AdminProjects />,
                        errorElement: <ErrorPage />,
                    },
                ]
            }

        ]
    }
])

const App = () => {
    return <RouterProvider router={router} />
}

export default App
