import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import CityWeather from "./pages/CityWeather";

function App() {
  return (
    <div class="flex justify-center gap-4 flex-col min-h-screen">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/city-weather/:cityName" element={<CityWeather/>}/>
        <Route path="*" element={"Error"}/>
      </Routes>
    </div>
  );
}

export default App;
