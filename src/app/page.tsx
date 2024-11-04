'use client'

import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Image from "next/image";
import { FaArrowUp } from "react-icons/fa";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Produtos from "../components/produtos/Produtos";
import logoSlogan from "/public/doccieslogan.svg";

import { Yrsa } from 'next/font/google';
import { Poppins } from "next/font/google";

import { useEffect } from 'react';

const schibstedGrotesk = Yrsa({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

function backTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function addScrollEvent() {
  window.addEventListener('scroll', function () {
    let scroll = document.querySelector('.scrollTop')
    scroll?.classList.toggle('active', window.scrollY > 450)
  })
}

export default function Home() {

  useEffect(() => {
    addScrollEvent()
  }, [])

  return (
    <div>
      <Header />

      <div className={`slogan-container ${schibstedGrotesk.className}`}>
        <div className="slogan-content">
          <Image
            src={logoSlogan}
            alt="Logo"
            className="slogan-logo"
          />
          <p className="slogan-text">
            Doces momentos para
            <span className={`highlighted-text ${schibstedGrotesk.className}`}> Compartilhar</span>
          </p>

          <div className="inciar_pedido">
            <button className={`inicie_pedido ${poppins.className}`}>
              Inicie seu pedido
            </button>
          </div>
        </div>
      </div>

      <div className="cards">
        <Produtos />
      </div>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        stacked
        closeOnClick
        rtl={false}
        draggable
        theme="colored"
        transition={Bounce}
      />

      <button className='scrollTop' onClick={backTop}>
        <FaArrowUp />
      </button>

    </div>
  );
}