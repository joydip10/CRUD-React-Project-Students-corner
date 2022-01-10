import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import AddStudent from './Components/AddStudent/AddStudent';
import AllStudents from './Components/AllStudents/AllStudents';
import StudentDescription from './Components/StudentDescription/StudentDescription';
import Footer from './Components/Footer/Footer';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addStudent" element={<AddStudent />} />
          <Route path="/allStudents" element={<AllStudents />} />
          <Route path="/describeStudent/:id" element={<StudentDescription />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
