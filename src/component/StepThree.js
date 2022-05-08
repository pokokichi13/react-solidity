import React, {useState} from'react'
import {ethers} from 'ethers'

function StepThree(props) {
    const [connectContractText, setConnContractText] = useState('Connect Contract');

    const contractHandler = (event) => {
        event.preventDefault();
        let tempContract = new ethers.Contract(event.target.sc.value, event.target.abi.value, props.signer);
		props.setContract(tempContract);
        props.allowStepFour(true);
        console.log("STEP 3.");
        console.log("let tempContract = new ethers.Contract(CONTRACT ADDRESS, CONTRACT ABI, SIGNER);");
        console.log("to connects to contract");
        setConnContractText('Connected');
    }
    if(props.allowStepThree)
    {
        return (
            <div>
                <h3>Step 3. Connect to Smart Contract</h3>
                <form onSubmit={contractHandler}>
                    <dl>
                        <dt>Contract Address:</dt> <dd><input id="sc" type="text"/></dd><br/>
                        <dt>ABI:</dt> <dd><input id="abi" type="text"/></dd>
                    </dl>
                    <button type={"submit"}>{connectContractText}</button>
                </form>
            </div>
        );
    }
}

export default StepThree;