import React from 'react'

function Footer() {
  return (
    <div id='footer'>
      <div id='about' className='fleft'>
        <div className='logo'>
          <i style={{ marginBottom: "-12px", fontSize: "1.1rem", marginLeft: "15px" }}>the</i>
          <p><i style={{ fontWeight: 'bold' }}>Inf</i><i style={{ fontWeight: "bold" }}>inity</i></p>
        </div>
        <div >
          <p id='footerdesc' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias id vero earum ratione non saepe dignissimos a, reprehenderit illo doloribus possimus asperiores repellendus at obcaecati ad itaque deserunt nemo temporibus aliquam impedit recusandae ipsam!</p>
        </div>
        <div className='sociallogo'>
          <img src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png" alt="" />
          <img src="https://cdn-icons-png.flaticon.com/128/3938/3938026.png" alt="" />
          <img src="https://cdn-icons-png.flaticon.com/128/145/145807.png" alt="" />
        </div>
      </div>
      <div className='frr'>

        <div className='fright'>
          <p>AVAILABLE</p>
          <h2>OPENING HOURS</h2>
          <p>MONDAY   9.00-22.00</p>
          <p>TUESDAY  9.00-22.00</p>
          <p>SATURDAY 9.00-20.00</p>
          <p>SUNDAY   8.00-22.22</p>
        </div>
        <div id='contactus' className="flast">
          <p>CONTACT</p>
          <h2>GET IN TOUCH</h2>
          <p>24/7 service on online </p>
          <p>91+  6352447074</p>
          <p>virengirigoswami3@gmail.com</p>
          <button style={{ marginTop: "15px" }} className="btns">Contact us ⬆</button>
        </div>
      </div>
    </div>
  )
}

export default Footer
