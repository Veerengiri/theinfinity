import { BrowserRouter, Route, Routes } from "react-router-dom"

import logo from './logo.svg';
import './App.css';
import Register from './usercomp/Register';
import Login from './usercomp/Login';
import AddItem from './admincomp/AddItem';
import ARegister from './admincomp/Register'
import ALogin from './admincomp/Login'
import Item from './generalcomp/Item';
import Orders from './usercomp/Orders';
import Cart from './usercomp/Cart';
import Profile from './usercomp/Profile';
import AOrders from './admincomp/Orders';
import Customers from './admincomp/Customers';
import AProfile from './admincomp/Profile';
import Admins from './admincomp/Admins';
import Nas from './generalcomp/Nas';
import Navbar from "./generalcomp/Navbar";
import Footer from "./generalcomp/Footer";
import Home from "./generalcomp/Home";

import { useEffect, useState } from "react";


function App() {
  const [customerid,setCustomerid]=useState("");
  const [customeremail,setCustomeremail]=useState("");
  const [adminid,setAdminid]=useState("");
  const [iscustomer,setIscustomer]=useState(false);
  const [isadmin,setIsadmin]=useState(false);
  const mae = "virengirigoswami3@gmail.com";
  const [ismainadmin,setIsmainadmin]=useState(false);
  
  const logout=()=>{
    setCustomerid("");
    setAdminid("");
    setCustomeremail("");
    setIsadmin(false);
    setIscustomer(false);
    setIsmainadmin(false);
    window.localStorage.removeItem('emailforuser');
    window.localStorage.removeItem('customerid');
  }
  const logouta=()=>{
    setCustomerid("");
    setAdminid("");
    setCustomeremail("");
    setIsadmin(false);
    setIscustomer(false);
    setIsmainadmin(false);
    window.localStorage.removeItem('adminid');
    window.localStorage.removeItem('emailforadmin');
  }
  useEffect(()=>{
    // setCustomerid("");
    // setAdminid("");
    // setCustomeremail("");
    // setIsadmin(false); 
    // setIscustomer(false);
    // setIsmainadmin(false);
    const a = window.localStorage.getItem('emailforuser');
    const b = window.localStorage.getItem('customerid');
    const c = window.localStorage.getItem('adminid');
    const d = window.localStorage.getItem('emailforadmin');
    if(a && b && c && d){
      if(d==mae){
        setIsmainadmin(true);
      }
      setAdminid(c);
      setIsadmin(true);
      return;
    }
    if(a && b){
      setCustomeremail(a);
      setCustomerid(b);
      setIscustomer(true);
      return;
    }
    if(c && d){
      if(d==mae){
        setIsmainadmin(true);
      }
      setAdminid(c);
      setIsadmin(true);
      return;
    }
  },[])
  return (
    <>
      <BrowserRouter>
        <Navbar  iscustomer={iscustomer} isadmin={isadmin} ismainadmin={ismainadmin} logout={logout} logouta={logouta}/>
        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <Item isadmin={isadmin} iscustomer={iscustomer} ci={customerid} customeremail={customeremail}/>
              <Nas isadmin={isadmin}  iscustomer={iscustomer} />
              
            </>
          } />
          <Route path="/profile" element={<Profile ci={customerid} ic={iscustomer}/>} />
          <Route path="/orders" element={<Orders ci={customerid} ic={iscustomer}/>} />
          <Route path="/cart" element={<Cart ci={customerid} ic={iscustomer}/>} />
          <Route path="/news" element={<Nas isadmin={isadmin}/>} />
          <Route path="/aorders" element={<AOrders isadmin={isadmin}/>} />
          <Route path="/customers" element={<Customers isadmin={isadmin}/>} />
          <Route path="/additem" element={<AddItem isadmin={isadmin}/>} />
          <Route path="/aprofile" element={<AProfile ai={adminid} isadmin={isadmin}/>} />
          <Route path="/items" element={<Item isadmin={isadmin} iscustomer={iscustomer}/>} />
          <Route path="/login" element={<Login setCustomerid={setCustomerid} setIscustomer={setIscustomer} setCustomeremail={setCustomeremail}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/alogin" element={<ALogin sai={setAdminid} isadmin={setIsadmin} mae={mae} ismainadmin={setIsmainadmin}/>} />
          <Route path="/aregister" element={<ARegister isadmin={ismainadmin}/>} />
          <Route path="/admins" element={<Admins isadmin={ismainadmin}/>} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
