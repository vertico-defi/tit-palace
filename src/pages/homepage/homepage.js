import React, { useState, useEffect } from "react";
import { initTit } from '../../cadence/initTit';
import { transferFlow } from '../../cadence/transferFlow';
import * as fcl from '@blocto/fcl';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import './homepage.css'



function HomePage() {
    // const [amountTit, setAmountTit] = useState("");
    const [user, setUser] = useState({ loggedIn: null });  
    //const [amountFlow, setAmountFlow] = useState("");
    const [userAddress, setUserAddress] = useState(null);
    
    useEffect(() => {
        fcl.currentUser.subscribe((currentUser) => {
            setUser(currentUser);
            setUserAddress(currentUser.addr);
        });
    }, []); // 



    const initTitToken = async () => {
        try {
            // Start the mutation
            const transactionId = await fcl.mutate({
                cadence: initTit,
                args: (arg, t) => [], // if your initTit requires arguments, they go here
                proposer: fcl.currentUser,
                payer: fcl.currentUser,
                authorizations: [fcl.currentUser],
                limit: 999,
            });
            
            // Await the transaction to be sealed
            const transaction = await fcl.tx(transactionId).onceSealed();
            console.log(transaction); // log the transaction status and events
            
            // You can also check the status of the transaction if needed
            if (transaction.status === 4) {
                toast.success("Successfully initialized TIT Token!");
            } else {
                toast.error("Transaction failed: " + transaction.errorMessage);
            }
        } catch (error) {
            console.error("Transaction failed", error);
            toast.error("Transaction failed: " + error.message);
        }
    };

    return (
        
        <div className="homepage">
            <h1>Welcome to Our Web3 Adventure</h1>
            <p>Follow these simple steps to dive into the world of $TIT token:</p>
            <ol>
                <li>
                    <strong>Set up your account</strong> - Prepare for your journey by establishing your presence on our platform.
                    <button onClick={initTitToken} className="account-setup-button">Account Setup</button>
                </li>
                <li>
                    <strong>Purchase tokens</strong> - Acquire $TIT tokens to unlock exclusive content and features.
                    <Link to="/shop" className="navigate-button">Go to Shop</Link>
                </li>
                <li>
                    <strong>Explore teasers</strong> - Use your $TIT tokens to access and enjoy our unique teaser puzzles.
                    <Link to="/teasers" className="navigate-button">View Teasers</Link>
                </li>
            </ol>
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} />
        </div>
        
    );
}

export default HomePage;
