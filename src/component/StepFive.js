import React, {useState} from'react'

function StepFive(props) {
    const [check, setCheck] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const setHandler = (event) => {
        event.preventDefault();
        props.contract.store(event.target.setNum.value)
        .then(
            result => {
                setCheck("Go back to Step 4. to check the value. It may take some time to update. Your Ganache is handling the transaction");
                console.log("STEP 5. ");
                console.log("Calling store(). It writes to chain, so wallet pops up");
                setErrorMessage('');
            }
        )
        .catch(error => {
            setCheck('');
            setErrorMessage(error.message);
        });
    }

    if(props.allowStepFive)
    {
        return (
            <div>
                <h3>Step 5. call store() to update value</h3>
                <form onSubmit={setHandler}>
                    <input id="setNum" type="number"/>
                    <button type={"submit"}> Update value </button>
                </form>
                <p>{check}</p>
                {errorMessage}
            </div>
        );
    }
}

export default StepFive;
