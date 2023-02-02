import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../generalcomp/Loading'
function Orders(props) {
    const { ci } = props;
    const [orders, setOrders] = useState([]);
    const [userid, setUserid] = useState("");
    // const [status,setStatus]=useState("unDeliverd");
    const nav = useNavigate();
    const getorders = async (d) => {
        d.preventDefault()
        if (userid == "") {
            nav("/");
            return;
        }
        const response = await fetch(`http://localhost:7000/api/showorders/${userid}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await response.json();
        if(data.showorders.length==0){
            setOrders([{
                itemName:"-"
            }]);
        }else{
            setOrders(data.showorders);
        }
    }
    const deleteorder = async (id,status) => {
        if(status==="Deliverd"){
            alert("this is deliverd this can't be delete");
            return;
        }
        else{

            if (!window.confirm("you want to Delete this order?")) {
                return;
            }
            const response = await fetch(`http://localhost:7000/api/deleteorder/${id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            const data = await response.json();
            alert(data.status);
            document.getElementById('orders').click();
        }
    }

    useEffect(() => {

        setOrders([]);
        setUserid(ci);
        setTimeout(() => {
            document.getElementById('orders').click();
        }, 500);

    }, [])
    return (
        <>

            <h1 style={{textAlign:"center",marginBottom:"0"}}>Your Orders</h1>
        <div className='userorder'>
            <div className='tableadjust'>

            <div className='tableheading'>
                <p>ItemName</p>
                <p>Qtn</p>
                <p>Price</p>
                <p>Total</p>
                <p>Time</p>
                <p>Date</p>
                <p>Status</p>
                <p style={{width:'150px'}}>Cancel</p>
            </div>
            <div className='tablebody' id='tablemargin2'>

                <button id='orders' style={{ display: "none" }} onClick={getorders}>orders</button>
                {orders.length > 0 ? (orders.map((e, id) => {

                    return (
                        <div key={id} className='specificorders' >
                            <h3>{e.itemName}</h3>
                            <p>{e.qtn}</p>
                            <p>{e.price}</p>
                            <p>{e.totalprice}</p>
                            <p>{e.time}</p>
                            <p>{e.date}</p>
                            <p>{e.deliverd}</p>

                            <button style={{width:'150px'}} className='ordermanage' onClick={(d) => {
                                d.preventDefault();
                                
                                deleteorder(e.id,e.deliverd);
                            }}>Cancle Order</button>
                        </div>
                    )
                })) : (<Loading/>)}
            </div>
            </div>
        </div>
        </>
    )
}

export default Orders
