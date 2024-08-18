import { FcGoogle } from "react-icons/fc"
import { useLocation, useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const SocialLogin = () => {
	const { googleSignIn, githubSignIn } = useAuth()

	// navigation system
	const navigate = useNavigate()
	const location = useLocation()
	const navigateFrom = location?.state || "/"

	const handleSocialSignIn = (socialProvider) => {
		socialProvider().then((result) => {
			if (result.user) {
				navigate(navigateFrom)
			}
		})
	}
	return (
		<div className='flex justify-center space-x-4'>
			<FcGoogle
				onClick={() => handleSocialSignIn(googleSignIn)}
				className='text-2xl hover:scale-110 transform transition-all duration-500 cursor-pointer'
			/>
		</div>
	)
}

export default SocialLogin
