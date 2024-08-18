import React, { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import ProductCard from "../components/productcard/ProductCard"

const Home = () => {
	const loadedProduct = useLoaderData()
	console.log(loadedProduct)

	// Extract categories and remove duplicates
	const uniqueCategories = Array.from(new Set(loadedProduct.map((product) => product.category)))
	const uniqueBrands = Array.from(new Set(loadedProduct.map((product) => product.brand)))

	// State to manage selected category, brand, sorting, and pagination
	const [allProducts, setAllProducts] = useState(loadedProduct) // To store all products
	const [selectedCategory, setSelectedCategory] = useState("")
	const [selectedBrand, setSelectedBrand] = useState("")
	const [sortOption, setSortOption] = useState("")
	const [minPrice, setMinPrice] = useState("")
	const [maxPrice, setMaxPrice] = useState("")
	const [searchTerm, setSearchTerm] = useState("")
	const [currentPage, setCurrentPage] = useState(0)
	const [itemsPerPage, setItemsPerPage] = useState(10)

	// Filter products based on selected category, brand, price range, and search term
	const filteredProducts = allProducts.filter((product) => {
		const isCategoryMatch = selectedCategory === "" || product.category === selectedCategory
		const isBrandMatch = selectedBrand === "" || product.brand === selectedBrand
		const isMinPriceMatch = minPrice === "" || product.price >= parseFloat(minPrice)
		const isMaxPriceMatch = maxPrice === "" || product.price <= parseFloat(maxPrice)
		const isSearchMatch = searchTerm === "" || product.product_name.toLowerCase().includes(searchTerm.toLowerCase())

		return isCategoryMatch && isBrandMatch && isMinPriceMatch && isMaxPriceMatch && isSearchMatch
	})

	// Sort products based on selected sorting option
	if (sortOption === "Price: Low to High") {
		filteredProducts.sort((a, b) => a.price - b.price)
	} else if (sortOption === "Price: High to Low") {
		filteredProducts.sort((a, b) => b.price - a.price)
	} else if (sortOption === "Date: Newest First") {
		filteredProducts.sort((a, b) => new Date(b.product_creation_date) - new Date(a.product_creation_date)) // Sorts in descending order by date
	}

	// Pagination logic
	const startIndex = currentPage * itemsPerPage
	const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)
	const numberOfPages = Math.ceil(filteredProducts.length / itemsPerPage)
	const pages = [...Array(numberOfPages).keys()]

	const handlePrevPage = () => {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 1)
		}
	}

	const handleNextPage = () => {
		if (currentPage < pages.length - 1) {
			setCurrentPage(currentPage + 1)
		}
	}

	return (
		<div className='flex flex-col mt-6'>
			{/* searchbox */}
			<div className='flex rounded-full border-2 border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]'>
				<input
					type='text'
					placeholder='Search Here...'
					className='w-full outline-none bg-white text-sm px-5 py-3'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<button type='button' className='flex items-center justify-center bg-blue-500 hover:bg-blue-600 px-6'>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192.904 192.904' width='18px' className='fill-white'>
						<path d='m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z'></path>
					</svg>
				</button>
			</div>

			{/* all filtering */}
			<div className='flex gap-8 items-center justify-between mt-8 overflow-x-auto mx-2'>
				<select
					className='select select-primary w-60 max-w-xs focus:outline-none'
					onChange={(e) => setSelectedCategory(e.target.value)}
					value={selectedCategory}>
					<option value=''>All Categories</option>
					{uniqueCategories.map((category, index) => (
						<option key={index} value={category}>
							{category}
						</option>
					))}
				</select>

				<select
					className='select select-primary w-60 max-w-xs focus:outline-none'
					onChange={(e) => setSelectedBrand(e.target.value)}
					value={selectedBrand}>
					<option value=''>All Brands</option>
					{uniqueBrands.map((brand, index) => (
						<option key={index} value={brand}>
							{brand}
						</option>
					))}
				</select>

				<input
					type='text'
					placeholder='Min Price'
					className='input input-bordered input-primary w-60 max-w-xs focus:outline-none'
					value={minPrice}
					onChange={(e) => setMinPrice(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Max Price'
					className='input input-bordered input-primary w-60 max-w-xs focus:outline-none'
					value={maxPrice}
					onChange={(e) => setMaxPrice(e.target.value)}
				/>

				<select
					className='select select-primary w-60 max-w-xs focus:outline-none'
					onChange={(e) => setSortOption(e.target.value)}
					value={sortOption}>
					<option value=''>Sort By All</option>
					<option value='Price: Low to High'>Price: Low to High</option>
					<option value='Price: High to Low'>Price: High to Low</option>
					<option value='Date: Newest First'>Date: Newest First</option>
				</select>
			</div>

			{/* products show */}
			<div className='mt-12 self-center'>
				<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-4 mx-6 sm:mx-0'>
					{paginatedProducts && paginatedProducts.map((product, index) => <ProductCard key={index} product={product} />)}
				</div>
			</div>

			{/* pagination */}
			<div className='join self-center mt-8'>
				<button className='join-item btn' onClick={handlePrevPage}>
					«
				</button>
				{pages.map((page, index) => (
					<button
						onClick={() => setCurrentPage(page)}
						key={index}
						className={currentPage === page ? "bg-[#878495] join-item btn text-white" : "join-item btn"}>
						{page + 1}
					</button>
				))}
				<button className='join-item btn' onClick={handleNextPage}>
					»
				</button>
			</div>
		</div>
	)
}

export default Home
