import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

const Card = ({ data, trending, index, media_type }) => {
    const imageURL = useSelector((state) => state.movieData.imageURL);

    const mediaType = data.media_type ?? media_type;

    return (
        <Link to={"/" + mediaType + "/" + data.id} className="max-w-[230px] h-80 rounded relative block hover:scale-105 transition-all">
            {
                data.poster_path ? (
                    <img src={imageURL + data.poster_path} className="w-full h-full" />
                ) : (
                    <div className="bg-neutral-800 w-full h-full flex justify-center items-center">
                        No Image Found
                    </div>
                )
            }

            <div className="absolute top-4">
                {
                    trending && (
                        <div className="py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden">
                            #{index} Trending
                        </div>
                    )
                }
            </div>

            <div className="absolute bottom-0 w-full h-16 backdrop-blur-3xl bg-black/60 p-2">
                <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold">{data.title || data.name}</h2>
                <div className="text-sm text-neutral-400 flex justify-between items-center">
                    <p className="">{moment(data.release_date).format("MMMM Do YYYY")}</p>
                    <p className="bg-black px-2 py-1 rounded-lg text-xs text-white">Rating: {Number(data.vote_average)}</p>
                </div>
            </div>
        </Link>
    )
}

export default Card;