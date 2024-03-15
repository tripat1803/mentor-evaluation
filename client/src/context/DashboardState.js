import React, { createContext, useEffect, useState } from 'react';
import { Mentor_Id, privateAxios } from '../utils/api';

export const DashboardContext = createContext();

export default function DashboardState({ children }) {
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState([]);

    const fetchDashboard = () => {
        setLoader(true);
        privateAxios.get(`/api/score?id=${Mentor_Id}`).then((res) => {
            setData(res.data.data);
            setLoader(false);
        }).catch(() => {
            setLoader(false);
        })
    }

    useEffect(() => {
        fetchDashboard();
    }, []);

    return (
        <DashboardContext.Provider value={{ data, loader, fetchDashboard }}>
            {children}
        </DashboardContext.Provider>
    )
}
