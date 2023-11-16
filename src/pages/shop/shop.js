import React, { useState, useEffect } from "react";
import { transferFlow } from '../../cadence/transferFlow';
import * as fcl from '@blocto/fcl';
import './shop.css'
import { ToastContainer, toast } from 'react-toastify';
import thirty from '../../assets/photos/coinBag11.png';
import eighty from '../../assets/photos/coinBag10.png';
import seventeen from '../../assets/photos/coinBag9.png';
import thirtysix from '../../assets/photos/coinBag8.png';
import ninetyfive from '../../assets/photos/coinBag7.png';
import twenty from '../../assets/photos/coinBag6.png';

function Shop() {
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

    const transferFlow6 = async () => {
        //setAmountFlow("0.006");
        const txid = await fcl.mutate({
            cadence: transferFlow,
            args: (arg, t) => [
                arg("0x66b60643244a7738", t.Address),
                arg("0.006", t.UFix64)
            ],
            proposer: fcl.currentUser,
            payer: fcl.currentUser,
            authorizations: [fcl.currentUser],
            limit: 999,
        });
    }

    const transferFlow15 = async () => {
        //setAmountFlow("0.006");
        const txid = await fcl.mutate({
            cadence: transferFlow,
            args: (arg, t) => [
                arg("0x66b60643244a7738", t.Address),
                arg("0.0015", t.UFix64)
            ],
            proposer: fcl.currentUser,
            payer: fcl.currentUser,
            authorizations: [fcl.currentUser],
            limit: 999,
        });
    }

    const transferFlow30 = async () => {
        //setAmountFlow("0.006");
        const txid = await fcl.mutate({
            cadence: transferFlow,
            args: (arg, t) => [
                arg("0x66b60643244a7738", t.Address),
                arg("0.0003", t.UFix64)
            ],
            proposer: fcl.currentUser,
            payer: fcl.currentUser,
            authorizations: [fcl.currentUser],
            limit: 999,
        });
    }

    const transferFlow60 = async () => {
        //setAmountFlow("0.006");
        const txid = await fcl.mutate({
            cadence: transferFlow,
            args: (arg, t) => [
                arg("0x66b60643244a7738", t.Address),
                arg("0.0006", t.UFix64)
            ],
            proposer: fcl.currentUser,
            payer: fcl.currentUser,
            authorizations: [fcl.currentUser],
            limit: 999,
        });
    }

    const transferFlow150 = async () => {
        //setAmountFlow("0.006");
        const txid = await fcl.mutate({
            cadence: transferFlow,
            args: (arg, t) => [
                arg("0x66b60643244a7738", t.Address),
                arg("0.00015", t.UFix64)
            ],
            proposer: fcl.currentUser,
            payer: fcl.currentUser,
            authorizations: [fcl.currentUser],
            limit: 999,
        });
    }

    const transferFlow300 = async () => {
        //setAmountFlow("0.006");
        const txid = await fcl.mutate({
            cadence: transferFlow,
            args: (arg, t) => [
                arg("0x66b60643244a7738", t.Address),
                arg("0.00003", t.UFix64)
            ],
            proposer: fcl.currentUser,
            payer: fcl.currentUser,
            authorizations: [fcl.currentUser],
            limit: 999,
        });
    }

    return(
        <div className="shop-page">
            <div className="buy">
                <img src={thirty} className="coin-bag" alt="small bag of tokens"></img>
                <p>6 $FLOW → 30 $TIT</p>
                <button onClick={transferFlow6} className="button">BUY</button>
            </div>
            <div className="buy">
                <img src={eighty} className="coin-bag" alt="small bag of tokens"></img>
                <p>15 $FLOW → 80 $TIT</p>
                <button onClick={transferFlow15} className="button"> BUY</button>
            </div>
            <div className="buy">
                <img src={seventeen} className="coin-bag" alt="small bag of tokens"></img>
                <p>30 $FLOW → 170 $TIT</p>
                <button onClick={transferFlow30} className="button"> BUY</button>
            </div>
            <div className="buy">
                <img src={thirtysix} className="coin-bag" alt="small bag of tokens"></img>
                <p>60 $FLOW → 360 $TIT</p>
                <button onClick={transferFlow60} className="button"> BUY</button>
            </div>
            <div className="buy">
                <img src={ninetyfive} className="coin-bag" alt="small bag of tokens"></img>
                <p>150 $FLOW → 950 $TIT</p>
                <button onClick={transferFlow150} className="button"> BUY</button>
            </div>
            <div className="buy">
                <img src={twenty} className="coin-bag" alt="small bag of tokens"></img>
                <p>300 $FLOW → 2000 $TIT</p>
                <button onClick={transferFlow300} className="button"> BUY</button>
            </div>
        </div>
    );
}

export default Shop;