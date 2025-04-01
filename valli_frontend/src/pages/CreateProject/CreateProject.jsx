import React, {useState, useRef, useEffect} from "react"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import "./CreateProject.scss"
import { fetchQuestions } from "../../mock/QuestionsData"


// const questions = fetchQuestions(); // Fetch questions from the mock data

const questions = [
    "Which city or village is your farm near?",
    "What crop are you growing this season?",
    'What is your objective for this crop?',
    "What’s the current stage of your crop? Just planted, growing, or close to harvest?",
    "How big is your farm? (Approximate size in acres?)",
    "When did you plant your crop? (If you remember the exact date, that’s great!)",
    "What irrigation method are you using? (Canal, tube well, drip irrigation, or a mix?)",
    "What’s the main purpose of your crop? For personal use or selling?",
    "How do you plan to sell it? Directly to customers, through markets, brokers, or cooperatives?",
    "What’s your expected yield per acre? (Rough estimate is fine!)",
    "What price per kg do you expect to sell it for?",
    "Can you estimate your typical costs per acre? (Including seeds, fertilizers, pesticides, and biological products.)",
    "What are your irrigation costs per season, per acre? (Including labor, electricity, and equipment maintenance.)",
    "Do you hire extra labor, or do you use machinery?",
    "How much do labor and machinery cost per season, per acre?"
  ];
  
  export default function CreateProject() {
    // Create a state object to store each answer
    // We'll use an array or object indexed by question
    const [answers, setAnswers] = useState(() =>
      questions.map(() => "")
    );
  
    const handleChange = (index, value) => {
      setAnswers((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });
    };

    const handleGoBack = () => {
        window.history.back();
      };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // For now, just log the answers
      console.log("Submitted answers:", answers);
      // You can also send them to a server or handle them further here
      alert("Form submitted! Check console for data.");
    };
  
    return (
        <>
        <Header />
      <div className="farm-form-container">
        <h2>Farm Information</h2>
        
        <form className="farm-form" onSubmit={handleSubmit}>
          {questions.map((q, index) => (
            <div className="form-group" key={index}>
              <label>{q}</label>
              <input
                type="text"
                value={answers[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder="Your answer..."
              />
            </div>
          ))}
          <button type="submit" className="submit-btn">
            Submit
          </button>

          <button type="button" className="go-back-btn" onClick={handleGoBack}>
          Go Back
        </button>
        </form>
      </div>
        <Footer />
      </>
    );
  }