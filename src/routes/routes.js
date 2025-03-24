import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Olowa/index";
import About from "../Olowa/about";
import Department from "../Olowa/department";
import Meet from "../Olowa/meet";
import Community from "../Olowa/community";
import Service from "../Olowa/service";
import Donate from "../Olowa/donate";
import Sugery from "../Olowa/sugery";
import Testimonial from "../Olowa/testimonial";
import Photogallery from "../Olowa/photogallery";
import CommingSoon from "../Olowa/comingsoonpage";
import Loader from "../Olowa/Components/Loader";


const AppRouter = () => {
  return (
    <Router>
      <Loader />
      <Routes>
        <Route path="/" element={<CommingSoon />} />
        <Route path="/index" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/department" element={<Department />} />
        <Route path="/meet" element={<Meet />} />
        <Route path="/Community" element={<Community />} />
        <Route path="/service" element={<Service />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/sugery" element={<Sugery />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/photogallery" element={<Photogallery />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
