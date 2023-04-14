import {createBrowserRouter, Navigate} from "react-router-dom";
import DefaultLayout from "./src/components/DefaultLayout.jsx";
import NotFound from "./src/views/NotFound.jsx";
import Channels from "./src/views/Channels.jsx";
import ChannelForm from "./src/views/ChannelForm.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/channels" />
            },
            {
                path: 'channels',
                element: <Channels />
            },
            {
                path: '/channels/new',
                element: <ChannelForm key="channelCreate" />
            },
            {
                path: '/channels/:id',
                element: <ChannelForm key="channelUpdate" />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])

export default router;
