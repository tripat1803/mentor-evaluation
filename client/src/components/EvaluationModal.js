import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { IoDownloadOutline } from "react-icons/io5";
import { privateAxios } from '../utils/api';
import toast from 'react-hot-toast';
import { DashboardContext } from '../context/DashboardState';

export default function EvaluationModal({ closeModal = () => { }, data, evaluationId, editable }) {
    let { fetchDashboard } = useContext(DashboardContext);
    const [values, setValues] = useState({
        ideation: data?.ideation || 0,
        execution: data?.execution || 0,
        pitch: data?.pitch || 0,
        viva: data?.viva || 0
    });
    const [loader, setLoader] = useState(false);
    const [total, setTotal] = useState(0);

    const handleSubmit = () => {
        if(!editable) return;
        if (!evaluationId) {
            toast.error("Error at client side");
            return;
        }
        if(Object.values(values).some((item) => item < 0 || item > 10)){
            toast.error("Score should be between 1 and 10");
            return;
        }
        setLoader(true);
        privateAxios.put(`/api/score`, { ...values, evaluationId }).then(() => {
            setLoader(false);
            fetchDashboard();
            toast.success("Evaluation scores updated successfully");
            closeModal();
        }).catch(() => {
            toast.error("Error updating evaluation scores");
            setLoader(false);
        });
    }

    useEffect(() => {
        setValues(data);
    }, [data]);

    useEffect(() => {
        if(values){
            setTotal(0);
            setTotal(parseInt(values?.ideation || 0) + parseInt(values?.execution || 0) + parseInt(values?.pitch || 0) + parseInt(values?.viva || 0));
        }
    }, [values]);

    return (
        <>
            <div className='bg-white z-[15] w-[300px] rounded-md px-4 py-3 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <div className='flex items-center gap-2 justify-between pb-2'>
                    <p className='text-lg font-semibold mb-2'>Report</p>
                    <button><IoDownloadOutline size={18} /></button>
                </div>
                <table className='w-full border-spacing-y-[10px]'>
                    <tr>
                        <td className='pr-6'>Ideation</td>
                        <td>
                            <input disabled={!editable} className='border outline-none px-2 w-full' value={values?.ideation} onChange={(e) => {
                                setValues({ ...values, ideation: e.target.value });
                            }} type='number' />
                        </td>
                    </tr>
                    <tr>
                        <td className='pr-6'>Execution</td>
                        <td>
                            <input disabled={!editable} className='border outline-none px-2 w-full' value={values?.execution} onChange={(e) => {
                                setValues({ ...values, execution: e.target.value });
                            }} type='number' />
                        </td>
                    </tr>
                    <tr>
                        <td className='pr-6'>Pitch</td>
                        <td>
                            <input disabled={!editable} className='border outline-none px-2 w-full' value={values?.pitch} onChange={(e) => {
                                setValues({ ...values, pitch: e.target.value });
                            }} type='number' />
                        </td>
                    </tr>
                    <tr className='mb-4'>
                        <td className='pr-6'>Viva</td>
                        <td>
                            <input disabled={!editable} className='border outline-none px-2 w-full' value={values?.viva} onChange={(e) => {
                                setValues({ ...values, viva: e.target.value });
                            }} type='number' />
                        </td>
                    </tr>
                    <tr className='border-t border-[#000]'>
                        <td className='pr-6'>Total</td>
                        <td>{total}/40</td>
                    </tr>
                </table>
                {editable && <div className='flex justify-end'>
                    <button onClick={handleSubmit} disabled={loader} className='px-3 py-1 bg-[#000] text-white text-xs rounded-md'>Submit</button>
                </div>}
            </div>
            <div onClick={closeModal} className='absolute z-[13] top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)]'></div>
        </>
    );
}