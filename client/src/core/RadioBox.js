import React, { useState, useEffect } from "react";

const RadioBox = ({ prices, handleFilters }) => {
    const [value, setValue] = useState(0);

    
    // whenever some change occur on price range
    const handleChange = event => {
        handleFilters(event.target.value);
        setValue(event.target.value);
    };

    return prices.map((p, i) => (
        <div key={i}>
        {/* {JSON.stringify(prices)} */}
            <input
                onChange={handleChange}
                value={`${p._id}`}
                // select one price at a time
                name={p}
                type="radio"
                className="mr-2 ml-4"
            />
            <label className="form-check-label">{p.name}</label>
        </div>
    ));
};

export default RadioBox;
