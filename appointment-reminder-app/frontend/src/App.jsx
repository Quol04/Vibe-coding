import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import AppointmentForm from './components/AppointmentForm';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Appointment Reminder Tool</h1>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/book-appointment" component={AppointmentForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;