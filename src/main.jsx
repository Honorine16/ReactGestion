import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter, } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Registration from './Components/Pages/Registration/Registration.jsx';
import OtpCode from './Components/Pages/OTPCode/OtpCode.jsx';
import Dashboard from './Components/Pages/Dashboard/Dashboard.jsx';
import CreateGroup from './Components/Pages/CreateGroup/CreateGroup.jsx';
import AddMember from './Components/Pages/AddMember/AddMember.jsx';
import ListGroup from './Components/Pages/ListGroup/ListGroup.jsx';
import Chat from './Components/Pages/Chat/Chat.jsx';
import Discussion from './Components/Pages/Discussion/Discussion.jsx';
import GroupList from './Components/Pages/GroupList/GroupList.jsx';
 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/otp-code/:email",
    element: <OtpCode />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/createGroup",
    element: <CreateGroup />,
  },
  {
    path: "/listGroup",
    element: <ListGroup />
  },
  {
    path: "/addMember",
    element: <AddMember />,
  },
  {
    path: "/discussion",
    element: <Discussion />
  },
  {
    path: "/groupList",
    element: <GroupList />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
