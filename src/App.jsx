// src/App.jsx
import React from 'react';
import AppRouter from './routes';
import ToastWrapper from '../src/components/ToastWrapper';

const App = () => {
	return (
		<div className=''>
			<ToastWrapper />
			<AppRouter />
		</div>
	);
};

export default App;
