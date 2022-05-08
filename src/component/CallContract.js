import React, {useState} from'react'
//import {ethers} from 'ethers'
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';

function CallContract() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

    const [stepTwo, allowStepTwo] = useState(false);
    const [stepThree, allowStepThree] = useState(false);
    const [stepFour, allowStepFour] = useState(false);
    const [stepFive, allowStepFive] = useState(false);

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);


    const connectWalletHandler = () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
                console.log("window.ethereum is called to check if wallet is installed in your browser, and connects to this page");
                console.log("Address obtained from wallet - " + result[0]);
				setConnButtonText('Wallet Connected');
                allowStepTwo(true);
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
	}

    return (
        <div>
            <div>
                <h3>Step 1. Connect your wallet</h3>
                <button onClick={connectWalletHandler}>{connButtonText}</button>
                <p>Wallet Address - {defaultAccount}</p>
            </div>
            <div>
                <StepTwo allowStepTwo={stepTwo} setProvider={setProvider} setSigner={setSigner} allowStepThree={allowStepThree}/>
            </div>
            <div>
                <StepThree allowStepThree={stepThree} signer={signer} setContract={setContract} allowStepFour={allowStepFour}/>
            </div>
            <div>
                <StepFour allowStepFour={stepFour} contract={contract} allowStepFive={allowStepFive}/>
            </div>
            <div>
                <StepFive allowStepFive={stepFive} contract={contract} />
            </div>
            {errorMessage}
        </div>
    );
}

export default CallContract;