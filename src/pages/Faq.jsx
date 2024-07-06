import faqs from "../data/faq";

import React, { useState } from "react";
import "./faq.css";

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container">
      <h1 className="header">Trading Dashboard FAQ</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="faqItem">
          <div className="question" onClick={() => handleToggle(index)}>
            {faq.question}
          </div>
          {activeIndex === index && <div className="answer">{faq.answer}</div>}
        </div>
      ))}
    </div>
  );
};

export default FaqPage;
