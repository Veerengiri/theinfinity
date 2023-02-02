import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Alert from '../Alert';
import Loading from './Loading'
function Item(props) {
    const { isadmin, iscustomer, ci, customeremail } = props;
    const [allItems, setAllItems] = useState([]);
    const [price, setPrice] = useState(0);
    const [itemId, setItemId] = useState("");
    const [name, setName] = useState("");
    const [qtn, setQtn] = useState(1);
    const [desc, setDesc] = useState("");
    const [display, setDisplay] = useState("flex");
    
    let userid = ci;
    const nav = useNavigate()
    const showitems = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:7000/api/showitems', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        setAllItems(data.item);
    }
    // const showitems2 = async (e)=>{
    //     e.preventDefault();
    //     const response = await fetch('http://localhost:7000/api/getupload',{
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //     const data = await response.json();
    //     setAllItems(data);
    // }
    const changeprice = async (e) => {

        e.preventDefault();
        if (price < 0) {
            alert("enter valid price");
            return;
        }

        const items = await fetch(`http://localhost:7000/api/updateitemprice/${itemId}/${price}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await items.json();
        alert(data.status);
        document.getElementById('showitems').click();
        document.getElementById('changeprice').style.display = "none";
    }
    const deleteitem = async (id) => {
        // e.preventDefault();
        if (!window.confirm("delete?")) {
            return;
        }
        const items = await fetch(`http://localhost:7000/api/deleteitem/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await items.json();
        alert(data.status);
        
        document.getElementById('showitems').click();
    }
    const ordernow = async (d) => {
        d.preventDefault()
        if (qtn <= 0) {
            alert("please give valid order");
            return;
        }

        const orders = await fetch('http://localhost:7000/api/getorder', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: userid,
                itemId,
                qtn,
            })
        })
        const data = await orders.json();
        
        // <Alert alert={data.status}/>
        if (data.status == "Order placed successfully") {
            await window.Email.send({
                Host: "smtp.elasticemail.com",
                Username: "virengirigoswami3@gmail.com",
                Password: "28FB4AE2E314E380D52BBE1F1266C80D6AB3",
                To: customeremail,
                From: "virengirigoswami3@gmail.com",
                Subject: "verify email",
                Body: "Your order placed successfully of " + qtn + " " + name + " and it is deliverd soon"
            }).then(
                () => { }
            );
        }else{
            alert(data.status);
        }
        document.getElementById('ordernow').style.display = "none"
        setQtn(1);
    }
    const addtocart = async (d) => {

        d.preventDefault();
        if (qtn <= 0) {
            alert("plese enter valid qtn..");
            return;
        }
        const orders = await fetch(`http://localhost:7000/api/addtocart/${userid}/${itemId}/${qtn}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }

        })
        const data = await orders.json();
        
        if (data.status=="add to cart successully") {
            
        } else {
            alert(data.status);
        }
        document.getElementById('addtocart').style.display = "none"
    }
    const searchbutton = async (d) => {
        d.preventDefault();
        if (search == "") {
            document.getElementById('showitems').click();
            return;
        }
        const response = await fetch(`http://localhost:7000/api/searchitems/${search}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        setAllItems(data.item);
    }
    const [search, setSearch] = useState("");
    useEffect(() => {
        document.getElementById('showitems').click();
        document.getElementById('ordernow').style.display = "none"
        document.getElementById('addtocart').style.display = "none"
        document.getElementById('changeprice').style.display = "none";
        if (isadmin) {
            setDisplay("flex");
        } else {
            setDisplay("none");
        }

    }, [])
    
    return (
        <div className='mainitems' id='items'>
            {/* <Alert alert="login first"/> */}
            <button id='showitems' onClick={showitems} style={{ display: "none" }}>items</button><br />

            <div className='itemsearch'>
                <input id='itemsearch' type="search" placeholder='what are you lookin for' value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className='btns' onClick={searchbutton}><img className='smallicon' src="http://cdn-icons-png.flaticon.com/128/149/149852.png" alt="" /></button>
            </div>
            <h1 style={{textAlign:"center"}}>Popular dishes</h1>
            <div id="showallnotes"><br />

                <form id='changeprice' onSubmit={changeprice}>
                    <div>
                        <button style={{width:'60px'}} className='btns' onClick={(d) => {
                            d.preventDefault();
                            document.getElementById('changeprice').style.display = "none"
                        }}>X</button>
                        <h3 style={{textAlign:"center"}} >{name}</h3>
                        <input style={{ backgroundColor: "transparent", color: "white", marginBottom: "20px" }} type="number" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                        <button className='btns' type='submit'>change Price</button>
                    </div>
                </form>
                <form id='ordernow' onSubmit={ordernow}>
                    <div>
                        <button style={{ width: "60px" }} className='btns' onClick={(d) => {
                            d.preventDefault();
                            document.getElementById('ordernow').style.display = "none"
                        }}>X</button>
                        <h2 style={{ textAlign: "center" }}>{name}</h2>
                        <p style={{ textAlign: "center" }}>{desc}</p> <br />
                        qtn: <input style={{ backgroundColor: "transparent", color: "white", marginBottom: "20px" }} type="number" placeholder='qtn' value={qtn} onChange={(d) => { setQtn(d.target.value) }} /> <br />
                        <button className='btns' type="submit">Confirm Order</button>
                    </div>
                </form>
                <form id='addtocart' onSubmit={addtocart}>
                    <div>
                        <button style={{ width: "60px" }} className='btns' onClick={(d) => {
                            d.preventDefault();
                            document.getElementById('addtocart').style.display = "none"
                        }}>X</button>
                        <h2 style={{ textAlign: "center" }}>{name}</h2>
                        <p style={{ textAlign: "center" }}>{desc}</p> <br />
                        qtn: <input style={{ backgroundColor: "transparent", color: "white", marginBottom: "20px" }} type="number" placeholder='qtn' value={qtn} onChange={(d) => { setQtn(d.target.value) }} /> <br />
                        <button className='btns' type="submit">Add to Cart</button>
                    </div>
                </form>
                <div className='allitems'>

                    {allItems.length > 0 ? (allItems.map((e, id) => {
                        
                        return (
                            <div key={id} className='specificitems' >

                                <img src={`http://localhost:7000/itemImages/${e.itemImage}`} alt="loaded" />
                               
                                <div className='itemdetails'>
                                    <h2>{e.name}</h2>
                                    <p>price: {e.price} ₹</p>
                                    <p>{e.desc}</p>
                                    <div style={{ display: `${display == "flex" ? "none" : "flex"}`, justifyContent: "space-between" }}>
                                        <button className='btns' onClick={(d) => {
                                            d.preventDefault();
                                            if (iscustomer) {
                                                setItemId(e._id);
                                                setName(e.name);
                                                setDesc(e.desc);
                                                document.getElementById('ordernow').style.display = "unset"
                                            } else {
                                                // alert("login first!");
                                                
                                                nav("/login");
                                            }
                                        }}>Order Now</button>
                                        <button className='btns' style={{ marginLeft: "10px" }} onClick={(d) => {
                                            d.preventDefault();
                                            if (iscustomer) {
                                                setItemId(e._id);
                                                setName(e.name);
                                                setDesc(e.desc);
                                                document.getElementById('addtocart').style.display = "unset"

                                            } else {
                                                // alert("login first!");
                                                nav("/login");
                                            }
                                        }}>Add to Cart</button>

                                    </div>
                                    <div style={{ display: `${display}`, justifyContent: "space-between" }}>
                                        <button className='btns' style={{ marginTop: "10px" }} onClick={(d) => {
                                            d.preventDefault();
                                            setItemId(e._id);
                                            setPrice(e.price);
                                            setName(e.name);
                                            document.getElementById('changeprice').style.display = "unset"
                                        }}>Edite Price</button>
                                        <button style={{ marginTop: "10px" }} className='btns' onClick={(d) => {
                                            d.preventDefault();
                                            deleteitem(e._id);
                                        }}>Delete Item</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })) : ( <Loading/> )}
                </div>
            </div>
        </div>
    )
}

export default Item
