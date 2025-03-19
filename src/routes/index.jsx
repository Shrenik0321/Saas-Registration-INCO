import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Home from "../containers/Home";
import NotFound from "../containers/NotFound";
import SecondPage from "../containers/QuestionForm1";
import Details2 from "../containers/QuestionForm2";
import SelectTemplate from "../containers/SelectTetmplate";
import RegistrationSuccess from "../containers/RegistrationSuccess";

const AppRouter = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/second-page" element={<SecondPage />} />
        <Route path="/third-page" element={<Details2 />} />
        {/* <Route path="/select-template" element={<SelectTemplate />} /> */}
        <Route path="/success" element={<RegistrationSuccess />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
