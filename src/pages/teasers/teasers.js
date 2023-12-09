import React, { useState, useEffect } from "react";
import './teasers.css'
import { transferFlow } from '../../cadence/transferFlow';
import { transferTit } from '../../cadence/transactions/transferTit';
import { transferTitInc } from '../../cadence/transactions/transferTitInc';
import { transferTitComp } from '../../cadence/transactions/transferTitComp';
import { purchaseTokens } from '../../cadence/transactions/purchaseTokens';
import { getTresorDetails} from '../../cadence/scripts/getTresorDetails';
import { getTitBalance } from '../../cadence/scripts/getTitBalance';
import * as fcl from '@blocto/fcl';
import { ToastContainer, toast } from 'react-toastify';
import OpenAI from 'openai';



import basic from '../../assets/photos/1.png';
import premium from '../../assets/photos/2.png';
import vip from '../../assets/photos/3.png';
import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";


// const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

export default function Teasers() {
    // const [amountTit, setAmountTit] = useState("");
    const [user, setUser] = useState({ loggedIn: null });  
    //const [amountFlow, setAmountFlow] = useState("");
    const [userAddress, setUserAddress] = useState(null);
    const [basicEntrySuccess, setBasicEntrySuccess] = useState(false);
    const [premiumEntrySuccess, setPremiumEntrySuccess] = useState(false);
    const [vipEntrySuccess, setVipEntrySuccess] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [conversationHistory, setConversationHistory] = useState([]);
    const [answerOne, setAnswerOne] = useState("");
    const [answerTwo, setAnswerTwo] = useState("");
    const [answerThree, setAnswerThree] = useState("");
    const [answerFour, setAnswerFour] = useState("");
    const [answerFive, setAnswerFive] = useState("");
    const [tourCompleted, setTourCompleted] = useState(false);
    const [incorrectAnswerGiven, setIncorrectAnswerGiven] = useState(false);
    const [winningTresors, setWinningTresors] = useState([]);
    const [balance, setBalance] = useState([])


 
    // const openai = new OpenAI({apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true});

    
    useEffect(() => {
        fcl.currentUser.subscribe((currentUser) => {
            setUser(currentUser);
            setUserAddress(currentUser.addr);
        });
    }, []); // 

    useEffect(() => {
        if (userAddress) {
            fetchTitBalance(); // Fetch balance when userAddress is set
        }
    }, [userAddress]); // Dependency array includes userAddress


    async function fetchTitBalance() {
        try {
            const balance = await fcl.query({
                cadence: getTitBalance,
                args: (arg, t) => [arg(userAddress, t.Address)],
            });
            const formattedBalance = Number(balance).toFixed(2);

            setBalance(formattedBalance); // Update the balance state with the formatted value
            console.log("TIT Balance:", formattedBalance); //
        } catch (error) {
            console.error("Error fetching TIT balance:", error);
        }
    }

    async function fetchTresorDetails() {
        try {
            const result = await fcl.query({
                cadence: getTresorDetails,
                args: (arg, t) => [arg("0x66b60643244a7738", t.Address)],
            });
    
            // Initialize arrays for each price category
            const winning = [];
    
            // Sort tresor IDs into their respective arrays
            result.forEach(tresor => {
                switch (tresor.amount) {
                    case "729.00000000":
                        winning.push(tresor.tresorID);
                        break;
                    default:
                        // Handle other cases or log an error
                        //console.log(`Unknown price category for Tresor ID ${tresor.tresorID}`);
                }
            });
    
            // Update state with sorted Tresor IDs
            setWinningTresors(winning);

            // Console logs for each price category
            console.log("Tresor IDs for winners: ", winning);
        } catch (error) {
            console.error("Error fetching Tresor details:", error);
        }
    }

    useEffect(() => {
        // Existing code...
        fetchTresorDetails(); // Fetch Tresor details on component mount
    }, []);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    };
    
    const getRandomOption = (options) => {
        const shuffled = shuffleArray([...options]);
        return shuffled[0]; // Return the first option as the random correct answer
    };

    useEffect(() => {
        // Initialize the correct answers when the component mounts
        setAnswerOne(getRandomOption(conversationSteps[0].options));
        //console.log("Answer 1:", answerOne);
        setAnswerTwo(getRandomOption(conversationSteps[1].options));
        //console.log("Answer 2", answerTwo)
        setAnswerThree(getRandomOption(conversationSteps[2].options));
        setAnswerFour(getRandomOption(conversationSteps[3].options));
        setAnswerFive(getRandomOption(conversationSteps[4].options));
    }, []);

    const conversationSteps = [
        {
            question: "What's my favorite flower?",
            options: ["Roses", "Tulips", "Orchids"],
            
            correctAnswer: answerOne, // This will be set in useEffect
            get dialogue() {
                return `Welcome to the Tit Palace! I'm Sophia, your guide. Let's start our journey with a simple question to get to know each other. What's my favorite flower?`;
                
            },
            get responseOnCorrect() {
                return `You're right, I love ${answerOne}! They remind me of the palace gardens. Speaking of which, let's head towards the garden next.`;
            }
        },
        {
            question: "What's my favorite season to be in the garden?",
            options: ["Winter", "Spring", "Autumn"],
            
            correctAnswer: answerTwo, // This will be set in useEffect
            get dialogue() {
                return `Here's another question: What's my favorite season to be in the garden?`;
                
            },
            get responseOnCorrect() {
                let response = "";
                switch (answerTwo) { // Using answerTwo state variable
                    case "Spring":
                        response = "Absolutely, Spring! The garden bursts into life with vibrant blooms. What instrument do I enjoy playing the most?";
                        break;
                    case "Autumn":
                        response = "Yes, Autumn! The garden's colors turn beautifully golden. Now, can you guess which instrument I find relaxing?";
                        break;
                    case "Winter":
                        response = "Indeed, Winter! It's serene with the garden in a frosty slumber. What instrument do you think brings warmth to my evenings?";
                        break;
                    default:
                        response = "That's an interesting choice! Let's talk about music now. Which instrument do I love playing?";
                        break;
                }
                return response;
            }
        },
        {
            question: "What instrument do I enjoy playing the most?",
            options: ["Piano", "Violin", "Harp"],
            correctAnswer: answerThree,
            get dialogue() {

                return `What instrument do I enjoy playing the most?`;
            },
            get responseOnCorrect() {
                let response = "";
                switch (answerThree) {
                    case "Piano":
                        response = "Indeed, the piano has always been my passion. Let's move towards the grand hall. On the way, can you guess what my favorite evening activity in the palace is?";
                        break;
                    case "Violin":
                        response = "Yes, the violin's melodies are enchanting. Let's move towards the grand hall. Can you guess what I like to do in the evenings here in the palace?";
                        break;
                    case "Harp":
                        response = "Indeed, I find the harp incredibly soothing. Let's move towards the grand hall. On the way, can you guess what my favorite evening activity in the palace is?";
                        break;
                    default:
                        response = "That's a unique choice! But let's continue our tour. What do you think I enjoy doing in the evenings at the palace?";
                        break;
                }
                return response;
            }
        },
        {
            question: "What's my favorite evening activity in the palace?",
            options: ["Reading", "Stargazing", "Painting"],
            correctAnswer: answerFour,
            get dialogue() {
                return `Can you guess what my favorite evening activity in the palace is?`;
            },
            get responseOnCorrect() {
                let response = "";
                switch (answerFour) {
                    case "Reading":
                        response = "Correct! Reading by the fireside is my ideal way to spend an evening. Now, we're just steps away from my room. Ready for the last question?";
                        break;
                    case "Stargazing":
                        response = "Correct! I love stargazing from the palace's balcony, watching the stars in the night sky. Let's move on to the final question as we're near my room.";
                        break;
                    case "Painting":
                        response = "Exactly! Painting in the evening brings out my creativity. Now, as we approach my room, I have one final question for you.";
                        break;
                    default:
                        response = "That's an interesting choice! But let's continue. We're almost at my room, just one more question to go.";
                        break;
                }
                return response;
            }
        },
        {
            question: "What's my favorite midnight snack?",
            options: ["Chocolate", "Cheese and crackers", "Fruit salad"],
            correctAnswer: answerFive,
            get dialogue() {
                return `One last question: What's my favorite midnight snack?`;
            },
            get responseOnCorrect() {
                let response = "";
                switch (answerFive) {
                    case "Chocolate":
                        response = "That's right! I love a bit of chocolate before bed. And now, we've arrived at my room!";
                        break;
                    case "Cheese and crackers":
                        response = "Correct! Cheese and crackers are my go-to snack at night. Let's head to my room for some more conversation.";
                        break;
                    case "Fruit salad":
                        response = "Absolutely! Nothing beats a fresh fruit salad at night. Here we are at my room, shall we?";
                        break;
                    default:
                        response = "Interesting choice! But now, let's move on to my room for the final part of our tour.";
                        break;
                }
                return response;
            }
        }
    ];
