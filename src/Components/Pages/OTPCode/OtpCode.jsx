import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";


export default function OtpCode() {
  const [OtpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();

    formData.set("code", OtpCode);
    formData.set("email", params.email);

    const response = await axios.post(
      'http://127.0.0.1:8000/api/v1.0.0/otp-code',
      formData
    );

    if (response.data.success) {
      navigate("/");
      setIsLoading(false)
    } else {
      toast.error(response.data.message);
      setIsLoading(false)
    }
  };
  return (

    <form action="" onSubmit={handleSubmit}>

      <p>
        Un code vous a été envoyé dans votre boîte mail(
        {localStorage.getItem("email")}). Vérifiez-le et veuillez le saisir
      </p>

      <input type="password" onChange={(e) => {
        setOtpCode(e.target.value);
      }} value={OtpCode} id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Saisir le code ici" />


      <div className="relative flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" Saisir le code ici" />
        <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Saisir le code</label>
      </div>

      <div>
        <button type='submit'
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Confirmer
        </button>
      </div>

    </form>

  );

}