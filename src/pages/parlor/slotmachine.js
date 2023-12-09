import React, { useState } from 'react';
import './slotmachine.css'; // Import your CSS file

const SlotMachine = () => {
    // Array of images
    const images = ['image1.png', 'image2.png', 'image3.png'];

    // State to hold the current images
    const [currentImages, setCurrentImages] = useState(images);

    // Function to "spin" the slot machine
    const spin = () => {
        // Shuffle logic or random selection of images
        const newImages = images.sort(() => Math.random() - 0.5);
        setCurrentImages([...newImages]);
    };

    return (
        <div className="slot-machine">
            <div className="slot-row">
                {currentImages.map((image, index) => (
                    <img key={index} src={image} alt={`Slot ${index}`} />
                ))}
            </div>
            <button onClick={spin}>Spin</button>
        </div>
    );
};

export default SlotMachine;
