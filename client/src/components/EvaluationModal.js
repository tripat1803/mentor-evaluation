import React from 'react';

export default function EvaluationModal({closeModal=()=>{}, data}) {
    return (
        <>
            <div className='bg-white z-[15] w-[200px] rounded-md px-4 py-3 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <p className='text-lg font-semibold mb-2'>Report</p>
                <table className='w-full'>
                    <tbody>
                        <tr className=''>
                            <td>Ideation</td>
                            <td>{data?.ideation ? data?.ideation : 0}</td>
                        </tr>
                        <tr>
                            <td>Execution</td>
                            <td>{data?.execution ? data?.execution : 0}</td>
                        </tr>
                        <tr>
                            <td>Execution</td>
                            <td>{data?.execution ? data?.execution : 0}</td>
                        </tr>
                        <tr>
                            <td>Execution</td>
                            <td>{data?.execution ? data?.execution : 0}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div onClick={closeModal} className='absolute z-[13] top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)]'></div>
        </>
    );
}