import React from 'react';

const Spinner = () => {
	return (
		<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50'>
			<span className='loading loading-bars loading-lg'></span>
		</div>
	);
};

export default Spinner;
