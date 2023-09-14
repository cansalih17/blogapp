import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { emailFunc, login } from "../redux/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginFunc = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        console.log("Giriş başarılı, kullanıcı:", user);
        dispatch(login());
        dispatch(emailFunc(email));
        navigate("/post-share");
      } else {
        console.log("Giriş başarısız");
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 w-80 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Giriş Yap</h2>
        {error && <p className="text-red-500 mb-4">{error.message}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            E-posta
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
            placeholder="E-posta adresinizi girin"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Şifre
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Şifrenizi girin"
          />
        </div>
        <button
          onClick={() => loginFunc()}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
        >
          Giriş Yap
        </button>
      </div>
    </div>
  );
}

export default Login;
