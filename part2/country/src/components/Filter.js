import React from 'react'

const Filter = (prop) => {
    return (
        <div>
            find countries <input  value={prop.value} onChange={prop.handleFilterChange}/>
        </div>
    )
}

export default Filter