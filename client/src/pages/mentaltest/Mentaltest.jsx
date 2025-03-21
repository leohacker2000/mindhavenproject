import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './mentaltest.css';

const Mentaltest = () => {
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setResponses({
      ...responses,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    generateSuggestion();
  };

  const generateSuggestion = () => {
    const { anxiety, mood, sleep, social, stress } = responses;
    let score = 0;

    if (anxiety === 'never') score++;
    if (mood === 'good') score++;
    if (sleep === 'no') score++;
    if (social === 'no') score++;
    if (stress === 'low') score++;

    let suggestionText = 'Thank you for completing the test! ';

    if (score === 5) {
      suggestionText += '🌟 You are shining bright! Keep up the great work and continue doing what makes you happy!';
    } else if (score >= 3) {
      suggestionText += '😊 You seem to be doing well! Consider taking a break and enjoying a fun activity!';
    } else {
      suggestionText += '😟 It might be a good idea to talk to someone about how you’re feeling. Remember, it’s okay to ask for help!';
    }

    setSuggestion(suggestionText);
  };

  return (
    <div className="container">
      <h2>Mental Health Test</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>How often do you feel anxious?</label>
            <div>
              <label><input type="radio" name="anxiety" value="never" onChange={handleChange} /> Never</label>
              <label><input type="radio" name="anxiety" value="sometimes" onChange={handleChange} /> Sometimes</label>
              <label><input type="radio" name="anxiety" value="often" onChange={handleChange} /> Often</label>
            </div>
          </div>
          
          <div className="form-group">
            <label>How would you describe your mood lately?</label>
            <div>
              <label><input type="radio" name="mood" value="good" onChange={handleChange} /> Good</label>
              <label><input type="radio" name="mood" value="neutral" onChange={handleChange} /> Neutral</label>
              <label><input type="radio" name="mood" value="bad" onChange={handleChange} /> Bad</label>
            </div>
          </div>

          <div className="form-group">
            <label>Do you have trouble sleeping?</label>
            <div>
              <label><input type="radio" name="sleep" value="yes" onChange={handleChange} /> Yes</label>
              <label><input type="radio" name="sleep" value="no" onChange={handleChange} /> No</label>
            </div>
          </div>

          <div className="form-group">
            <label>Do you feel socially isolated?</label>
            <div>
              <label><input type="radio" name="social" value="yes" onChange={handleChange} /> Yes</label>
              <label><input type="radio" name="social" value="no" onChange={handleChange} /> No</label>
            </div>
          </div>

          <div className="form-group">
            <label>How would you rate your stress level?</label>
            <div>
              <label><input type="radio" name="stress" value="low" onChange={handleChange} /> Low</label>
              <label><input type="radio" name="stress" value="medium" onChange={handleChange} /> Medium</label>
              <label><input type="radio" name="stress" value="high" onChange={handleChange} /> High</label>
            </div>
          </div>

          <button type="submit" className="btn">Submit</button>
        </form>
      ) : (
        <div className="result">
          <h3 className="re">Results</h3>
          <p className="re">{suggestion}</p>
          <button onClick={() => setSubmitted(false)} className="btn">Retake Test</button>
          <button onClick={() => navigate('/')} className="btn home-btn">Go Home</button>
        </div>
      )}
    </div>
  );
};

export default Mentaltest;
