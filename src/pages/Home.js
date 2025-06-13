import React, { useEffect } from "react";
import BannerHome from "../components/BannerHome";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";

const Home = () => {
    const trendingData = useSelector((state) => state.movieData.bannerData);

    const { data: nowPlayingData } = useFetch("/movie/now_playing");
    const { data: topRatedData } = useFetch("/movie/top_rated");
    const { data: tvPopularData } = useFetch("/tv/popular");
    const { data: tvOnTheAirData } = useFetch("/tv/on_the_air");

    return (
        <div>
            <BannerHome />
            <HorizontalScrollCard data={trendingData} heading="Trending" trending={true} />
            <HorizontalScrollCard data={nowPlayingData} heading="Now Playing" media_type={"movie"} />
            <HorizontalScrollCard data={topRatedData} heading="Top Rated" media_type={"movie"} />
            <HorizontalScrollCard data={tvPopularData} heading="Tv Popular" media_type={"tv"} />
            <HorizontalScrollCard data={tvOnTheAirData} heading="Tv On The Air" media_type={"tv"} />
        </div>
    )
}
export default Home;