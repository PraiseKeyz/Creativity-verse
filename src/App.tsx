import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'; // Import useLocation
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext } from 'react';
import Footer from './components/PortfolioComponent/footer';
import Header from './components/PortfolioComponent/Header';
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
import ScrollToTop from './components/PortfolioComponent/ScrollToTop';
// import PopUp from './components/PopUp';
import SignUp from './PortfolioPages/SignUp';
import SignIn from './PortfolioPages/SignIn';
import UserProfile from './AppPages/UserProfile';
import JobsListing from './AppPages/JobsListing';
import UnderDevelopment from './AppPages/UnderDevelopment';
import Community from './AppPages/Community';
import Contests from './AppPages/Contests';
import Marketplace from './AppPages/Marketplace';
import Referral from './AppPages/Referral';
import MainApp from './AppPages/MainApp';
import LoggedInState, { LoggedInContext } from './Contexts/LoggedInState';
import Feed from './AppPages/Feed';
import Settings from './AppPages/Settings';
import HelpCenter from './AppPages/HelpCenter';
import PrivacyPolicy from './AppPages/PrivacyPolicy';
import ResetPassword from './PortfolioPages/ResetPassword';
import EmailVerification from './PortfolioPages/EmailVerification';
import EmailVerificationSuccess from './PortfolioPages/EmailVerificationSuccess';
import ForgotPassword from './PortfolioPages/ForgotPassword';
import ProductPage from './AppPages/ProductPage';
import VerseXJobs from './AppPages/VerseXJobs';
import PricingPage from './PortfolioPages/PricingPage';
import Dashboard from './AppPages/Dashboard';
import CvEliteLounge from './AppPages/CvEliteLounge';
import SellerDashboard from './AppPages/SellerCenter/SellerDashboard';
import CreateJob from './AppPages/SellerCenter/CreateJob';
import CreateProducts from './AppPages/SellerCenter/CreateProducts';
import EditJob from './AppPages/SellerCenter/EditJob';
import EditProduct from './AppPages/SellerCenter/EditProduct';
import ProductListing from './AppPages/SellerCenter/ProductListings';
import AdListings from './AppPages/SellerCenter/AdsListings';
import JobListings from './AppPages/SellerCenter/JobListings';
import CreoAI from './AppPages/CreoAI';
import Onboarding from './AppPages/SkillLens/Onboarding';
import SkillLensInfo from './AppPages/SkillLens/SkillLensInfo';
import TestPage from './AppPages/SkillLens/TestPage';
import ResultPage from './AppPages/SkillLens/ResultPage';
import TalentVerification from './PortfolioPages/TalentVerification';
import Notifications from './AppPages/Notifications';
import { UserProvider } from "./Contexts/UserContext";
import { useAuthStore } from './store/authStore';
import UserApplications from './AppPages/UserApplications';
import JobDetails from './AppPages/JobDetails';
import Talents from './AppPages/Talents';
import SavedJobs from './AppPages/SavedJobs';
import CreatePost from './AppPages/CreatePost';
import AddProject from './AppPages/AddProject';
import Portfolio from './AppPages/Portfolio';
import PostDetail from './AppPages/PostDetail';
import Webinars from './AppPages/Webinars';

function App() {
 

  return (
    <LoggedInState>
     <UserProvider>
      <Router>
        <ScrollToTop />
        <Body/>
      </Router>
     </UserProvider>
    </LoggedInState>
  );
}

