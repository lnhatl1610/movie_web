import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';
import { useEffect } from 'react';
import axios from 'axios';
import { setBannerData, setImageURL } from './store/movieSlice';
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch();

  const fetchTrendingData = async () => {
    try {
      const response = await axios.get("/trending/all/week");

      dispatch(setBannerData(response.data.results));
      // console.log("response", response);
    }
    catch (error) {
      console.error("error", error);
    }
  }

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get("/configuration");
      dispatch(setImageURL(response.data.images.secure_base_url + "original"));
      // console.log("Configuration Response", response);
    }
    catch (error) {
      console.error("Configuration Error", error);
    }
  }

  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }
    , []);

  return (
    <main className="pb-14 lg:pb-0">
      <Header />
      <div className=''>
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  );
}

export default App; 
