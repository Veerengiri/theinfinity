import React from 'react'
import loading from './loding.gif'
function Loading() {
    return (
        <div style={{display:"flex",justifyContent:'center',alignItems:"center"}} className='text-center' >
            <img style={{ marginTop: "50px" }} src={loading} alt="loading" />
        </div>
    )
}

export default Loading