function Body() {
  const location = useLocation();
  const loggedInContext = useContext(LoggedInContext);
  const isLoggedIn = loggedInContext?.isLoggedIn ?? false;
  const UNDER_DEV = import.meta.env.VITE_UNDER_DEV === 'true';

 const { user } = useAuthStore();
 
  const sampleUser = {
  id: "u1",
  firstname: "Edet",
  lastname: "John",
  avatar: "https://i.pravatar.cc/150?img=32", // mock avatar image
};



  // Authentication pages that should not show header/footer
  const authPages = [
    '/signup',
    '/signin',
    '/reset-password',
    '/forgot-password',
    '/verify-email',
    '/email-verified'
  ];

  // Check if current path is an auth page
  const isAuthPage = authPages.some(path => location.pathname === path);

  // Check if the current path matches any of our defined routes (excluding auth pages)
  const isValidRoute = [
    '/',
    '/about',
    '/features',
    '/showcase',
    '/services',
    '/store',
    '/pricing',
    '/resources',
    '/resources/blogs',
    '/contact',
    '/resources/blog-management',
    '/services/service/:id', // This will be matched differently
    '/resources/blogs/:id', // This will be matched differently 
    '/talent-verification'
  ].some(path => {
    if (path.includes(':')) {
      // Handle dynamic routes
      const pathPattern = path.split(':')[0];
      return location.pathname.startsWith(pathPattern);
    }
    return location.pathname === path;
  });



  // Under-development gate: allow only Jobs Listing and auth pages when enabled
  if (UNDER_DEV) {
    const allowedPaths = new Set<string>([
      '/verse/jobs'
    ]);

    if (!allowedPaths.has(location.pathname)) {
      return (
        <>
          <UnderDevelopment />
        </>
      );
    }
  }

  return (
    <>
      {isValidRoute && !isAuthPage && <Header />}
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
        <Route path='/pricing' element={<PricingPage />} />
        <Route path='/resources' element={<Resources />} />
        <Route path='/resources/blogs' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/resources/blog-management" element={<BlogManagement />} />
        <Route path="/resources/blogs/:id" element={<BlogPost />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/email-verified" element={<EmailVerificationSuccess />} />
        <Route path="/talent-verification" element={<TalentVerification />} />

        
        {/* Protected routes */}
        <Route path='verse' element={isLoggedIn ? <MainApp /> : <Navigate to="/signin" />} >
          <Route path='dashboard' element={isLoggedIn ? <Dashboard user={user} /> : <Navigate to="/signin" />} />
          <Route path='creo-ai' element={isLoggedIn ? <CreoAI /> : <Navigate to="/signin" />} /> 
          <Route path='create/post' element={isLoggedIn ? <CreatePost user={sampleUser} /> : <Navigate to="/signin" />} /> 
          <Route path='community/post-id' element={isLoggedIn ? <PostDetail  /> : <Navigate to="/signin" />} /> 
          <Route path='create/project' element={isLoggedIn ? <AddProject user={sampleUser} /> : <Navigate to="/signin" />} /> 
          <Route path='notifications' element={isLoggedIn ? <Notifications /> : <Navigate to="/signin" />} />
          <Route path='user-profile' element={isLoggedIn ? <UserProfile /> : <Navigate to="/signin" />} />
          <Route path='portfolio' element={isLoggedIn ? <Portfolio /> : <Navigate to="/signin" />} />
          <Route path='jobs' element={isLoggedIn ? <JobsListing /> : <Navigate to="/signin" />} />
          <Route path='jobs/saved' element={isLoggedIn ? <SavedJobs /> : <Navigate to="/signin" />} />
          <Route path='jobs/:id' element={isLoggedIn ? <JobDetails /> : <Navigate to="/signin" />} />
          <Route path='verse-x-jobs' element={isLoggedIn ? <VerseXJobs /> : <Navigate to="/signin" />} />
          <Route path='community' element={isLoggedIn ? <Community /> : <Navigate to="/signin" />} />
          <Route path='contests' element={isLoggedIn ? <Contests /> : <Navigate to="/signin" />} />
          <Route path='webinars' element={isLoggedIn ? <Webinars /> : <Navigate to="/signin" />} />
          <Route path='marketplace' element={isLoggedIn ? <Marketplace /> : <Navigate to="/signin" />} />
          <Route path='talents' element={isLoggedIn ? <Talents /> : <Navigate to="/signin" />} />
          <Route path='product/:id' element={isLoggedIn ? <ProductPage  /> : <Navigate to="/signin" />} />
          <Route path='referral' element={isLoggedIn ? <Referral /> : <Navigate to="/signin" />} />
          <Route path='feed' element={isLoggedIn ? <Feed /> : <Navigate to="/signin" />} />
          <Route path='settings' element={isLoggedIn ? <Settings /> : <Navigate to="/signin" />} />
          <Route path='help-center' element={isLoggedIn ? <HelpCenter /> : <Navigate to="/signin" />} />
          <Route path='privacy-policy' element={isLoggedIn ? <PrivacyPolicy /> : <Navigate to="/signin" />} />
          <Route path='elite-lounge' element={isLoggedIn ? <CvEliteLounge /> : <Navigate to="/signin" />} />
          <Route path='my-applications' element={isLoggedIn ? <UserApplications /> : <Navigate to="/signin" />} />
          <Route path='my-applications/:id' element={isLoggedIn ? <JobDetails /> : <Navigate to="/signin" />} />
          <Route path='seller-center' element={isLoggedIn ? <SellerDashboard /> : <Navigate to="/signin" />} />
          <Route path='seller-center/ads-listings' element={isLoggedIn ? <AdListings /> : <Navigate to="/signin" />} />
          <Route path='seller-center/create-job' element={isLoggedIn ? <CreateJob /> : <Navigate to="/signin" />} />
          <Route path='seller-center/edit-job' element={isLoggedIn ? <EditJob /> : <Navigate to="/signin" />} />
          <Route path='seller-center/job-listings' element={isLoggedIn ? <JobListings /> : <Navigate to="/signin" />} />
          <Route path='seller-center/list-product' element={isLoggedIn ? <CreateProducts /> : <Navigate to="/signin" />} />
          <Route path='seller-center/edit-product' element={isLoggedIn ? <EditProduct /> : <Navigate to="/signin" />} />
          <Route path='seller-center/product-listings' element={isLoggedIn ? <ProductListing /> : <Navigate to="/signin" />} />
          <Route path='skill-lens' element={isLoggedIn ? <SkillLensInfo /> : <Navigate to="/signin" />} />
          <Route path='skill-lens/onboarding' element={isLoggedIn ? <Onboarding /> : <Navigate to="/signin" />} />
          <Route path='skill-lens/test/:id' element={isLoggedIn ? <TestPage /> : <Navigate to="/signin" />} />
          <Route path='skill-lens/result/:id' element={isLoggedIn ? <ResultPage /> : <Navigate to="/signin" />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      { isValidRoute && !isAuthPage && <Footer />}
    </>
  );
}

export default App;