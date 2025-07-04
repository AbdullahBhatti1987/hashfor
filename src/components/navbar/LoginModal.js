"use client";
import Modal from "./Modal";
import Loader from "../loader";
export default function LoginModal({ 
  isOpen, 
  onClose, 
  formData, 
  onFormChange, 
  onSubmit,
  onSwitchToSignup, 
  onForgotPassword,
  isLoading 
}) {

 const handleSubmit = async (e) => {
    e.preventDefault();
    onClose(); 
    await onSubmit(e);
  };

  return (
    <>
      {isLoading && (
       <Loader />
      )}
      
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-center text-yellow-400">Login</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">User ID</label>
              <input
                type="text"
                name="userID"
                value={formData.userID}
                onChange={onFormChange}
                placeholder="Enter your User ID"
                className="w-full p-2 rounded bg-[#272727] text-white border border-gray-400 focus:border-yellow-400 focus:outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={onFormChange}
                placeholder="Enter Your Password"
                className="w-full p-2 rounded bg-[#272727] text-white border border-gray-400 focus:border-yellow-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-yellow-400 text-sm font-medium hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-300 transition flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Login"
              )}
            </button>
          
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToSignup}
                className="text-yellow-400 font-bold hover:underline"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

