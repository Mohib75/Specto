import React from "react"
import { CiStar } from "react-icons/ci"

const ProductCard = ({ product }) => {
	const { product_name, product_image, description, price, category, ratings, product_creation_date, brand } = product
	return (
		<div className='card sm:w-96 bg-base-100 p-6 border-[1px] border-[#13131326] border-solid rounded-2xl'>
			<figure className='w-full bg-[#F3F3F3] py-4 rounded-xl h-[230px]'>
				<div className='w-60'>
					<img src={product_image} alt='Shoes' className='w-full h-full object-cover' />
				</div>
			</figure>

			<div className='card-body p-0 mt-4'>
				<h2 className='card-title text-2xl font-bold text-black leading-8'>{product_name}</h2>
				<p className='text-[#131313CC] font-medium leading-5 mt-2'>{description}</p>
				<hr className='w-full border-[1px] border-dashed border-[#13131326] mt-4' />
				<div className='flex justify-between items-center'>
					<p className='text-[#131313CC] font-medium leading-5'>{category}</p>
					<div className='flex gap-2 items-center'>
						<p className='text-[#131313CC] font-medium leading-5'>{ratings}</p>
						<CiStar />
					</div>
				</div>
				<div className='flex justify-between items-center'>
					<p className='text-[#131313CC] font-medium leading-5'>{brand}</p>
					<p className='text-[#131313CC] font-medium leading-5 text-right'>$ {price}</p>
				</div>
				<p className='text-[#131313CC] font-medium leading-5 mt-2'>{product_creation_date}</p>
			</div>
		</div>
	)
}

export default ProductCard
