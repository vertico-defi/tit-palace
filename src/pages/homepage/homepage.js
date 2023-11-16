import React, { useState, useEffect } from "react";
import { initTit } from '../../cadence/initTit';
import { transferFlow } from '../../cadence/transferFlow';
import * as fcl from '@blocto/fcl';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import './homepage.css'


import icon1 from '../../assets/photos/homepageIcon5.png';
import icon2 from '../../assets/photos/homepageIcon6.png';
import icon3 from '../../assets/photos/homepageIcon7.png';
import banner from '../../assets/photos/homepageBanner.png';


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
            <img src={banner} className="banner" alt="banner for website homepage welcoming users to the site"></img>
            {/*<h1>EXPLORE THE WONDERS OF $TIT PALACE</h1>
            
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
                        Embark on a captivating journey through the mystical Tit Palace, where untold stories of remarkable women 
                        unfold within its sprawling walls. Dive into this enchanting world by establishing your presence on our 
                        platform today. Unveil the secrets that await you!
                    </p>
                    <button onClick={initTitToken} style={{ width: 'auto', padding: '10px 20px' }} className="button">Account Setup</button>
                </div>
                <div className="image-column">
                    <img src={icon1}  alt="Woman walking thtrough a palace at night"></img> 
                </div>
            </div>
            <div className="info-box">
                <div className="image-column">
                    <img src={icon2} alt="Woman  wwalking through a party at a palace"></img>
                </div>
                <div className="text-column">
                    <h2>Unlock Opulence with $TIT Tokens</h2>
                    <p>
                    Dive into a world of opulence with $TIT tokens, where hidden corridors and secret chambers unveil
                     the untold stories of extraordinary women. These privileged narratives await those who hold the 
                     key to the palace's mysteries, offering an exclusive journey into a realm of luxury and enchantment.
                    </p>
                    <Link to="/shop" className="button">Tit Palace Shop</Link>
                </div>
            </div>
            <div className="info-box">
                <div className="text-column">
                    <h2>Explore Teasers</h2>
                    <p>
                        Use your $TIT tokens to access and enjoy our unique teaser puzzles. Embark on a captivating journey where mysteries unfold and secrets are revealed. Dive into this enchanting world by establishing your presence on our platform today.
                    </p>
                    <Link to="/teasers" className="button">Start Teasing</Link>
                </div>
                <div className="image-column">
                    <img src={icon3}  alt="Woman walking thtrough a palace at night"></img> 
                </div>
            </div>
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} />
        </div>
        
    );
}

export default HomePage;
