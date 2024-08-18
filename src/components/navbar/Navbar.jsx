import React from "react"
import useAuth from "../../hooks/useAuth"
import { Link } from "react-router-dom"

const Navbar = () => {
	const { logout, user } = useAuth()
	return (
		<div className='navbar bg-base-100'>
			<div className='flex-1'>
				<Link to='/'>
					<h1 className='font-bold text-4xl'>Specto</h1>
				</Link>
			</div>
			<div className='flex-none'>
				<div className='dropdown dropdown-end'>
					<div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
						<div className='w-10 rounded-full'>
							<img
								alt='Tailwind CSS Navbar component'
								src={user ? user?.photoURL : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
							/>
						</div>
					</div>
					<ul tabIndex={0} className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'>
						{user ? (
							<>
								<li>
									<a title={user?.displayName || "username not found"}>{user?.displayName}</a>
								</li>
								<li onClick={logout}>
									<a>Logout</a>
								</li>
							</>
						) : (
							<li>
								<Link to='/login'>Login</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Navbar
