import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

export default function ChannelForm() {

    const navigate = useNavigate();
    let {id} = useParams();
    const [channel, setChannel] = useState({
        id: null,
        name: '',
        quantity: ''
    })

    const [errors, setErrors] = useState(null)

    if (id) {
        useEffect(() => {
            axiosClient.get(`/channels/${id}`)
                .then(({data}) => {
                    setChannel(data)
                })
                .catch(() => {
                    alert("Failed to fetch channels data!")
                })
        })
    }

    const onSubmit = ev => {
        ev.preventDefault()
        if (channel.id) {
            axiosClient.put(`/channels/${channel.id}`, channel)
                .then(() => {
                    navigate('/channels')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        } else {
            axiosClient.post('/channels', channel)
                .then(() => {
                    navigate('/channels')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        }
    }

    return (
        <>
            {channel.id && <h1>Update Channel: {channel.name}</h1>}
            {!channel.id && <h1>New Channel</h1>}
            <div>
                {errors &&
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                <form onSubmit={onSubmit}>
                    <input value={channel.name} onChange={ev => setChannel({...channel, name: ev.target.value})} placeholder="Name"/>
                    <input value={channel.quantity} onChange={ev => setChannel({...channel, quantity: ev.target.value})} placeholder="Quantity"/>
                    <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">
                        Save
                    </button>
                </form>
            </div>
        </>
    )
}
