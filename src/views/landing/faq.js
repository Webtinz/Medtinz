import React, { useState } from "react";
import "./faq.css"; // Import des styles CSS

const FaqSection = () => {
  // State pour gérer l'ouverture des questions
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqData = [
    {
      id: 1,
      question: "Where can I watch?",
      answer:
        "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper.",
    },
    {
      id: 2,
      question: "Where can I watch?",
      answer: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper.",
    },
    {
      id: 3,
      question: "Where can I watch?",
      answer: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper.",
    },
    {
      id: 4,
      question: "Where can I watch?",
      answer: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper.",
    },
  ];

  return (
    <div className="feu mt-4">
      <div className="container py-5">
        <div className="row">
          {/* Colonne gauche */}
          <div className="col-lg-6 mb-4 d-flex flex-column justify-content-center claudine">
            <h2 className="faq-title mb-4">
              Still do you have <br /> <strong>questions</strong>
            </h2>
            <p className="faq-text mb-4">
              No need to worry about your files being lost because we are very
              loyal to be your storage platform.
            </p>
            <button className="planing btn btn-warning btn-sm">
                Contact us now
            </button>

          </div>

          {/* Colonne droite - Accordéon */}
          <div className="col-lg-6 mb-4">
            <div className="faq-accordion">
              {faqData.map((item, index) => (
                <div
                  key={item.id}
                  className={`faq-item ${openIndex === index ? "open" : ""}`}
                >
                  <div
                    className="faq-header d-flex justify-content-between align-items-center"
                    onClick={() => handleToggle(index)}
                  >
                    <div>
                      <span className="faq-number">0{item.id}</span>
                      <span className="faq-question fw-bold">
                        {item.question}
                      </span>
                    </div>
                    <span className="faq-toggle">
                      {openIndex === index ? "✖" : "+"}
                    </span>
                  </div>
                  {openIndex === index && (
                    <div className="faq-answer text-muted mt-2">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
