import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to Mock Test</h1>
      <nav className="mb-6">
        <ul className="flex space-x-6">
          <Link className="text-blue-500 hover:underline" to="/how-it-works">How It Works</Link>
          <Link className="text-blue-500 hover:underline" to="/reviews">Reviews</Link>
          <Link className="text-blue-500 hover:underline" to="/pricing">Resources</Link>
          <Link className="text-blue-500 hover:underline" to="/inside-docta">Use cases</Link>
        </ul>
      </nav>
      <h2><Link className="bg-blue-500 text-white px-6 py-3 rounded shadow-lg hover:bg-blue-700" to="/login">Sign In</Link></h2>
    </div>
  );
};
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      navigate("/exam");
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login to Start Exam</h1>
      <h4><input className="border p-2 mb-2" type="text" placeholder="Email Address" value={username} onChange={(e) => setUsername(e.target.value)} /></h4>
      <h4><input className="border p-2 mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /></h4>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleLogin}>Start Exam</button>
    </div>
  );
};

const ExamPage = () => {
  const [timeLeft, setTimeLeft] = useState(1800);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const questions = [
    { type: "mcq", question: "Question 1 : What is the ful form of HTTP?", options: ["Hyper Text Transform Protocol", "Hyper Text Transfer protocol", "Hyper Time Transfer Protocol", "Hyper Text Transfer Prototype"] },
    { type: "descriptive", question: "Question 2 : Explain the HTTP Protocol." },
    { type: "mcq", question: "Question 3 : What is the full form of RAM?", options: ["Random Access Memory", "Read Access Memory", "Readily access memory", "None"] },
    { type: "descriptive", question: "Question 4 : Explain about RAM and its type ?" },
    { type: "mcq", question: "Question 5 : Which part of the computer is responsible for executing instructions??", options: ["HDD", "RAM", "CPU", "None"] },
    { type: "descriptive", question: "Question : 6 Explain about CPU and its component." },
    { type: "mcq", question: "Question 7 : Which of the following is a volatile memory?", options: ["RAM", "HDD", "HDD", "ROM"] },
    { type: "descriptive", question: "Question 8 : Explain the volatile memory with example" },
    { type: "mcq", question: "Question 9 : What does LAN stand for?", options: ["Local Area Network", "Long Area Network", "Large Area Network", "None"] },
    { type: "descriptive", question: " Question 10 : Explain about LAN with examples" },
  ];

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate("/thank-you");
    }
    const timer = setInterval(() => setTimeLeft(time => time - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/thank-you");
    }
  };

  const handleFileUpload = (e) => {
    setAnswers({ ...answers, [currentQuestion]: e.target.files[0] });
  };

  const handleSave = () => {
    alert("Answer saved successfully!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-bold">Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</h2>
      <h2 className="text-xl font-bold mt-4">{questions[currentQuestion].question}</h2>
      {questions[currentQuestion].type === "mcq" ? (
        <div className="mt-2">
          {questions[currentQuestion].options.map((option, index) => (
            <div key={index}>
              <input type="radio" name="answer" id={option} />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-2">
          <textarea className="border p-2 w-96 h-40" placeholder="You can type here..."></textarea>
          <input type="file" className="mt-2" onChange={handleFileUpload} />
          <button className="bg-green-500 text-white px-4 py-2 mt-2 rounded" onClick={handleSave}>Save</button>
        </div>
      )}
      <div className="flex justify-between w-full max-w-md mt-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => navigate("/thank-you")}>Finish Exam</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

const ThankYouPage = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-2xl font-bold">Thank You for your time</h1>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/exam" element={<ExamPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
};

export default App;
