import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import {
  ZuckLove,
  Copy,
  Headlines,
  ImageTest,
  Product,
  Login,
  SignUp,
} from "./pages";
import "./App.css";


function App() {
  const navigate = useNavigate();





  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/" element={<ZuckLove />}>
          <Route path="/copy" element={<Copy />} />
          <Route path="/headlines" element={<Headlines />} />
          <Route path="/product" element={<Product />} />
          <Route path="/images" element={<ImageTest />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
