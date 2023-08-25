import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ZuckLove, Copy, Headlines, ImageTest , Product, Login, SignUp} from "./pages";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<ZuckLove />}>
            <Route index element={<Copy />} />
            <Route path="/headlines" element={<Headlines />} />
            <Route path="/product" element={<Product/>}/>
            <Route path="/images" element={<ImageTest />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
