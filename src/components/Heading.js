import React from 'react'

export const Heading = () => {
    return (
        <div className="container" style = {{
            backgroundColor: "green",
            alignItems: "center",
            textAlign:"center",
            marginBottom:"0"
            
        }}>
            <h1>User-Directory</h1> 
            <p> use search bar to search employee by name/city or click on the headings to sort</p>
        </div>
    )
}

 export default Heading
