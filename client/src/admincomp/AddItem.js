import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Form, json, useNavigate } from 'react-router-dom';

function AddItem(props) {
  const {isadmin}=props;
  // const [email,setEmail]=useState("");
  // const [mobileNo,setMobileNo]=useState("");
  // const [password,setPassword]=useState("");
  // const [address,setAddress]=useState("");
  const [name, setName] = useState("");
  const [pi, setPi] = useState([]);
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if(price<0){
      alert("enter valid price");
      return;
    }
    if(!isadmin){
      alert("login first!");
      nav("/alogin");
      return;
    }
    var data = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("desc", desc);
    data.append("itemImage", pi);

    await axios.post('http://localhost:7000/api/additems', data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      console.log(res.data);
      if (res.data.status === "ok") {
        alert("added succesfully");

      } else if (res.data.status === "error") {
        alert("item already exists");
      }
    }).catch((err) => {
      console.log(err);
    });
    
    
  };
  
  const submit2 = async (e)=>{
    e.preventDefault();
    if(price<0){
      alert("enter valid price");
      return;
    }
    if(!isadmin){
      alert("login first!");
      nav("/alogin");
      return;
    }
    await axios.post("http://localhost:7000/api/upload",{
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: json
    })
  }

  useEffect(()=>{
    if(!isadmin){
      nav('/');
    }
  })
  return (
    <div className='mainlogin additem'>
      <div className='loginform ' style={{paddingTop:"50px"}}>

      {/* <form onSubmit={submit}>
        name:<input type="text" value={name} onChange={(e)=>setName(e.target.value)} /><br />
        email:<input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/><br />
        mobileNo: <input type="text" value={mobileNo} onChange={(e)=>setMobileNo(e.target.value)} /><br />
        password: <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} /><br />
        address: <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} /><br />
        profileimg: <input type="file" onChange={(e)=>{
            e.preventDefault();
            setPi(e.target.files[0]);
        }} /><br />
        <button type="submit">Submit</button>
      </form> */}
      <form onSubmit={submit} className="login">
        <div>
      <span>
        Name: <input  type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
      </span>
      <span>

        Desc: <input  type="text" value={desc} onChange={(e) => setDesc(e.target.value)} /><br />
      </span>
      <span>

        Price: <input  type="number" value={price} onChange={(e) => setPrice(e.target.value)} /><br />
      </span>
      <span>
        
        ItemImage: <input style={{fontSize:"1rem",borderRadius:"10px"}}  type="file" onChange={(e) => {
          e.preventDefault();
          setPi(e.target.files[0]);
        }} /><br />
      </span>
        <button className='btns' type="submit">Add Item</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default AddItem
