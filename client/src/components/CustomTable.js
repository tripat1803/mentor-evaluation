import React from 'react';

export default function CustomTable({ columns, data, isLoading=false }) {

    return (
        <div className='w-full rounded-lg overflow-hidden text-sm'>
            <table className='w-full'>
                <thead className='bg-[#FAFAFA]'>
                    {
                        isLoading ? <tr className='border-b'>
                            <th className='w-full py-3'></th>
                        </tr> : <tr className='border-b'>
                            {
                                columns.map((item, index) => {
                                    return (
                                        <th key={index} style={item.width && {
                                            width: item.width
                                        }} className={`px-4 py-3 text-left border-x`}>
                                            {item.title}
                                        </th>
                                    )
                                })
                            }
                        </tr>
                    }
                </thead>
                <tbody className='text-[rgb(0,0,0,0.85)]'>
                    {
                        (data.length !== 0 && !isLoading) && data.map((item, parentIndex) => {
                            return (
                                <tr key={parentIndex} className={`${(parentIndex !== (data.length - 1)) && "border-b"} bg-white hover:bg-[#FAFAFA] duration-200`}>
                                    {
                                        columns.map((dataItem, index) => {
                                            let value = eval(String("item" + "." + dataItem.dataIndex));
                                            if (dataItem.dataIndex === 'autoIndex') {
                                                return (
                                                    <td key={`${index}_${item.key}`} className='px-4 py-3 text-left'>
                                                        {parentIndex + 1}.
                                                    </td>
                                                )
                                            } else {
                                                return (
                                                    <td key={`${index}_${item.key}`} className='px-4 py-3 text-left'>
                                                        {value ? String(value) : (dataItem.default && [dataItem.default][0](item))}
                                                    </td>
                                                )
                                            }
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            { (isLoading) && <div className='bg-white h-[150px] flex flex-col gap-2 px-4 py-2.5 justify-between text-sm text-[rgb(0,0,0,0.85)]'>
                <div className='animate-pulse py-1.5 bg-gray-100 w-[30%] rounded-sm'></div>
                <div className='animate-pulse py-1.5 bg-gray-100 w-[60%] rounded-sm'></div>
                <div className='animate-pulse py-1.5 bg-gray-100 w-full rounded-sm'></div>
                <div className='animate-pulse py-1.5 bg-gray-100 w-full rounded-sm'></div>
                <div className='animate-pulse py-1.5 bg-gray-100 w-full rounded-sm'></div>
                <div className='animate-pulse py-1.5 bg-gray-100 w-full rounded-sm'></div>
                <div className='animate-pulse py-1.5 bg-gray-100 w-full rounded-sm'></div>
            </div>}
            {(!isLoading && (data && data.length === 0)) && <div className='bg-white h-[150px] flex justify-center items-center text-sm text-[rgb(0,0,0,0.85)]'>
                <p>No data found</p>
            </div>}
        </div>
    );
}

// Format

// let columns = [
//     {
//         title: "Name",
//         dataIndex: "name",
//         key: 1,
//         width: 100,
//         fixed: "left"
//     },
//     {
//         title: "Age",
//         dataIndex: "age",
//         key: 2,
//         width: 100,
//         fixed: "left"
//     },
//     {
//         title: "Class",
//         dataIndex: "class",
//         key: 3,
//         default: () => <p>action</p>
//     },
//     {
//         title: "Subject",
//         dataIndex: "subject",
//         key: 4,
//         default: () => <p>action</p>
//     },
//     {
//         title: "Roll no",
//         dataIndex: "rollno",
//         key: 5,
//         fixed: 'right'
//     }
// ];

// let data = [
//     {
//         key: '1',
//         age: "18",
//         subject: "Maths",
//         class: "7th",
//         name: "Tripat",
//         rollno: "2110991455"
//     },
//     {
//         key: '1',
//         age: "19",
//         subject: "English",
//         class: "6th",
//         name: "Pratham",
//         rollno: "2110991477"
//     }
// ]