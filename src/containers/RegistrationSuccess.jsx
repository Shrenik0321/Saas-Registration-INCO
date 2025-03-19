import { useNavigate } from "react-router-dom";

export default function RegistrationSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">
        {/* <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" /> */}
        <h2 className="text-2xl font-bold text-gray-800">
          Registration Successful!
        </h2>
        <p className="text-gray-600 mt-2">
          Your account has been created successfully. You can now log in and
          start using our services.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-600 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
