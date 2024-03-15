import React, { useContext, useState } from 'react';
import CustomTable from '../components/CustomTable';
import { DashboardContext } from '../context/DashboardState';
import { FaTrash } from "react-icons/fa6";
import { privateAxios } from '../utils/api';
import toast from 'react-hot-toast';
import EvaluationModal from '../components/EvaluationModal';

export default function Dashboard() {
    let { data, loader, fetchDashboard } = useContext(DashboardContext);
    const [deleteLoader, setDeleteLoader] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const handleDeleteEvaluation = (id) => {
        setDeleteLoader(true);
        privateAxios.delete(`/api/score?id=${id}`).then(() => {
            toast.success("Student removed from evaluation");
            fetchDashboard();
            setDeleteLoader(false);
        }).catch(() => {
            toast.error("Error removing student from evaluation");
            setDeleteLoader(false);
        });
    }

    let columns = [
        {
            title: "S.no.",
            dataIndex: "autoIndex",
            key: "index",
            width: 100,
        },
        {
            title: "Roll No.",
            dataIndex: "rollNo",
            key: "rollNo"
        },
        {
            title: "Status",
            key: "status",
            default: (data) => {
                return <p style={(data.status === "pending") ? {
                    color: "#DECC28"
                } : {
                    color: "green"
                }}>{String(data.status[0]).toUpperCase() + String(data.status).slice(1)}</p>
            }
        },
        {
            title: "Final Score",
            key: "final",
            default: (data) => {
                return 0
            }
        },
        {
            title: "Action",
            key: "action",
            default: (data) => {
                return <div className='flex gap-1.5 items-center'>
                    <button disabled={deleteLoader} onClick={() => {
                        handleDeleteEvaluation(data._id);
                    }}><FaTrash size={16} className='text-[red]' /></button>
                    <button onClick={() => {
                        setOpenModal(true);
                    }}>Edit</button>
                    <button>Show</button>
                </div>
            }
        }
    ];

    return (
        <>
            <div className='bg-white rounded-md px-3 py-4 drop-shadow-lg m-4 flex flex-col gap-3'>
                <div className='flex items-center gap-2 justify-between'>
                    <h3 className='font-semibold'>Students Evaluation</h3>
                    <button className='text-sm px-3 py-1 bg-[rgb(30,30,30)] text-white rounded-md'>Submit</button>
                </div>
                <div className='flex flex-col gap-2'>
                    <input type='text' placeholder='Search' className='outline-none rounded-md border px-2 py-1 text-sm border-[rgba(0,0,0,0.1)] w-[35%] placeholder:text-sm' />
                    <CustomTable columns={columns} data={data} isLoading={loader} />
                </div>
            </div>
            {
                openModal && <EvaluationModal closeModal={() => setOpenModal(false)} />
            }
        </>
    )
}