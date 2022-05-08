import React, {useState} from'react'
import {ethers} from 'ethers'

function CallContract() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    const [connectContractText, setConnContractText] = useState('Connect Contract');

    const [val, setVal] = useState(null);
    const [check, setCheck] = useState(null);

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);


    const connectWalletHandler = () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
    };

    const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		updateEthers();
	}

    const updateEthers = async () => {
		let tempProvider = await new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		setSigner(tempProvider.getSigner());	
	}

    const contractHandler = (event) => {
        event.preventDefault();
        let tempContract = new ethers.Contract(event.target.sc.value, event.target.abi.value, signer);
		setContract(tempContract);
        setConnContractText('Connected');
    }

    const getCurrentVal = async () => {
		let val = await contract.retrieve();
		setVal(val.toNumber());
	}

    const setHandler = (event) => {
        event.preventDefault();
        contract.store(event.target.setNum.value);
        setCheck("Check if the value has been updated. It may take some time to update.");
    }

    return (
        <div>
            <div>
                <h3>Step 1. Connect your wallet</h3>
                <button onClick={connectWalletHandler}>{connButtonText}</button>
                <div>
                    Wallet Address - {defaultAccount}
                </div>
            </div>
            <div>
                <h3>Step 2. Connect to Smart Contract</h3>
                <form onSubmit={contractHandler}>
                    <dl>
                        <dt>Contract Address:</dt> <dd><input id="sc" type="text"/></dd><br/>
                        <dt>ABI:</dt> <dd><input id="abi" type="text"/></dd>
                    </dl>
                    <button type={"submit"}>{connectContractText}</button>
                </form>
            </div>
            <div>
                <h3>Step 3. Retrieve value from Contract</h3>
                <p>Retrieved value: {val}</p>
                <button onClick={getCurrentVal}> Get Current Contract Value </button>
            </div>
            <div>
            <h3>Step 4. Update Value</h3>
                <form onSubmit={setHandler}>
                    <input id="setNum" type="number"/>
                    <button type={"submit"}> Update value </button>
                </form>
                {check}
            </div>
            {errorMessage}
        </div>
    );
}

export default CallContract;