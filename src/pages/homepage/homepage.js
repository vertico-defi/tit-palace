import React, { useState, useEffect } from "react";
import { initTit } from '../../cadence/initTit';
import { transferFlow } from '../../cadence/transferFlow';
import * as fcl from '@blocto/fcl';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import './homepage.css'


import icon1 from '../../assets/photos/homepageIcon1.png';
import icon2 from '../../assets/photos/homepageIcon2.png';
import icon3 from '../../assets/photos/homepageIcon3.png';


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
            <h1>EXPLORE THE WONDERS OF $TIT PALACE</h1>
            {/*
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
            </ol>*/}
            <div className="info-box">
                <div className="text-column">
                    <h2>Gain Palace Entry</h2>
                    <p>
                        Embark on a captivating journey through the mystical $TIT palace, where untold stories of remarkable women 
                        unfold within its sprawling walls. Dive into this enchanting world by establishing your presence on our 
                        platform today. Unveil the secrets that await you!
                    </p>
                    <button onClick={initTitToken} style={{ width: 'auto', padding: '10px 20px' }} className="account-setup-button">Account Setup</button>
                </div>
                <div className="image-column">
                    <img src={icon1}  alt="Woman walking thtrough a palace at night"></img> 
                </div>
            </div>
            <div className="info-box">
                <div className="image-column">
                    <img src={icon2} alt="Woman  wwalking through a party at a palace"></img>
                </div>
                <div className="text-columnn">
                    <h2>Unlock the Gates to Opulence with $TIT Tokens</h2>
                    <p>
                        Step into a realm of exclusivity and enchantment. With $TIT tokens in your grasp, the doors to the palace's most 
                        private chambers swing open, revealing a world of privileged content and luxurious features. Dare to explore the 
                        hidden corridors and indulge in the rich tapestry of experiences curated just for the discerning eye. Acquire your 
                        key to the kingdom today and become a part of the legend.
                    </p>
                    <Link to="/shop" className="navigate-button">Go to Shop</Link>
                </div>
            </div>
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} />
        </div>
        
    );
}

export default HomePage;
