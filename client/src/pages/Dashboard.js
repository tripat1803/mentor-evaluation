import React, { useContext, useState } from 'react';
import CustomTable from '../components/CustomTable';
import { DashboardContext } from '../context/DashboardState';
import { FaTrash } from "react-icons/fa6";
import { privateAxios } from '../utils/api';
import toast from 'react-hot-toast';
import EvaluationModal from '../components/EvaluationModal';
import { TiTick } from 'react-icons/ti';
import { HiPencilAlt } from "react-icons/hi";

export default function Dashboard() {
    let { data, loader, fetchDashboard } = useContext(DashboardContext);
    const [deleteLoader, setDeleteLoader] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [showData, setShowData] = useState({
        data: {
            ideation: 0,
            execution: 0,
            viva: 0,
            pitch: 0
        },
        id: "",
        editable: true
    });
    const [selected, setSelected] = useState([]);
    const [lockLoader, setLockLoader] = useState(false);

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

    const handleLock = () => {
        setLockLoader(true);
        privateAxios.post(`/api/score/lock`, { selectedIds: selected }).then(() => {
            setLockLoader(false);
            fetchDashboard();
            toast.success("Evaluation locked successfully");
        }).catch(() => {
            toast.error("Error locking evaluation");
            setLockLoader(false);
        });
    }

    let columns = [
        {
            title: "",
            key: "select",
            width: 50,
            default: (data) => {
                let check = !data?.scores?.ideation || data?.scores?.ideation === 0 || !data?.scores?.execution || data?.scores?.execution === 0 || !data?.scores?.viva || data?.scores?.viva === 0 || !data?.scores?.pitch || data?.scores?.pitch === 0;
                return (data.status === 'completed') ? <TiTick size={20} className='text-[green]' /> : <input disabled={check} type='checkbox' onChange={(e) => {
                    if (e.target.checked) {
                        setSelected((prev) => [...prev, data]);
                    } else {
                        setSelected((prev) => [...prev.filter((item) => item._id !== data._id)]);
                    }
                }} />
            }
        },
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
                return parseInt(data?.scores?.ideation || 0) + parseInt(data?.scores?.execution || 0) + parseInt(data?.scores?.viva || 0) + parseInt(data?.scores?.pitch || 0);
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
                    {(data.status !== "completed") && <button onClick={() => {
                        setShowData({
                            data: data.scores,
                            id: data._id
                        })
                        setOpenModal(true);
                    }}><HiPencilAlt size={18} className='text-[blue]'/></button>}
                    <button onClick={() => {
                        setShowData({
                            data: data.scores,
                            id: data._id,
                            editable: false
                        })
                        setOpenModal(true);
                    }}>Show</button>
                </div>
            }
        }
    ];

    return (
        <>
            <div className='bg-white rounded-md px-3 py-4 drop-shadow-lg m-4 flex flex-col gap-3'>
                <div className='flex items-center gap-2 justify-between'>
                    <h3 className='font-semibold'>Students Evaluation</h3>
                    <button disabled={lockLoader || (selected.length === 0)} onClick={handleLock} className='text-sm px-3 py-1 disabled:bg-[gray] bg-[rgb(30,30,30)] text-white rounded-md'>Submit</button>
                </div>
                <div className='flex flex-col gap-2'>
                    <input type='text' placeholder='Search' className='outline-none rounded-md border px-2 py-1 text-sm border-[rgba(0,0,0,0.1)] w-[35%] placeholder:text-sm' />
                    <CustomTable columns={columns} data={data} isLoading={loader} />
                </div>
            </div>
            {
                openModal && <EvaluationModal editable={showData.editable} data={showData.data} evaluationId={showData.id} closeModal={() => setOpenModal(false)} />
            }
        </>
    )
}