import React, {useState} from'react'
//import {ethers} from 'ethers'

function StepFour(props) {
    const [val, setVal] = useState(null);
    const getCurrentVal = async () => {
        console.log("STEP 4.");
        console.log("contract.FUNCTION() to call function");
		let val = await props.contract.retrieve();
		setVal(val.toNumber());
        props.allowStepFive(true);
	}

    if(props.allowStepFour)
    {
        return (
            <div>
                <h3>Step 4. Call retrieve() from the contract</h3>
                <p>Retrieved value: {val}</p>
                <button onClick={getCurrentVal}> Get Value</button>
            </div>
        );
    }
}

export default StepFour;