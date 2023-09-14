import React from "react";
import { Link } from "react-router-dom"; // React Router kullanıldığını varsayıyorum

function NotFound() {
  return (
    <div className="flex justify-center items-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">404 - Sayfa Bulunamadı</h2>
        <p>Üzgünüz, aradığınız sayfa bulunamadı.</p>
        <Link to="/" className="text-blue-500 hover:underline mt-4 block">
          Anasayfaya Dön
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
