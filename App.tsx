import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import CreateQuiz from './Components/Admin/CreateQuiz';
import TakeQuiz from './Components/User/TakeQuiz';
const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-500 p-4">
          <div className="container mx-auto flex justify-between">
            <Link to="/" className="text-white font-bold">Quiz Platform</Link>
            <div>
              <Link to="/create-quiz" className="text-white mr-4">Create Quiz</Link>
              <Link to="/take-quiz" className="text-white">Take Quiz</Link>
            </div>
          </div>
        </nav>
        <div className="container mx-auto p-4">
          <Switch>
            <Route path="/create-quiz" component={CreateQuiz} />
            <Route path="/take-quiz" component={TakeQuiz} />
            <Route path="/" exact>
              <h1 className="text-3xl font-bold text-center">Welcome to the Quiz Platform</h1>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
