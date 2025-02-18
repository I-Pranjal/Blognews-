import './App.css' ; 
import { Route , BrowserRouter as Router, Routes} from "react-router-dom" ; 
import Mainheader from "./common/Mainheader"
import Footer from './common/Footer';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import TopHeader from './common/TopHeader';
import Blogs from './pages/blogs';
import Upload from './pages/upload';
import Createaccount from './pages/createaccount';
import { MyProvider } from './myprovider';
import Dashboard from './pages/dashboard';
import Archieve from './pages/archieve';
import Profile from './pages/profile';



function App() {

  return (
    <MyProvider>
    <>
    <div className='bg-gray-200'>

    <Router>
            <TopHeader />
            <Mainheader />
          <Routes>
            <Route path='/createaccount' element={<Createaccount />} />
            <Route path='/' element={<Home />} />
            <Route path='createaccount/home' element={<Home />} />
            <Route path='/*' element={<NotFoundPage />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/upload' element={<Upload />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/archieve' element={<Archieve />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        <Footer />
    </Router>

    </div>
    </>
    </MyProvider>
  )
}

export default App
