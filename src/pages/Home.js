import React from "react";
import BannerHome from "../components/BannerHome";
import Card from "../components/Card";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import { useSelector } from "react-redux";

const Home = () => {
    const trendingData = useSelector((state) => state.movieData.bannerData);

    return (
        <div>
            <BannerHome />
            <HorizontalScrollCard data={trendingData} heading="Trending" />
        </div>
    )
}
export default Home;