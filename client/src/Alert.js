import React, { useEffect } from 'react'

function Alert(props) {
    const {alert}=props;
    useEffect(()=>{
        setTimeout(() => {
            document.getElementById('alert').style.display="none"
        }, 6000);
    })
  return (
    <div id='alert' className='alert'>
        <p>{alert}</p>
    </div>
  )
}

export default Alert
