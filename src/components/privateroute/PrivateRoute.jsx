import { Navigate, useLocation } from "react-router-dom"
import Spinner from "../spinner/Spinner"
import useAuth from "../../hooks/useAuth"

const PrivateRoute = ({ children }) => {
	const { user, loading } = useAuth()
	const location = useLocation()

	if (loading) {
		return <Spinner />
	}

	if (!user) {
		return <Navigate to='/login' state={location?.pathname || "/"} />
	}
	return <div>{children}</div>
}

export default PrivateRoute
