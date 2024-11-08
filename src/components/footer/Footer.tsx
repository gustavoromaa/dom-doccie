import Link from "next/link";
import "./footer.css"

import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { WindSong } from "next/font/google";

const windSong = WindSong({
    weight: '400',
    subsets: ['latin'],
})

export default function Footer({className}: {className?: string}) {

    

    return(
        <div className={`footer ${className}`}>

            <Link href="/">
                <button className={`footer_logotxt ${windSong.className}`}>Dom Docciê</button>
            </Link>
              <ul className="social_icon">
                  <li><a href="https://www.instagram.com/_dom_doccie_12/" target="_blank"><FaInstagram/></a></li>
                  <li><a href="https://www.facebook.com/share/1Dpgd53L1r/" target="_blank"><FaFacebookF/></a></li>
                  <li><a href="https://wa.me/4198335776" target="_blank"><FaWhatsapp/></a></li>
              </ul>

              {/* <ul className="menu">
                  <li><a href="#">Produtos</a></li>
                  <li><a href="#">Sobre</a></li>
                  <li><a href="#">Desenvolvedores</a></li>
              </ul> */}
          </div>
    )
}