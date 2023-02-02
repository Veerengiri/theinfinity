import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

function Home() {
  const nav = useNavigate();
  useEffect(()=>{
    
     
  },[])
  return (
    <div className='homepage'>
      <div className='hleft'>
          <p style={{fontSize:"2.5rem",color:"rgb(255, 225, 0)",marginBottom:"-50px",marginTop:"-30px",letterSpacing:"-3px"}}>WE TAKE</p>
          <p style={{fontSize:"2.5rem",marginBottom:"-50px",fontWeight:"bolder"}}>PRIDE IN</p>
          <p style={{fontSize:"2.5rem",marginBottom:"-10px",fontWeight:"bolder"}}>OUR FOOD</p>
          <p style={{fontSize:"1rem",marginRight:"10px",textAlign:"center"}}>Made of fresh & premium ingredients</p>
          <button className='btns' onClick={()=>{
            nav('/items')
          }}>Our Menu</button>
      </div>
      <div className='hright'></div>
    </div>
  )
}

export default Home
