// components/ToastContainer.js
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastWrapper = () => (
	<ToastContainer
		position='top-center'
		autoClose={1000}
		hideProgressBar={true}
		newestOnTop={false}
		closeOnClick
		rtl={false}
		pauseOnFocusLoss
		draggable
		pauseOnHover
	/>
);

export default ToastWrapper;
