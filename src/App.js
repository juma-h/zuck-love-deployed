import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ZuckLove } from './pages';
import './App.css';

function App() {
  return (
    <Router>
       <div className="App">
        <Routes>
          <Route path="/" element={<ZuckLove/>}/>
        </Routes>
     
     </div>
    </Router>
   
  );
}

export default App;
