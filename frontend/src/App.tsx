import { Link } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <h1>Hi this is my portfolio</h1>
      <Link to={"/blog"}>My blog</Link>
    </>
  );
}

export default App;
