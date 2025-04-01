import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "How do I find travel deals on LoanbillsFX?",
    answer:
      "Simply use one of our travel search engines to scan for prices gathered from hundreds of travel sites. LoanbillsFX’s search results pages have loads of filter options to help you find deals, discover exactly what you’re looking for and make booking seamless. Plus, there’s no extra fee from LoanbillsFX.",
  },
  {
    question: "How can I use LoanbillsFX to manage my travel bookings?",
    answer: "",
  },
  {
    question: "What makes LoanbillsFX a great travel app?",
    answer: "",
  },
  {
    question: "What are LoanbillsFX Price Alerts?",
    answer: "",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6">
      <h2 className="text-2xl font-bold mb-6">Frequently asked questions about LoanbillsFX</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b">
            <button
              className="flex justify-between items-center w-full py-4 text-left font-medium"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openIndex === index && faq.answer && (
              <p className="text-gray-600 pb-4">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
