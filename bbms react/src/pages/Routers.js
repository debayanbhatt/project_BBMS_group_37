import React from 'react'
import { Route, Routes, } from "react-router-dom";
import ContributorAdd from './ContributorAdd';
import Dashboard from './Dashboard/Dashboard';
import Contributors from './Dashboard/Contributors';
import Doctors from './Dashboard/Doctors';
import Donors from './Dashboard/Donors';
import Inventorydash from './Dashboard/Inventorydash';
import Logout from './Dashboard/Logout';
import RequestAdd from './Dashboard/RequestAdd';
import Requests from './Dashboard/Requests';
import Home from './Home'

import LoginSignUp from './Login/LoginSignUp';
import Edit from './Dashboard/Edit';


export default function Routers(props) {
  return (
    <div>
      
       <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/Donors" element={<Donors />} />
        <Route path="dashboard/requests" element={<Requests />} />
        <Route path="dashboard/contributors" element={<Contributors />} />
        <Route path="dashboard/inventory" element={<Inventorydash />} />
        <Route path="dashboard/users" element={<Doctors />} />
        <Route path="contributors" element={<ContributorAdd />} />
        <Route path="login" element={<LoginSignUp />} />
        <Route path="dashboard/requests/add" element={<RequestAdd />} />
        <Route path="dashboard/logout" element={<Logout />} />
        <Route path="dashboard/edit" element={<Edit />} />

      </Routes>
    </div>
  )
}
