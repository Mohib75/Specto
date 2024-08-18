import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layout/MainLayout"
import ErrorPage from "../components/errorpage/ErrorPage"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import PrivateRoute from "../components/privateroute/PrivateRoute"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: (
					<PrivateRoute>
						<Home />
					</PrivateRoute>
				),
				loader: () => fetch("https://specto-server.vercel.app/products"),
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
		],
	},
])
