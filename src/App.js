import './App.css';
import Board from './board/Board';
import Menu from './menu/Menu';
import NotFound from './notFound/NotFound';
import {
    Route,
    Routes,
    BrowserRouter as Router,
} from "react-router-dom";


function App() {
    return (
      <Router>
        <Routes>
            <Route exact path="/" element={<Menu/>} />
            <Route path="/game" element={<Board/>} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
  );
}

export default App;
