import axios from "axios";
import React, { use, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const ExplorePage = () => {
    const params = useParams();
    const [pageNo, setPageNo] = React.useState(1);
    const [data, setData] = React.useState([]);
    const [totalPageNo, setTotalPageNo] = React.useState(0);

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
            setTotalPageNo(response.data.total_pages);
        } catch (error) {

        }
    }

    const handleScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && pageNo < totalPageNo) {
            setPageNo((prev) => prev + 1);
        }
    }

    useEffect(() => {
        fetchData();
    }, [pageNo]);

    useEffect(() => {
        setPageNo(1);
        setData([]);
    }, [params.explore]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [totalPageNo]);

    return (
        <div className="pt-16  px-4">
            <div className="container mx-auto">
                <h3 className="capitalize text-lg lg:text-xl font-semibold my-2">Popular: {params.explore} show</h3>
                <div className="grid grid-cols-[repeat(auto-fit,_minmax(230px,1fr))] gap-4">
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