/*
    const conversationSteps = [
        {
            dialogue: "Welcome to the Tit Palace! I'm Sofia, your guide. Let's start our journey with a simple question to get to know each other. What's my favorite flower?",
            options: ["A) Roses", "B) Tulips", "C) Orchids"],
            correctAnswer: "A) Roses",
            responseOnCorrect: "You're right, I love roses! They remind me of the palace gardens. Speaking of which, let's head towards the garden next."
        },
        {
            dialogue: "Here's another question: What's my favorite season to be in the garden?",
            options: ["A) Winter", "B) Spring", "C) Autumn"],
            correctAnswer: "B) Spring",
            responseOnCorrect: "Absolutely, Spring! The flowers are in full bloom then. As we walk through these vibrant blooms, tell me, what instrument do I enjoy playing the most?"
        },
        {
            dialogue: "What instrument do I enjoy playing the most?",
            options: ["A) Piano", "B) Violin", "C) Harp"],
            correctAnswer: "C) Harp",
            responseOnCorrect: "Indeed, I find the harp incredibly soothing. Let's move towards the grand hall. On the way, can you guess what my favorite evening activity in the palace is?"
        },
        {
            dialogue: "Can you guess what my favorite evening activity in the palace is?",
            options: ["A) Reading", "B) Stargazing", "C) Painting"],
            correctAnswer: "B) Stargazing",
            responseOnCorrect: "Correct! I love stargazing from the palace's balcony. Now, we're near my room. One last question."
        },
        {
            dialogue: "One last question: What's my favorite midnight snack?",
            options: ["A) Chocolate", "B) Cheese and crackers", "C) Fruit salad"],
            correctAnswer: "A) Chocolate",
            responseOnCorrect: "That's right! A little chocolate always sweetens the night. And here we are at my room! Thank you for joining me on this tour."
        }
        // ... more steps if needed
    ]; 
 */



    const handleAnswerSelection = (option) => {
        const currentStep = conversationSteps[currentStepIndex];
        if (option === currentStep.correctAnswer) {
            const updatedHistory = [
                ...conversationHistory,
                currentStep.dialogue,
                currentStep.responseOnCorrect
            ];
            setConversationHistory(updatedHistory);
            if (currentStepIndex === conversationSteps.length - 1) {
                // If it's the last question
                setTourCompleted(true);  // Set tourCompleted to true
            } else {
                // Proceed to the next question
                setCurrentStepIndex(currentStepIndex + 1);
            }
        } else {
            // Handle incorrect answer
            setIncorrectAnswerGiven(true);/*
            toast.error("That's not quite right. Try again?", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });*/
        }
    };

    const handleCollectChange = async() => {
        setBasicEntrySuccess(false);
        setIncorrectAnswerGiven(false);
        window.location.reload();
        // Additional logic...
    };

    const renderSophiasResponse = () => {
        if (incorrectAnswerGiven) {
            return (
                <div className="tour-question-container">
                    <p className="tour-question-text">
                        Oh dear, that's not what I expected. I'm a bit disappointed you didn't know that about me. 
                        It's probably best you leave now.
                    </p>
                    <button onClick={handleCollectChange} className="entry-button">
                        Exit Palace
                    </button>
                </div>
            );
        }
        return null;
    };
    


    const renderTourCompletion = () => {
        if (tourCompleted) {
            return (
                <div className="tour-question-container">
                    <p className="tour-question-text">Congratulations! You've successfully navigated the tour and found the entrance to my room. An evening of unforgettable experiences awaits.</p>
                    <button onClick={handleBasicWinningsCollection} className="entry-button">
                        Collect Winnings
                    </button>
                </div>
            );
        }
        return null;
    };
    
    const handleBasicWinningsCollection = async () => {
        if (winningTresors.length === 0) {
            console.error("No Tresors available for this price category");
            return;
        }
        try {
            const basicTXid =await fcl.mutate({
                cadence: purchaseTokens,
                args: (arg, t) => [
                    arg(winningTresors[0], t.UInt64),
                    arg("0.0", t.UFix64),
                    arg("0x66b60643244a7738", t.Address)
                ],
                proposer: fcl.currentUser,
                payer: fcl.currentUser,
                authorizations: [fcl.currentUser],
                limit: 999,
            });
            setBasicEntrySuccess(false);
            toast.success("Transaction successful! Your winnings are on the way!.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            window.location.reload();
        } catch (error) {
            console.error("Error Processing Winnings", error);
        }
    };

    const renderConversationHistory = () => {
        return conversationHistory.map((text, index) => (
            <div className="tour-question-container">
                <p className="tour-question-text" key={index}>{text}</p>
            </div>
        ));
    };

    const renderCurrentStep = () => {
        // Only render the current step if the tour is not completed and the current step is within bounds
        if (!tourCompleted && currentStepIndex < conversationSteps.length) {
            const currentStep = conversationSteps[currentStepIndex];
            return (
                <div className="tour-question-container">
                    <p className="tour-question-text">{currentStep.dialogue}</p>
                    <div className="options">
                        {currentStep.options.map((option, index) => (
                            <button key={index} onClick={() => handleAnswerSelection(option)} className="entry-button">
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            );
        }
        return null;
    };
    


    const handleBasicEntry = async () => {
        try {
            const basicTXid =await fcl.mutate({
                cadence: transferTit,
                args: (arg, t) => [
                    arg("4.0", t.UFix64),
                    arg("0x66b60643244a7738", t.Address)
                ],
                proposer: fcl.currentUser,
                payer: fcl.currentUser,
                authorizations: [fcl.currentUser],
                limit: 999,
            });
            setBasicEntrySuccess(true);
            toast.success("Transaction successful! Welcome to the Tit Palace.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error("Error Entering Palace:", error);
        }
    };

    const handlePremiumEntry = async () => {
        try {
            const basicTXid =await fcl.mutate({
                cadence: transferTit,
                args: (arg, t) => [
                    arg("180.0", t.UFix64),
                    arg("0x66b60643244a7738", t.Address)
                ],
                proposer: fcl.currentUser,
                payer: fcl.currentUser,
                authorizations: [fcl.currentUser],
                limit: 999,
            });
            setPremiumEntrySuccess(true);
            toast.success("Transaction successful! Welcome to the Tit Palace.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error("Error Entering Palace:", error);
        }
    };

    const handleVipEntry = async () => {
        try {
            const basicTXid =await fcl.mutate({
                cadence: transferTit,
                args: (arg, t) => [
                    arg("350.0", t.UFix64),
                    arg("0x66b60643244a7738", t.Address)
                ],
                proposer: fcl.currentUser,
                payer: fcl.currentUser,
                authorizations: [fcl.currentUser],
                limit: 999,
            });
            setVipEntrySuccess(true);
            toast.success("Transaction successful! Welcome to the Tit Palace.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error("Error Entering Palace:", error);
        }
    };

    if (basicEntrySuccess) {
        return (
            <>
                <ToastContainer />
                {incorrectAnswerGiven ? renderSophiasResponse() : (
                    <>
                        {renderConversationHistory()}
                        {renderCurrentStep()}
                        {renderTourCompletion()}
                    </>
                )}
            </>
        );
    }

    if (premiumEntrySuccess) {
        return (
            <>
                <ToastContainer />
                <div className="teaser-top">
                    <h2>Welcome to Premium</h2>
                </div>
            </>
        );
    }

    if (vipEntrySuccess) {
        return (
            <>
                <ToastContainer />
                <div className="teaser-top">
                    <h2>Welcome to VIP</h2>
                </div>
            </>
        )
    }

    return (
        <div className="teaser-container">
            <ToastContainer />
            <div className="teaser-top">
                <h2>Join a Tit Palace Tour </h2>
                <h3>Answer Questions, Earn Rewards, and Seek Exclusive Company</h3>
                <h5>Your Balance: {balance} $TIT</h5>
            </div>
            <div className="entry-row">
                <div className="entry-column">
                    <h5>Basic Entry - 4 $TIT<br></br> Guide: Sophia</h5>
                    <img src={basic} alt="Basic entry ticket to the Tit Palace. 50 $TIT token entry fee."></img>

                    <ul>
                        <li>Embark on a mystical journey with Sophia in the Tit Palace.</li>
                        <li>Explore captivating gardens and grand halls.</li>
                        <li>Engage in Sophia’s intriguing five-question quiz.</li>
                        <li>Test your wit and luck.</li>
                        <li>Win <strong>729 $TIT Tokens</strong> for answering all questions correctly!</li>
                    </ul>

                    <button
                        onClick={handleBasicEntry}
                        className="entry-button"
                    >
                        Enter
                    </button>
                    
                </div>
                <div className="entry-column">
                    <h5>Premium Access - 8 $TIT<br></br>Guide: Isabella</h5>
                    <img src={premium} alt="Premium Access ticket to the Tit Palace. 150 $TIT token entry fee."></img>
                    
                    <ul>{/* 
                        <li>Engage with Isabella's moderately challenging questions.</li>
                        <li>Earn a portion of your entry fee back per correct answer.</li>
    <li>Make it to Isabella's room: Receive your fee + 75% more (315 $TIT total).</li>*/}
                        <li>COMING SOON</li>
                    </ul>

                    <button
                        /*onClick={handlePremiumEntry}*/
                        className="entry-button"
                    >
                        Enter
                    </button>

                </div>
                <div className="entry-column">
                    <h5>VIP Experience - 16 $TIT<br></br>Guide: Olivia</h5>
                    <img src={vip} alt="VIP Excperience ticket to the Tit Palace. 450 $TIT token entry fee."></img>
                    <ul>{/*
                        <li>Face Olivia's most intriguing and difficult questions.</li>
                        <li>Partial entry fee returned for each correct response.</li>
<li>Enter Olivia's room: Get your fee back plus a 100% bonus (700 $TIT total).</li>*/}
                        <li>COMING SOON</li>
                    </ul>
                    <button
                        /*onClick={handleVipEntry}*/
                        className="entry-button"
                    >
                        Enter
                    </button>

                </div>
            </div>
        </div>
    );


}