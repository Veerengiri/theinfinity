import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../generalcomp/Loading'
// this conponent only show to main admin
function Admins(props) {
  const { isadmin } = props;
  const nav = useNavigate();
  // this is not changed
  const email = "virengirigoswami3@gmail.com"; // this is not changed
  const [admins, setAdmins] = useState([]);
  const showadmins = async (e) => {
    const admin = await fetch('http://localhost:7000/api/getallmalik', {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
    const data = await admin.json();
    setAdmins(data.admin);
  }
  const removeadmin = async (id) => {
    const admin = await fetch(`http://localhost:7000/api/removemalik/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
    const data = await admin.json();
    alert(data.status);
    document.getElementById('showadmin').click();
  }
  useEffect((e) => {
    document.getElementById('showadmin').click();
    if (!isadmin) {
      nav("/");
    }
  }, [])
  return (
    <div className='userorder'>

      <div className='tableadjust'>
        <button id='showadmin' style={{ display: "none" }} onClick={showadmins}>show admins</button>

        <div className=' tableheading admins'>
          <p style={{width:'300px'}}>AdminName</p>
          <p style={{width:'150px'}}>MobileNo</p>
          <p style={{width:'300px'}}>Email</p>
          <p style={{width:'200px'}}>Remove</p>
        </div>
        <div id='tablemargin' className='tablebody'  >

          {admins.length > 0 ? (admins.map((e, id) => {
            return (
              <div key={id} className='specificorders admins'>
                <p style={{width:'300px'}}>{e.name}</p>
                <p style={{width:'150px'}}>{e.mobileNo}</p>
                <p style={{width:'300px'}}>{e.email}</p>
                <button  style={{ width: "200px" }} className='ordermanage' disabled={e.email == email} onClick={(d) => {
                  d.preventDefault();
                  removeadmin(e._id);
                }}>remove admin</button>

              </div>
            )
          })) : (<Loading />)}
        </div>
      </div>
    </div>
  )
}

export default Admins
