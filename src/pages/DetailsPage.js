import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails";
import { useSelector } from "react-redux";
import moment from "moment";
import Divider from "../components/Divider";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import useFetch from "../hooks/useFetch";
import VideoPlay from "../components/VideoPlay";

const DetailsPage = () => {
    const imageURL = useSelector((state) => state.movieData.imageURL);
    const params = useParams();
    const { data } = useFetchDetails(`/${params.explore}/${params.id}`);
    const { data: castData } = useFetchDetails(`/${params.explore}/${params.id}/credits`);
    const { data: similarData } = useFetch(`/${params.explore}/${params.id}/similar`);
    const { data: recommendationData } = useFetch(`/${params.explore}/${params.id}/recommendations`);
    const [playVideo, setPlayVideo] = useState(false);
    const [playVideoId, setPlayVideoId] = useState("");

    const handlePlayVideo = (data) => {
        setPlayVideoId(data);
        setPlayVideo(true);
    }

    return (
        <div>
            <div className="w-full h-[280px] relative hidden lg:block">
                <div className="h-full w-full">
                    <img src={imageURL + data.backdrop_path} className="h-full w-full object-cover" />
                </div>
                <div className="absolute w-full h-full top-0 bg-gradient-to-b from-neutral-900/90 to-transparent">
                </div>
            </div>

            <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
                <div className="lg:-mt-28 relative mx-auto lg:mx-0 w-fit min-w-60">
                    <img src={imageURL + data.poster_path} className="h-80 w-60 object-cover rounded" />
                    <button onClick={() => handlePlayVideo(data)} className="mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-200 shadow-md transition-all hover:scale-95 duration-100">Play Now</button>
                </div>
                <div className="">
                    <h2 className="text-xl lg:text-3xl font-bold text-white">{data.title || data.name}</h2>
                    <p className="text-neutral-400">{data.tagline}</p>

                    <Divider />

                    <div className="flex gap-3 text-center">
                        <p>
                            Rating: {Number(data.voltage_average).toFixed(1)} +
                        </p>
                        <span>|</span>
                        <p>
                            View: {Number(data.vote_count)}
                        </p>
                        <span>|</span>
                        <p>
                            Duration: {Number(data.runtime)} minutes
                        </p>
                    </div>

                    <Divider />

                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
                        <p>{data.overview}</p>
                        <Divider />
                        <div className="flex items-center gap-3 my-3 text-center">
                            <p>Status: {data.status}</p>
                            <span>|</span>
                            <p>Release Date: {moment(data.release_data).format("MMMM Do YYYY")}</p>
                            <span>|</span>
                            <p>Revenue: {Number(data.revenue)}$</p>
                        </div>
                        <Divider />
                    </div>

                    <div>
                        <p><span className="text-white">Director:</span> {castData.crew?.[0].name}</p>
                        <Divider />
                        <p><span className="text-white">Writer:</span> {castData.crew?.filter(el => el.job === "Writer").map(el => el.name).join(", ")}</p>
                    </div>

                    <Divider />

                    <h2 className="font-bold text-lg">Cast:</h2>

                    <div className="grid grid-cols-[repeat(auto-fit,_96px)] gap-5">
                        {
                            castData.cast?.filter(el => el.profile_path).map((cast, index) => {
                                return (
                                    <div>
                                        <div>
                                            <img src={imageURL + cast.profile_path} className="w-20 h-20 rounded-full object-cover" />
                                        </div>
                                        <p className="font-bold text-center text-sm text-neutral-400">{cast.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div >

            <div>
                <HorizontalScrollCard data={similarData} heading={"Similar " + params.explore} media_type={params.explore} />
                <HorizontalScrollCard data={recommendationData} heading={"Recommendation " + params.explore} media_type={params.explore} />
            </div>

            {
                playVideo && (
                    <VideoPlay data={playVideoId} close={() => setPlayVideo(false)} media_type={params.explore} />
                )
            }
        </div >
    )
}

export default DetailsPage;