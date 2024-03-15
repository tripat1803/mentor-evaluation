import React, { createContext, useEffect, useState } from 'react';
import { Mentor_Id, privateAxios } from '../utils/api';

export const DashboardContext = createContext();

export default function DashboardState({ children }) {
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const fetchDashboard = () => {
        setLoader(true);
        privateAxios.get(`/api/score?id=${Mentor_Id}`).then((res) => {
            setData(res.data.data);
            setFilteredData(res.data.data);
            setLoader(false);
        }).catch(() => {
            setLoader(false);
        })
    }

    const filterData = (status) => {
        if(status === 'all'){
            return setFilteredData(data);
        }
        setFilteredData(data.filter((item) => item.status === status));
    }

    useEffect(() => {
        fetchDashboard();
    }, []);

    return (
        <DashboardContext.Provider value={{ data, loader, fetchDashboard, filterData, filteredData }}>
            {children}
        </DashboardContext.Provider>
    )
}
