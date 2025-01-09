import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';

// Import des images
import paychex from '../../assets/images/Paychex.png';
import tektinz from '../../assets/images/tektinz.png';
import momo from '../../assets/images/mtn.png';
import aws from '../../assets/images/aws.png';
import ittiq1 from '../../assets/images/ittiq 1.png';
import kaba from '../../assets/images/kaba.png';

const Partners = () => {
  return (
    <div className="bg-white p-6 mt-5 mb-3">
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        loop={true} // Rend le carrousel infini
        autoplay={{
          delay: 1000, // Intervalle entre chaque défilement
          disableOnInteraction: false, // Défilement continue même après interaction
        }}
        modules={[Autoplay]} // Active Autoplay et Navigation
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 6 }, // Petits écrans
          768: { slidesPerView: 3, spaceBetween: 10 }, // Tablettes
          1024: { slidesPerView: 4, spaceBetween: 20 }, // Grands écrans
          1440: { slidesPerView: 6, spaceBetween: 20 }, // Très grands écrans
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={paychex} alt="Paychex" className="h-12 mx-auto w-auto" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={tektinz} alt="Tektinz" className="h-12 mx-auto" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={momo} alt="MoMo" className="h-12 mx-auto" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={aws} alt="AWS" className="h-12 mx-auto" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={ittiq1} alt="Ittiq1" className="h-12 mx-auto" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={kaba} alt="Kaba" className="h-12 mx-auto" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Partners;
