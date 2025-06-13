import axios from "axios";
import React, { use, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const ExplorePage = () => {
    const params = useParams();
    const [pageNo, setPageNo] = React.useState(1);
    const [data, setData] = React.useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/discover/${params.explore}`, {
                params: {
                    page: pageNo,
                }
            });

            setData((prev) => {
                return [
                    ...prev,
                    ...response.data.results
                ]
            })
        } catch (error) {

        }
    }

    const handleScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            setPageNo((prev) => prev + 1);
        }
    }

    useEffect(() => {
        fetchData();
    }, [pageNo]);

    useEffect(() => {
        setPageNo(1);
        setData([]);
        fetchData();
    }, [params.explore]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [pageNo]);

    return (
        <div className="pt-16  px-4">
            <div className="container mx-auto">
                <h3 className="capitalize text-lg lg:text-xl font-semibold my-2">Popular: {params.explore} show</h3>
                <div className="grid grid-cols-[repeat(auto-fit,_230px)] gap-4 justify-center lg:justify-start" >
                    {
                        data.map((exploreData, index) => {
                            return (
                                <Card data={exploreData} key={exploreData.id + "exploreSection"} media_type={params.explore} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ExplorePage;