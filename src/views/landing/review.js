import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./review.css";
import { FaStar } from "react-icons/fa";
import ellipse1 from "../../assets/images/Ellipse 1.png";
import ellipse2 from "../../assets/images/Ellipse 2.png";
import ellipse3 from "../../assets/images/Ellipse 3.png";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Wade Warren",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae elementum turpis. Fusce facilisis pharetra arcu in vulputate. Ut viverra lectus ac vehicula posuere. Suspendisse",
      image: ellipse1,
    },
    {
      id: 2,
      name: "Ronald Richards",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae elementum turpis. Fusce facilisis pharetra arcu in vulputate. Ut viverra lectus ac vehicula posuere. Suspendisse",
      image: ellipse2,
    },
    {
      id: 3,
      name: "Jane Cooper",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae elementum turpis. Fusce facilisis pharetra arcu in vulputate. Ut viverra lectus ac vehicula posuere. Suspendisse",
      image: ellipse3,
    },
    {
        id: 4,
        name: "Jane Cooper",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae elementum turpis. Fusce facilisis pharetra arcu in vulputate. Ut viverra lectus ac vehicula posuere. Suspendisse",
        image: ellipse1,
      },
      {
        id: 4,
        name: "Jane Cooper",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae elementum turpis. Fusce facilisis pharetra arcu in vulputate. Ut viverra lectus ac vehicula posuere. Suspendisse",
        image: ellipse2,
      },
      {
        id: 4,
        name: "Jane Cooper",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae elementum turpis. Fusce facilisis pharetra arcu in vulputate. Ut viverra lectus ac vehicula posuere. Suspendisse",
        image: ellipse3,
      },
  ];

  return (
    <div className="reviews-container py-5 mb-5">
  <div className="reviews-header px-5">
    <div className="text-start">
      <h6 className="text-warning fw-bold">REVIEWS</h6>
      <h2 className="fw-bold">
        Join 30,000+ customers <br /> who are already using MedTinz
      </h2>
    </div>
    {/* Navigation Buttons */}
    <div className="d-flex align-items-center">
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </div>
  </div>

  <Swiper
    slidesPerView={1}
    spaceBetween={20}
    loop={true}
    navigation={{
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    }}
    pagination={{ clickable: true }}
    modules={[Navigation, Pagination]}
    breakpoints={{
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }}
    className="mySwiper"
  >
    {reviews.map((review) => (
      <SwiperSlide key={review.id}>
        <div className="review-card p-4 rounded shadow-sm bg-white">
          <div className="d-flex align-items-center mb-3">
            <img
              src={review.image}
              alt={review.name}
              className="rounded-circle me-3"
              width="60"
              height="60"
            />
            <div>
              <div className="d-flex">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} color="#FFB900" />
                ))}
              </div>
            </div>
          </div>
          <p className="text-muted">{review.text}</p>
          <p className="fw-bold mb-0">- {review.name}</p>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
    </div>

  );
};

export default Reviews;
