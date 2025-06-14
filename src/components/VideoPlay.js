import React from "react";
import { IoClose } from "react-icons/io5";
import useFetchDetails from "../hooks/useFetchDetails";

const VideoPlay = ({ data, close, media_type }) => {
    const { data: videoData } = useFetchDetails(`/${media_type}/${data.id}/videos`);
    console.log(videoData);

    return (
        <section className="fixed bg-neutral-700 top-0 right-0 left-0 bottom-0 bg-opacity-50 flex justify-center items-center">
            <div className="bg-black w-full h-[40vh] lg:h-[80vh] max-w-screen-lg rounded relative">
                <button onClick={() => close()} className="absolute right-0 top-0 text-3xl"> <IoClose /></button>

                <iframe src={`https://www.youtube.com/embed/${videoData.results?.[0].key}`} className="w-full h-full" />
            </div>
        </section>
    )
}

export default VideoPlay;