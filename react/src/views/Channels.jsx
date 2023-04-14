import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {PieChart, Pie, Tooltip} from "recharts";

export default function Channels() {
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        getChannels();
    }, [])

    const getChannels = () => {
        axiosClient.get('/channels')
            .then(({data}) => {
                console.log(data)
                setChannels(data.data)
            })
            .catch(() => {
                alert("Failed to fetch channels data!")
            })
    }

    const onDeleteClick = channel => {
        if (!window.confirm("Are you sure you want to delete this channel?")) {
            return
        }
        axiosClient.delete(`/channels/${channel.id}`)
            .then(() => {
                getChannels()
            })
    }

    return (
        <div>
            <Link to="/channels/new"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Add Channel
            </Link>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Channel name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        {channels.map(c => (
                            <tr key={c.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {c.name}
                                </td>
                                <td scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {c.id}
                                </td>
                                <td className="px-6 py-4">
                                    {c.quantity}
                                </td>
                                <td className="px-6 py-4">
                                    <Link to={'/channels/' + c.id}
                                          className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 mr-2">
                                        Edit
                                    </Link>
                                    <button type="button"
                                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                            onClick={ev => onDeleteClick(c)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <PieChart width={400} height={400}>
                <Pie
                    dataKey="quantity"
                    nameKey="name"
                    isAnimationActive={false}
                    data={channels}
                    cx={200}
                    cy={200}
                    outerRadius={80}
                    fill="#8884d8"
                    label
                />
                <Tooltip/>
            </PieChart>

        </div>
    )
}
