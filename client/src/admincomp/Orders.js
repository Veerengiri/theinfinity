import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../generalcomp/Loading';

function Orders(props) {

    const { isadmin } = props;
    const nav = useNavigate()
    const [orders, setOrders] = useState([]);
    const [ordersd, setOrdersd] = useState([]);
    const [ordersud, setOrdersud] = useState([]);
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("");
    const getorders = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:7000/api/showalloreders`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await response.json();
        if (data.showorders.length == 0) {
            setOrders([{
                itemName: "-"
            }])
        } else {
            setOrders(data.showorders);

        }
        setSearch("");

        setTimeout(() => {
            document.getElementById('ordersd').click();
            document.getElementById('ordersud').click();
        }, 1000);
    }
    const searchorders = async (e) => {
        e.preventDefault();
        if (search == "") {
            document.getElementById('orders').click();
            document.getElementById('ordersd').click();
            document.getElementById('ordersud').click();
            return;
        }
        const response = await fetch(`http://localhost:7000/api/searchorders/${search}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await response.json();
        if (data.showorders.length == 0) {
            setOrders([{
                itemName: "-"
            }])
        } else {
            setOrders(data.showorders);

        }
        setTimeout(() => {
            document.getElementById('ordersd').click();
            document.getElementById('ordersud').click();
        }, 1000);
    }
    const searchbydate = async () => {

        // 2022-10-07  27/10/2022
        let a = [];
        let dt = (date.charAt(8) == '0' ? '' : date.charAt(8)) + date.charAt(9) + '/' + (date.charAt(5) == '0' ? '' : date.charAt(5)) + date.charAt(6) + '/' + date.charAt(0) + date.charAt(1) + date.charAt(2) + date.charAt(3);
        // console.log(dt)
        for (let i = 0; i < orders.length; i++) {
            if (dt == orders[i].date) {
                a.push(orders[i]);
            }
        }
        if (a.length == 0) {
            setOrders([{
                itemName: "-"
            }])
        } else {
            setOrders(a);

        }
        setTimeout(() => {
            document.getElementById('ordersd').click();
            document.getElementById('ordersud').click();
        }, 500);
    }

    // for (int i = 0; i < length; i++) {     
    //     for (int j = i+1; j < length; j++) {     
    //        if(arr[i] > arr[j]) {    
    //            temp = arr[i];    
    //            arr[i] = arr[j];    
    //            arr[j] = temp;    
    //        }     
    //     }     
    // }    
    const sortbypriceInc = () => {
        let a = orders;
        for (let i = 0; i < a.length; i++) {
            for (let j = i + 1; j < a.length; j++) {
                if (a[i].totalprice > a[j].totalprice) {
                    let temp = a[i];
                    a[i] = a[j];
                    a[j] = temp;
                }
            }
        }
        if (a.length == 0) {
            setOrders([{
                itemName: "-"
            }])
        } else {
            setOrders(a);

        }
        document.getElementById('sortby').style.display = "none";
        setTimeout(() => {
            document.getElementById('ordersd').click();
            document.getElementById('ordersud').click();
        }, 1000);
        // console.log(a);
    }
    const sortbypriceDesc = () => {
        let a = orders;
        for (let i = 0; i < a.length; i++) {
            for (let j = i + 1; j < a.length; j++) {
                if (a[i].totalprice < a[j].totalprice) {
                    let temp = a[i];
                    a[i] = a[j];
                    a[j] = temp;
                }
            }
        }
        if (a.length == 0) {
            setOrders([{
                itemName: "-"
            }])
        } else {
            setOrders(a);

        }
        document.getElementById('sortby').style.display = "none";
        setTimeout(() => {
            document.getElementById('ordersd').click();
            document.getElementById('ordersud').click();
        }, 1000);
    }
    const sortbyName = () => {
        let a = orders;
        for (let i = 0; i < a.length; i++) {
            for (let j = i + 1; j < a.length; j++) {
                if (a[i].itemName > a[j].itemName) {
                    let temp = a[i];
                    a[i] = a[j];
                    a[j] = temp;
                }
            }
        }
        if (a.length == 0) {
            setOrders([{
                itemName: "-"
            }])
        } else {
            setOrders(a);

        }
        document.getElementById('sortby').style.display = "none";
        setTimeout(() => {
            document.getElementById('ordersd').click();
            document.getElementById('ordersud').click();
        }, 1000);
    }
    const sortbyTime = () => {
        let a = orders;
        for (let i = 0; i < a.length; i++) {
            for (let j = i + 1; j < a.length; j++) {
                if (a[i].sorttime < a[j].sorttime) {
                    let temp = a[i];
                    a[i] = a[j];
                    a[j] = temp;
                }
            }
        }
        if (a.length == 0) {
            setOrders([{
                itemName: "-"
            }])
        } else {
            setOrders(a);

        }
        document.getElementById('sortby').style.display = "none";
        setTimeout(() => {
            document.getElementById('ordersd').click();
            document.getElementById('ordersud').click();
        }, 1000);
    }
    const sortbyTimeR = () => {
        let a = orders;
        for (let i = 0; i < a.length; i++) {
            for (let j = i + 1; j < a.length; j++) {
                if (a[i].sorttime > a[j].sorttime) {
                    let temp = a[i];
                    a[i] = a[j];
                    a[j] = temp;
                }
            }
        }
        if (a.length == 0) {
            setOrders([{
                itemName: "-"
            }])
        } else {
            setOrders(a);

        }
        document.getElementById('sortby').style.display = "none";
        setTimeout(() => {
            document.getElementById('ordersd').click();
            document.getElementById('ordersud').click();
        }, 1000);
    }
    const getordersdeliverd = async (e) => {
        // e.preventDefault()
        // const response = await fetch(`http://localhost:7000/api/orderdeliverd`, {
        //     method: "GET",
        //     headers: {
        //         "content-type": "application/json"
        //     }
        // })
        // const data = await response.json();

        // setOrdersd(data.showorders);
        let a = [];
        for (let i = 0; i < orders.length; i++) {
            if (orders[i].deliverd) {
                a.push(orders[i]);
            }
        }
        // console.log(a)
        if (a.length == 0) {
            setOrdersd([{
                itemName: "-"
            }])
        } else {
            setOrdersd(a);

        }

    }
    const getordersundeliverd = async (e) => {
        // e.preventDefault()
        // const response = await fetch(`http://localhost:7000/api/orderundeliverd`, {
        //     method: "GET",
        //     headers: {
        //         "content-type": "application/json"
        //     }
        // })
        // const data = await response.json();
        // setOrdersud(data.showorders);
        let a = [];
        for (let i = 0; i < orders.length; i++) {
            if (!orders[i].deliverd) {
                a.push(orders[i]);
            }
        }
        // console.log(a)
        if (a.length == 0) {
            setOrdersud([{
                itemName: "-"
            }])
        } else {
            setOrdersud(a);

        }
    }

    const deliverdtrue = async (id) => {
        const response = await fetch(`http://localhost:7000/api/deliverdtrue/${id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await response.json();

        document.getElementById('orders').click();
        document.getElementById('ordersd').click();
        document.getElementById('ordersud').click();
    }

    useState(async (e) => {
        setTimeout(() => {
            document.getElementById('allo').style.display = "none";
            document.getElementById('do').style.display = "none";
            document.getElementById('udo').style.display = "unset";
            document.getElementById('sortby').style.display = "none";
            document.getElementById('orders').click();
            setTimeout(() => {
                document.getElementById('ordersd').click();
                document.getElementById('ordersud').click();
            }, 1000);

            setTimeout(() => {
                if (ordersd.length === 0 && ordersud.length === 0) {
                    document.getElementById('ordersd').click();
                    document.getElementById('ordersud').click();
                    // console.log("interval");

                }
            }, 5000);
        }, 0);
    }, [])
    useEffect(() => {
        if (!isadmin) {
            nav('/');
        }
    })
    return (
        <div >
            <button id='orders' style={{ display: "none" }} onClick={getorders}>Get All Orders</button>
            <button id='ordersd' style={{ display: "none" }} onClick={getordersdeliverd}>deliverd</button>
            <button id='ordersud' style={{ display: "none" }} onClick={getordersundeliverd}>undeliverd</button>


        

            <div className='manageadminorder'>
                <div>
                    <div>
                        <input placeholder='Search here' type="search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                        <button className='btns' onClick={searchorders}><img className='smallicon' src="http://cdn-icons-png.flaticon.com/128/149/149852.png" alt="" /></button>
                    </div>
                    <div>
                        <input placeholder='search' id='date' type="date" onChange={(e) => { setDate(e.target.value) }} />
                        <button className='btns' onClick={searchbydate} >search by date</button>
                    </div>

                </div>
                <div><button className='btns' onClick={() => { document.getElementById('sortby').style.display = "flex"; }}>Sortby ⬇</button></div>
            </div>
            <div className='sortby' id='sortby'>

                <button onClick={sortbyTime}>Newest</button>
                <button onClick={sortbyTimeR}>Oldest</button>
                <button onClick={sortbypriceInc}>Price-Inc</button>
                <button onClick={sortbypriceDesc}>Price-Desc</button>
                <button onClick={sortbyName}>name</button>
            </div>



            <div className='userorder'>
                <div className='tableadjust'>
                <div className='ordercatagory'>

                    <button onClick={() => {
                        document.getElementById('allo').style.display = "none";
                        document.getElementById('do').style.display = "none";
                        document.getElementById('udo').style.display = "unset";
                    }}>Undeliverd</button>
                    <button onClick={() => {
                        document.getElementById('allo').style.display = "none";
                        document.getElementById('do').style.display = "unset";
                        document.getElementById('udo').style.display = "none";

                    }}>Deliverd</button>
                    <button onClick={() => {
                        document.getElementById('allo').style.display = "unset";
                        document.getElementById('do').style.display = "none";
                        document.getElementById('udo').style.display = "none";
                    }}>All orders</button>
                </div>


                    <div className='adminorderheading'>
                        <div className='tableheading' style={{ marginTop: "2px" }}>
                            <p>Item</p>
                            <p style={{width:"50px"}}>Qtn</p>
                            <p style={{width:"50px"}}>Price</p>
                            <p style={{width:"50px"}}>Total</p>
                            <p style={{width:"50px"}}>Time</p>
                            <p >Date</p>
                            <p  style={{width:"200px"}}>Cutomer</p>
                            <p>MobileNo</p>
                            <p style={{ width: "250px" }}>Address</p>
                            <p>Status</p>
                            <p>Update</p>
                        </div>
                    </div>

                    <div className='tablebody'>


                        <div id='allo'  >
                            {orders.length > 0 ? (orders.map((e, id) => {

                                return (
                                    <div key={id} className='specificorders'  >


                                        <p> {e.itemName} </p>
                                        <p style={{width:"50px"}}> {e.qtn} </p>
                                        <p style={{width:"50px"}}> {e.price} </p>
                                        <p style={{width:"50px"}}> {e.totalprice} </p>
                                        <p style={{width:"50px"}}> {e.time} </p>
                                        <p > {e.date}</p>
                                        <p  style={{width:"200px"}}> {e.customerName} </p>
                                        <p> {e.mobileNo} </p>
                                        <p style={{ width: "250px" }}> {e.address} </p>
                                        <p> {e.deliverd ? "deliverd" : "undeliverd"} </p>
                                        <button className='ordermanage' style={{ width: "100px" }} onClick={(d) => {
                                            d.preventDefault();
                                            deliverdtrue(e.id);
                                        }}>Deliverd</button>
                                    </div>
                                )
                            })) : (<Loading />)}
                        </div>
                        <div id='do' >
                            {ordersd.length > 0 ? (ordersd.map((e, id) => {

                                return (
                                    <div key={id} className='specificorders' >

                                        {/* <p> id: {e.id} </p> */}
                                        <p> {e.itemName} </p>
                                        <p style={{width:"50px"}}> {e.qtn} </p>
                                        <p style={{width:"50px"}}>  {e.price} </p>
                                        <p style={{width:"50px"}}>  {e.totalprice} </p>
                                        <p style={{width:"50px"}}>  {e.time} </p>
                                        <p >  {e.date}</p>
                                        <p  style={{width:"200px"}}> {e.customerName} </p>
                                        <p> {e.mobileNo} </p>
                                        <p style={{ width: "250px" }}> {e.address} </p>
                                        <p>  {e.deliverd ? "deliverd" : "undeliverd"} </p>
                                        <button className='ordermanage' style={{ width: "100px" }} onClick={(d) => {
                                            d.preventDefault();
                                            deliverdtrue(e.id);
                                        }}>Deliverd</button>
                                    </div>
                                )
                            })) : (<Loading />)}
                        </div>
                        <div id='udo' >
                            {ordersud.length > 0 ? (ordersud.map((e, id) => {

                                return (
                                    <div key={id} className='specificorders' >

                                        {/* <p> id: {e.id} </p> */}
                                        <p>  {e.itemName} </p>
                                        <p style={{width:"50px"}}>  {e.qtn} </p>
                                        <p style={{width:"50px"}}>  {e.price} </p>
                                        <p style={{width:"50px"}}>  {e.totalprice} </p>
                                        <p style={{width:"50px"}}>  {e.time} </p>
                                        <p >  {e.date}</p>
                                        <p  style={{width:"200px"}}>  {e.customerName} </p>
                                        <p>  {e.mobileNo} </p>
                                        <p style={{ width: "250px" }}>  {e.address} </p>
                                        <p>  {e.deliverd ? "deliverd" : "undeliverd"} </p>
                                        <button className='ordermanage' style={{ width: "100px" }} onClick={(d) => {
                                            d.preventDefault();
                                            deliverdtrue(e.id);
                                        }}>Deliverd</button>
                                    </div>
                                )
                            })) : (<Loading />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders
