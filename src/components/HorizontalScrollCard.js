import React, { useRef } from "react";
import Card from "./Card";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const HorizontalScrollCard = ({ data = [], heading, trending, media_type }) => {
    const containerRef = useRef();

    const handlePrevious = () => {
        containerRef.current.scrollLeft -= 300;
    }

    const handleNext = () => {
        containerRef.current.scrollLeft += 300;
    }

    return (
        <div className="container mx-auto px-5 my-10">
            <h2 className="text-xl lg:text-2xl font-bold mb-2 text-white">{heading}</h2>
            <div className="relative">
                <div ref={containerRef} className="grid grid-cols-[repeat(auto-fit,_230px)] auto-cols-max grid-flow-col gap-4 overflow-x-scroll lg:overflow-hidden scroll-smooth transition-all">
                    {
                        data.map((data, index) => {
                            return (
                                <Card key={data.id + "heading" + index} data={data} index={index + 1} trending={trending} media_type={media_type} />
                            )
                        })
                    }
                </div>
                <div className="absolute hidden w-full h-full top-0 lg:flex justify-between items-center pointer-events-none">
                    <button onClick={handlePrevious} className="bg-white p-1 text-black rounded-full ml-1 pointer-events-auto" >
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleNext} className="bg-white p-1 text-black rounded-full mr-1 pointer-events-auto" >
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HorizontalScrollCard;