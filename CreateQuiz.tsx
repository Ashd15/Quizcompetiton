import React, { useState } from 'react';

type Question = {
  questionText: string;
  options: string[];
  correctAnswer: number;
};

const CreateQuiz: React.FC = () => {
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({ questionText: '', options: ['', '', '', ''], correctAnswer: 0 });

  const handleAddQuestion = () => {
    setQuiz([...quiz, currentQuestion]);
    setCurrentQuestion({ questionText: '', options: ['', '', '', ''], correctAnswer: 0 });
  };

  const handleSubmitQuiz = () => {
    localStorage.setItem('quiz', JSON.stringify(quiz));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Quiz</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Question"
          value={currentQuestion.questionText}
          onChange={(e) => setCurrentQuestion({ ...currentQuestion, questionText: e.target.value })}
          className="input input-bordered w-full"
        />
        {currentQuestion.options.map((option, index) => (
          <div key={index} className="mt-2">
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => {
                const newOptions = [...currentQuestion.options];
                newOptions[index] = e.target.value;
                setCurrentQuestion({ ...currentQuestion, options: newOptions });
              }}
              className="input input-bordered w-full"
            />
          </div>
        ))}
        <div className="mt-2">
          <label>Correct Answer:</label>
          <select
            value={currentQuestion.correctAnswer}
            onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: +e.target.value })}
            className="select select-bordered w-full"
          >
            {currentQuestion.options.map((option, index) => (
              <option key={index} value={index}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={handleAddQuestion} className="btn btn-primary mr-2">Add Question</button>
      <button onClick={handleSubmitQuiz} className="btn btn-secondary">Submit Quiz</button>
    </div>
  );
};

export default CreateQuiz;
