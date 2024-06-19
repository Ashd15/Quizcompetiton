import React, { useState, useEffect } from 'react';

const TakeQuiz: React.FC = () => {
  const [quiz, setQuiz] = useState<{ title: string; questions: any[] } | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const savedQuiz = localStorage.getItem('quiz');
    if (savedQuiz) {
      setQuiz(JSON.parse(savedQuiz));
    }
  }, []);

  const handleAnswerChange = (qIndex: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>
      {quiz.questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-6">
          <h3 className="text-lg font-semibold">{question.questionText}</h3>
          <div className="mt-2">
            {question.options.map((option: string, oIndex: number) => (
              <div key={oIndex} className="flex items-center mt-1">
                <input
                  type="radio"
                  name={`answer-${qIndex}`}
                  className="mr-2"
                  checked={answers[qIndex] === oIndex}
                  onChange={() => handleAnswerChange(qIndex, oIndex)}
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
      {!submitted && (
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Submit Quiz
        </button>
      )}
      {submitted && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Results</h2>
          {quiz.questions.map((question, qIndex) => (
            <div key={qIndex} className="mb-4">
              <h3 className="text-lg font-semibold">{question.questionText}</h3>
              <div className="mt-2">
                {question.options.map((option: string, oIndex: number) => (
                  <div
                    key={oIndex}
                    className={`flex items-center mt-1 ${
                      question.correctAnswerIndex === oIndex
                        ? 'text-green-500'
                        : answers[qIndex] === oIndex
                        ? 'text-red-500'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name={`review-answer-${qIndex}`}
                      className="mr-2"
                      checked={answers[qIndex] === oIndex}
                      readOnly
                    />
                    <label>{option}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <h3 className="text-xl font-bold">
            Your Score: {answers.filter((ans, idx) => ans === quiz.questions[idx].correctAnswerIndex).length} /{' '}
            {quiz.questions.length}
          </h3>
        </div>
      )}
    </div>
  );
};

export default TakeQuiz;
