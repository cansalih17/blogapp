import React from "react";
import AboutImg from "../source/img/about.jpeg";

function About() {
  return (
    <div>
      <img src={AboutImg} className="w-full h-80 object-cover" alt="About Me" />
      <h1 class="text-4xl mt-12 font-bold text-black-500 mb-4">
        Blog sayfamız hakkında
      </h1>
      <p class="text-lg text-gray-800">
        Biz, XYZ Blog ekibi olarak sizlere ilgi çekici ve bilgilendirici
        içerikler sunmaktan büyük bir heyecan duyuyoruz. XYZ Blog, teknoloji ve
        oyun alanlarındaki en güncel haberleri, ipuçlarını, rehberleri ve
        derinlemesine analizleri sunmayı amaçlamaktadır.
      </p>
      <h1 class="text-2xl mt-12 font-semibold text-black-500 mb-4">
        Misyonumuz
      </h1>
      <p class="text-lg text-gray-800">
        Misyonumuz, okuyucularımıza en kaliteli içerikleri sunarak onların bilgi
        düzeyini artırmak, ilham vermek ve eğlendirmektir. Amacımız, her
        ziyaretçimize değerli bilgiler sunarak hayatlarını daha iyi bir şekilde
        yaşamalarına yardımcı olmaktır.
      </p>
      <h1 class="text-2xl mt-12 font-semibold text-black-500 mb-4">
        Vizyonumuz
      </h1>
      <p class="text-lg text-gray-800">
        Vizyonumuz, XYZ Blog'u [eklemek istediğiniz hedef veya vizyon] elde
        etmek için çalışmak ve siz değerli okuyucularımızla birlikte
        büyümektedir.
      </p>
    </div>
  );
}

export default About;
