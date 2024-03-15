import React, { useContext, useEffect, useState } from 'react';
import CustomTable from '../components/CustomTable';
import { Mentor_Id, privateAxios } from '../utils/api';
import toast from 'react-hot-toast';
import { DashboardContext } from '../context/DashboardState';
import { TiTick } from "react-icons/ti";

export default function Students() {
    let dashboard = useContext(DashboardContext);
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [selected, setSelected] = useState([]);
    const [buttonLoader, setButtonLoader] = useState(false);
    let columns = [
        {
            title: "",
            key: "select",
            width: 50,
            default: (data) => (
                (data.underEvaluation.length !== 0) ? <TiTick size={20} className='text-[green]' /> : <input disabled={((dashboard.data?.length + selected.length) === 4) && (selected.filter((item) => item._id === data._id).length === 0)} type='checkbox' onChange={(e) => {
                    if (selected.length > 4) {
                        toast.error("You cannot select more than 4");
                        return;
                    }
                    if (e.target.checked) {
                        setSelected((prev) => [...prev, data]);
                    } else {
                        setSelected((prev) => [...prev.filter((item) => item._id !== data._id)]);
                    }
                }} />
            )
        },
        {
            title: "S.no.",
            dataIndex: "autoIndex",
            key: "index",
            width: 100,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: 200,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Mobile No.",
            dataIndex: "mobileNumber",
            key: "mobileNumber"
        },
        {
            title: "Roll No.",
            dataIndex: "rollNo",
            key: "rollNo"
        }
    ]

    const fetchStudents = () => {
        setLoader(true);
        privateAxios.get("/api/user/student").then((res) => {
            setData(res.data.data);
            setLoader(false);
        }).catch(() => {
            setLoader(false);
        })
    }

    const addToEvaluation = () => {
        setButtonLoader(true);
        privateAxios.post("/api/score/", {
            mentor_id: Mentor_Id,
            students: selected
        }).then((res) => {
            toast.success("Students added for evaluation");
            fetchStudents();
            dashboard.fetchDashboard();
            setButtonLoader(false);
        }).catch(() => {
            toast.error("Error adding students for evaluation");
            setButtonLoader(false);
        })
    }

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className='bg-white rounded-md px-3 py-4 drop-shadow-lg m-4 flex flex-col gap-3'>
            <div>
                <h3 className='font-semibold'>All Students</h3>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2 justify-between'>
                    <input type='text' placeholder='Search' className='outline-none rounded-md border px-2 py-1 text-sm border-[rgba(0,0,0,0.1)] w-[35%] placeholder:text-sm' />
                    <button onClick={addToEvaluation} disabled={buttonLoader || (selected.length === 0) || ((dashboard.data?.length + selected.length) < 3) || ((dashboard.data?.length) === 4)} className='px-3 py-1 disabled:bg-[gray] bg-[rgb(30,30,30)] text-white text-xs rounded-md'>Add</button>
                </div>
                <CustomTable columns={columns} data={data} isLoading={loader} />
            </div>
        </div>
    )
}
