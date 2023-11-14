import React, { useState, useEffect } from "react";
import './teasers.css'
import { transferFlow } from '../../cadence/transferFlow';
import * as fcl from '@blocto/fcl';
import { ToastContainer, toast } from 'react-toastify';

function TextBasedGame() {
    const [storyText, setStoryText] = useState("You wake up in a mysterious forest with no memory of how you got there. All you have is a small backpack, a note, and a strange-looking compass. The note says, 'Choose wisely, and you may find your way home.' Do you want to look inside the backpack?");
    const [choices, setChoices] = useState(['yes', 'no']);
    const [flashlight, setFlashlight] = useState(false);
    const [goldCoins, setGoldCoins] = useState(false);

    



    function choose(decision) {
        if (decision === 'yes') {
            setStoryText("You find a water bottle, a flashlight, and a small knife. The compass glows and points in two directions: East and West. Which way do you go?");
            setFlashlight(true);
            setChoices(['east', 'west']);
        } else if (decision === 'no') {
            setStoryText("You decide to move on without checking. The compass glows and points in two directions: East and West. Which way do you go?");
            setChoices(['east', 'west']);
        } else if (decision === 'east') {
            if (flashlight) {
                setStoryText("You find a river with a broken bridge. You can attempt to cross or search for another way.");
                setChoices(['cross', 'search']);
            } else {
                setStoryText("You find a river with a broken bridge. You attempt to cross but drop the flashlight. It's now too dark to see clearly.");
                endGame();
            }
        } else if (decision === 'west') {
            if (flashlight) {
                setStoryText("You encounter a dark cave. You use the flashlight and find a chest with gold coins!");
                setGoldCoins(true);
                endGame();
            } else {
                setStoryText("You encounter a dark cave. It's too dark to see anything. You feel something slimy and decide to head back.");
                endGame();
            }
        } else if (decision === 'cross') {
            setStoryText("You attempt to cross but drop the flashlight. It's now too dark to see clearly.");
            setFlashlight(false);
            endGame();
        } else if (decision === 'search') {
            setStoryText("You find a boat further down the river. You manage to cross safely!");
            endGame();
        }
    }

    function endGame() {
        if (goldCoins) {
            setStoryText(prevText => prevText + " A mysterious merchant appears and offers you a map home in exchange for the gold coins.");
        } else {
            setStoryText(prevText => prevText + " You use the compass and after a long journey, find your way back to a familiar path leading home.");
        }
        setChoices([]);  // Clear out choices at the end of the game
    }

    return (
        <div className="container-main">
            <p>{storyText}</p>
            {choices.map(choice => (
                <button key={choice} onClick={() => choose(choice)}>
                    {choice.charAt(0).toUpperCase() + choice.slice(1)}
                </button>
            ))}
        </div>
    );
}

function Teasers() {
    return(
    <div>
        <TextBasedGame />
    </div>
    );
}

export default Teasers;