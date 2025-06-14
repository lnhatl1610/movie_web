import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";

const SearchPage = () => {
    const location = useLocation();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageNo, setPageNo] = React.useState(1);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get(`/search/multi`, {
                params: {
                    query: location.search.slice(3),
                    page: page
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

    useEffect(() => {
        setPage(1);
        setData([]);
        fetchData();
    }, [location.search]);

    useEffect(() => {
        fetchData();
    }, [pageNo]);

    const handleScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            setPageNo((prev) => prev + 1);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [pageNo]);

    return (
        <div className="py-16 px-4">
            <div className="lg:hidden my-2 sticky top-16 z-10">
                <input type="text" placeholder="Search here..." onChange={(e) => navigate(`/search?q=${e.target.value}`)} className="px-4 py-1 text-lg w-full bg-white outline-none rounded-full" />
            </div>

            <div className="container mx-auto">
                <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">Search Results</h3>

                <div className="grid grid-cols-[repeat(auto-fit,_230px)] gap-4 justify-center lg:justify-start">
                    {
                        data.map((searchData, index) => {
                            return (
                                <Card data={searchData} key={searchData.id + "search"} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchPage;