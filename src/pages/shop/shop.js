import React, { useState, useEffect } from "react";
import { transferFlow } from '../../cadence/transferFlow';
import { purchaseTokens } from '../../cadence/transactions/purchaseTokens';
import { getTresorDetails} from '../../cadence/scripts/getTresorDetails';
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
    const [sixPriceTresors, setSixPriceTresors] = useState([]);
    const [fifteenPriceTresors, setFifteenPriceTresors] = useState([]);
    const [thirtyPriceTresors, setThirtyPriceTresors] = useState([]);
    const [sixtyPriceTresors, setSixtyPriceTresors] = useState([]);
    const [oneFiftyPriceTresors, setOneFiftyPriceTresors] = useState([]);
    const [threeHundredPriceTresors, setThreeHundredPriceTresors] = useState([]);
    

    
    useEffect(() => {
        fcl.currentUser.subscribe((currentUser) => {
            setUser(currentUser);
            setUserAddress(currentUser.addr);
        });
    }, []); // 
    async function fetchTresorDetails() {
        try {
            const result = await fcl.query({
                cadence: getTresorDetails,
                args: (arg, t) => [arg("0x66b60643244a7738", t.Address)],
            });
    
            // Initialize arrays for each price category
            const six = [], fifteen = [], thirty = [], sixty = [], oneFifty = [], threeHundred = [];
    
            // Sort tresor IDs into their respective arrays
            result.forEach(tresor => {
                switch (tresor.price) {
                    case "6.00000000":
                        six.push(tresor.tresorID);
                        break;
                    case "15.00000000":
                        fifteen.push(tresor.tresorID);
                        break;
                    case "30.00000000":
                        thirty.push(tresor.tresorID);
                        break;
                    case "60.00000000":
                        sixty.push(tresor.tresorID);
                        break;
                    case "150.00000000":
                        oneFifty.push(tresor.tresorID);
                        break;
                    case "300.00000000":
                        threeHundred.push(tresor.tresorID);
                        break;
                    default:
                        // Handle other cases or log an error
                        console.log(`Unknown price category for Tresor ID ${tresor.tresorID}`);
                }
            });
    
            // Update state with sorted Tresor IDs
            setSixPriceTresors(six);
            setFifteenPriceTresors(fifteen);
            setThirtyPriceTresors(thirty);
            setSixtyPriceTresors(sixty);
            setOneFiftyPriceTresors(oneFifty);
            setThreeHundredPriceTresors(threeHundred);

            // Console logs for each price category
            console.log("Tresor IDs for 6: ", six);
            console.log("Tresor IDs for 15: ", fifteen);
            console.log("Tresor IDs for 30: ", thirty);
            console.log("Tresor IDs for 60: ", sixty);
            console.log("Tresor IDs for 150: ", oneFifty);
            console.log("Tresor IDs for 300: ", threeHundred);
        } catch (error) {
            console.error("Error fetching Tresor details:", error);
        }
    }
    
    useEffect(() => {
        // Existing code...
        fetchTresorDetails(); // Fetch Tresor details on component mount
    }, []);
    

    const transferFlow6 = async () => {
        //setAmountFlow("0.006");
        if (sixPriceTresors.length === 0) {
            console.error("No Tresors available for this price category");
            return;
        }
        const txid = await fcl.mutate({
            cadence: purchaseTokens,
            args: (arg, t) => [
                arg(sixPriceTresors[0], t.UInt64),
                arg("6.0", t.UFix64),
                arg("0x66b60643244a7738", t.Address)
            ],
            proposer: fcl.currentUser,
            payer: fcl.currentUser,
            authorizations: [fcl.currentUser],
            limit: 999,
        });
    }

    const transferFlow15 = async () => {
        //setAmountFlow("0.006");

        if (fifteenPriceTresors.length === 0) {
            console.error("No Tresors available for this price category");
            return;
        }
        const txid = await fcl.mutate({
            cadence: purchaseTokens,
            args: (arg, t) => [
                arg(fifteenPriceTresors[0], t.UInt64),
                arg("15.0", t.UFix64),
                arg("0x66b60643244a7738", t.Address)
            ],
            proposer: fcl.currentUser,
            payer: fcl.currentUser,
            authorizations: [fcl.currentUser],
            limit: 999,
        });
    }

    const transferFlow30 = async () => {
        //setAmountFlow("0.006");
        if (thirtyPriceTresors.length === 0) {
            console.error("No Tresors available for this price category");
            return;
        }
        const txid = await fcl.mutate({
            cadence: purchaseTokens,
            args: (arg, t) => [
                arg(thirtyPriceTresors[0], t.UInt64),
                arg("30.0", t.UFix64),
                arg("0x66b60643244a7738", t.Address)
            ],
            proposer: fcl.currentUser,
            payer: fcl.currentUser,
            authorizations: [fcl.currentUser],
            limit: 999,
        });
    }

    const transferFlow60 = async () => {
        //setAmountFlow("0.006");
        if (sixtyPriceTresors.length === 0) {
            console.error("No Tresors available for this price category");
            return;
        }
        const txid = await fcl.mutate({
            cadence: purchaseTokens,
            args: (arg, t) => [
                arg(sixtyPriceTresors[0], t.UInt64),
                arg("60.0", t.UFix64),
                arg("0x66b60643244a7738", t.Address)
            ],
            proposer: fcl.currentUser,
            payer: fcl.currentUser,
            authorizations: [fcl.currentUser],
            limit: 999,
        });
    }

    const transferFlow150 = async () => {
        //setAmountFlow("0.006");
        if (oneFiftyPriceTresors.length === 0) {
            console.error("No Tresors available for this price category");
            return;
        }
        const txid = await fcl.mutate({
            cadence: purchaseTokens,
            args: (arg, t) => [
                arg(oneFiftyPriceTresors[0], t.UInt64),
                arg("150.0", t.UFix64),
                arg("0x66b60643244a7738", t.Address)
            ],
            proposer: fcl.currentUser,
            payer: fcl.currentUser,
            authorizations: [fcl.currentUser],
            limit: 999,
        });
    }

    const transferFlow300 = async () => {
        //setAmountFlow("0.006");
        if (threeHundredPriceTresors.length === 0) {
            console.error("No Tresors available for this price category");
            return;
        }
        const txid = await fcl.mutate({
            cadence: purchaseTokens,
            args: (arg, t) => [
                arg(threeHundredPriceTresors[0], t.UInt64),
                arg("300.0", t.UFix64),
                arg("0x66b60643244a7738", t.Address)
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