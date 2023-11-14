import React, { useState, useEffect } from "react";
import { transferFlow } from '../../cadence/transferFlow';
import * as fcl from '@blocto/fcl';
import './shop.css'
import { ToastContainer, toast } from 'react-toastify';

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
        <div>
            <button onClick={transferFlow6} > Purchase $TIT Token</button>
            <button onClick={transferFlow15} > Purchase $TIT Token</button>
            <button onClick={transferFlow30} > Purchase $TIT Token</button>
            <button onClick={transferFlow60} > Purchase $TIT Token</button>
            <button onClick={transferFlow150} > Purchase $TIT Token</button>
            <button onClick={transferFlow300} > Purchase $TIT Token</button>
        </div>
    );
}

export default Shop;