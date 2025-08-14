import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'; // Import useLocation
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect, useContext } from 'react';
import Footer from './components/footer';
import Header from './components/Header';
import HomePage from './PortfolioPages/Home';
import About from './PortfolioPages/About';
import Features from './PortfolioPages/Features';
import Showcase from './PortfolioPages/Showcase';
import Services from './PortfolioPages/Services';
import ServiceDetail from './PortfolioPages/ServiceDetail';
import Store from './PortfolioPages/Store';
import Resources from './PortfolioPages/Resources';
import Blog from './PortfolioPages/Blog';
import Contact from './PortfolioPages/Contact';
import BlogManagement from './PortfolioPages/BlogManagement';
import BlogPost from './PortfolioPages/BlogPost';
import NotFound from './PortfolioPages/NotFound';
// import './App.css'
import ScrollToTop from './components/ScrollToTop';
import PopUp from './components/PopUp';
import SignUp from './PortfolioPages/SignUp';
import SignIn from './PortfolioPages/SignIn';
import UserProfile from './AppPages/UserProfile';
import JobsListing from './AppPages/JobsListing';
import Community from './AppPages/Community';
import Contests from './AppPages/Contests';
import Marketplace from './AppPages/Marketplace';
import Referral from './AppPages/Referral';
import MainApp from './AppPages/MainApp';
import ProCommunity from './AppPages/ProCommunity';
import LoggedInState, { LoggedInContext } from './Contexts/LoggedInState';
import Feed from './AppPages/Feed';
import Settings from './AppPages/Settings';
import HelpCenter from './AppPages/HelpCenter';
import PrivacyPolicy from './AppPages/PrivacyPolicy';

function App() {
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopUp(true);
    }, 20000); // 20 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <LoggedInState>
      <Router>
        <ScrollToTop />
        <PopUp show={showPopUp} onClose={() => setShowPopUp(false)} />
        <Body/>
      </Router>
    </LoggedInState>
  );
}

function Body() {
  const location = useLocation();
  const loggedInContext = useContext(LoggedInContext);
  const isLoggedIn = loggedInContext?.isLoggedIn ?? false;

  // Check if the current path matches any of our defined routes
  const isValidRoute = [
    '/',
    '/about',
    '/features',
    '/showcase',
    '/services',
    '/signup',
    '/signin',
    '/store',
    '/resources',
    '/resources/blogs',
    '/contact',
    '/resources/blog-management',
    '/services/service/:id', // This will be matched differently
    '/resources/blogs/:id', // This will be matched differently 
  ].some(path => {
    if (path.includes(':')) {
      // Handle dynamic routes
      const pathPattern = path.split(':')[0];
      return location.pathname.startsWith(pathPattern);
    }
    return location.pathname === path;
  });



  return (
    <>
      {isValidRoute && <Header />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/features' element={<Features />} />
        <Route path='/showcase' element={<Showcase />} />
        <Route path='/services' element={<Services />} />
        <Route path='/services/service/:id' element={<ServiceDetail />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/store' element={<Store />} />
        <Route path='/resources' element={<Resources />} />
        <Route path='/resources/blogs' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/resources/blog-management" element={<BlogManagement />} />
        <Route path="/resources/blogs/:id" element={<BlogPost />} />

        {/* Protected routes */}
        <Route path='verse' element={isLoggedIn ? <MainApp /> : <Navigate to="/signin" />} >
          <Route path='user-profile' element={isLoggedIn ? <UserProfile /> : <Navigate to="/signin" />} />
          <Route path='jobs' element={isLoggedIn ? <JobsListing /> : <Navigate to="/signin" />} />
          <Route path='community' element={isLoggedIn ? <Community /> : <Navigate to="/signin" />} />
          <Route path='contests' element={isLoggedIn ? <Contests /> : <Navigate to="/signin" />} />
          <Route path='marketplace' element={isLoggedIn ? <Marketplace /> : <Navigate to="/signin" />} />
          <Route path='referral' element={isLoggedIn ? <Referral /> : <Navigate to="/signin" />} />
          <Route path='feed' element={isLoggedIn ? <Feed /> : <Navigate to="/signin" />} />
          <Route path='settings' element={isLoggedIn ? <Settings /> : <Navigate to="/signin" />} />
          <Route path='help-center' element={isLoggedIn ? <HelpCenter /> : <Navigate to="/signin" />} />
          <Route path='privacy-policy' element={isLoggedIn ? <PrivacyPolicy /> : <Navigate to="/signin" />} />
          {/* Pro members routes */}
          <Route path='pro-community' element={isLoggedIn ? <ProCommunity /> : <Navigate to="/signin" />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      { isValidRoute && <Footer />}
    </>
  );
}

export default App;