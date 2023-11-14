import { useEffect, useState } from "react";
import { Col, Card, Button, Form } from "react-bootstrap";
//import { ReactCardFlip } from '../lib/react-card-flip';
import ReactCardFlip from "react-card-flip";
import * as fcl from "@onflow/fcl";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllNFTs } from '../../cadence/scripts/getAllNFTs';

let ADDRESS = '0x6e9ac121d7106a09';

export default function Rewards() {
    const [user, setUser] = useState({ loggedIn: null });
    const [nft, setNFT] = useState([]);
    const [userAddress, setUserAddress] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        fcl.currentUser.subscribe(setUser);
        setUserAddress(user.addr);
        console.log(userAddress);
      }, []);

    useEffect(() => {
        getNFTs();
    })

    const getNFTs = async () => {
        if (user.loggedIn === null) return;
        const res = await fcl.query({
        cadence: getAllNFTs,
        args: (arg, t) => [arg(user?.addr, t.Address)],
        });

        console.log('NFT - ', res);
        setNFT(res);
    };

    const profileClick = (name) => {
        setIsFlipped(!isFlipped);
      };

    return(
        <div>
            <p>Welcome to the Rewards page!!</p>
        </div>
    )

   /* useEffect(() => {

    if(props.data.nftType === "Genesis") {
    Genesis_Metadata.map((data) => {
        if (data.revealDisplay.name === props.data.name){
        setGenesisMetadata(data.metadata);
        }
    });     

    setThumbnail(props.data.thumbnail);
    setIsVideo(false);
    } 

})

    
    if (metadata) {
    backCard = (
        <div className="row font-13 mt-4">
        {metadata.map((data, index) => (
            <div key={index} className="col-6">
            <p className="text-white">
                {data.trait_type} <br /> {data.value}
            </p>
            </div>
        ))}
        </div>
    );
    }

    if (genesisMetadata) {
        overall = (parseInt(genesisMetadata.Mental) + parseInt(genesisMetadata.Luck) + 
          parseInt(genesisMetadata["Physical Stamina"]) + parseInt(genesisMetadata.Teamwork))/4;
    
        backCard = 
          <div className="gen-backcard-container">
    
              <div className="trait-row">
                <p className="text-white">
                 <span>Team: </span> &nbsp; {genesisMetadata.Team}
                </p>
              </div>
    
              <div className="trait-row">
                <p className="text-white">
                  <span>Background: </span> &nbsp; {genesisMetadata.Background}
                </p>
              </div>
    
              <div className="trait-row">
                <p className="text-white">
                  <span>Helmet: </span> &nbsp; {genesisMetadata.Helmet}
                </p>
              </div>
    
              <div className="trait-row">
                <p className="text-white">
                  <span>Suit: </span> &nbsp; {genesisMetadata.Suit}
                </p>
              </div>
    
              <div className="trait-row">
                <p className="text-white">
                  <span>Special Skill:</span> &nbsp; {genesisMetadata["Special Skill"]}
                </p>
              </div>
    
              <div className="trait-row">
                <p className="text-white">
                  <span>Luck:</span> &nbsp; {genesisMetadata.Luck}
                </p>
              </div>
    
              <div className="trait-row">
                <p className="text-white mb-3">
                  <span>Mental:</span> &nbsp; {genesisMetadata.Mental}
                </p>
              </div>
    
              <div className="trait-row">
                <p className="text-white mb-3">
                  <span>Teamwork:</span> &nbsp; {genesisMetadata.Teamwork}
                </p>
              </div>
    
              <div className="trait-row">
                <p className="text-white mb-3">
                  <span>Physical Stamina:</span> &nbsp; {genesisMetadata["Physical Stamina"]}
                </p>
              </div>
    
              <div className="trait-row">
                <p className="text-white mb-3">
                  <span>Overall: </span> &nbsp; {overall}
                </p>
              </div>
          </div>
      }

      return (
        <div className='col-xxl-2 col-xl-3 col-md-4 col-sm-6 p-3'>
          <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <Card className="p-3" bg={"dark"}>
              <div className="card-content">
                <div className="card-img-row">
                  {isVideo ?
                  <video width="100%" height="auto" className='media'controls>
                    <source src={thumbnail} type="video/mp4" />
                  </video>
                  
                  :
                  <Card.Img variant="top" className='media' src={thumbnail} />
                  }   
                </div>
                <div className="card-name-row">    
                  <h5 className="text-center mt-2 font-style">{props.data.name}</h5>
                </div>
                <div className="card-button-row">  
                  {props.data.nftType === "Car Club" ?
                    <>              
                      {props.data.thumbnail === "https://ipfs.io/ipfs/QmPWCRKuzQqhwAjtC2RjUCQJZgcc42yBrhMHgA9YNJihjv/Placeholder.png" ?
                        <>
                          <div className="button-container">
                            <p
                              className="custom-text text-center mb-2 mt-2"
                              onClick={() => profileClick(props.data.name)}
                            >
                              See Profile
                            </p>
                            <p
                              // variant="warning"
                              className="custom-text text-center mb-2 mt-2"
                              onClick={() => revealClick(props.data.nftId)} 
                                    
                            >
                              Reveal
                            </p> 
                            {stakingInitialized && (
                              isStaked ? (
                                <p className="custom-text text-center mb-2 mt-2" role="button" onClick={handleUnstakeClick}>
                                  Unstake
                                </p>
                              ) : (
                                <p className="custom-text text-center mb-2 mt-2" role="button" onClick={handleStakeClick}>
                                  Stake
                                </p>
                              )
                            )}
                          </div>
                          </>
                        :
                          <>
                            <div className="button-container">
                              <p
                                className="custom-text text-center mb-2 mt-2"
                                role="button"
                                onClick={() => profileClick(props.data.name)}
                              >
                                See Profile
                              </p>
                              {stakingInitialized && (
                                isStaked ? (
                                  <p className="custom-text text-center mb-2 mt-2" role="button" onClick={handleUnstakeClick}>
                                    Unstake
                                  </p>
                                ) : (
                                  <p className="custom-text text-center mb-2 mt-2" role="button" onClick={handleStakeClick}>
                                    Stake
                                  </p>
                                )
                            )}
                            </div>
                          </>
                        
                      }            
                    </>
                  :
                    <>
                      <div className="button-container">
                        <p
                          className="custom-text text-center mb-2 mt-2"
                          onClick={() => profileClick(props.data.name)}
                          role="button"
                        >
                          See Profile
                        </p>
                        {stakingInitialized && (
                          isStaked ? (
                            <p className="custom-text text-center mb-2 mt-2" role="button" onClick={handleUnstakeClick}>
                              Unstake
                            </p>
                          ) : (
                            <p className="custom-text text-center mb-2 mt-2" role="button" onClick={handleStakeClick}>
                              Stake
                            </p>
                          )
                        )}
                      </div>
                      {/*{props.data.listed ?
                        <>
                          <div className="button-container">
                            <p className="text-white text-center mt-1">
                              Listed for ${parseInt(props.data.price)}
                            </p>
                            <Button variant="warning" className="mt-2"
                              onClick={() => removeListingClick(props.data.listingId)}>
                              Remove Listing
                            </Button> 
                          </div>                 
                        </>                
                      :
                        <>
    
                          <Form.Control type="number" placeholder="Type price for sale" 
                            onChange = {e => {
                              const enteredPrice = Number(e.target.value);
                              const adjustedPrice = (enteredPrice * 1.05).toFixed(8);
                              setPrice(enteredPrice)
                              }}/>
    
                          {props.id ?
                          <Button
                            variant="warning"
                            className="mt-3"
                            onClick={() => listClick(props.id)}
                          >
                            List for Sale
                          </Button>
                          :
                          <Button
                            variant="warning"
                            className="mt-3"
                            onClick={() => listClick(props.data.nftId)}
                          >
                            List for Sale
                          </Button>
                          }                  
                        </>
                      }             
                    </>            
                  }      
                </div> 
                {/* <Button variant="warning" className="mt-3" onClick={() => transferClick(props.data.id)}>
                  Transfer to new Owner
                </Button> 
              </div>
            </Card>
    
            <Card className="p-3" bg={"dark"}>
              <div className="backcard-container">
                <div className="backcard-title">
                  <h5 className="text-center font-style mt-4 mb-3">
                    {props.data.name}
                  </h5>
                </div>
    
                {backCard}
    
                {props.data.traits && 
                  <>
                    
                    <div className="trait-row">
                      <p className="text-white">
                        CAR PART  {props.data.traits["Car Part"]}
                      </p>
                    </div>
    
                    <div className="trait-row">
                      <p className="text-white">
                        PART RARITY <br /> {props.data.traits["Part Rarity"]}
                      </p>
                    </div>
                    
                    <div className="trait-row">
                      <p className="text-white">
                        BACKGROUND <br /> {props.data.traits["Background"]}
                      </p>
                    </div>
                    
                    <div className="trait-row">
                      <p className="text-white">
                        TIRE COMPOUND <br /> {props.data.traits["Tire Compound"]}
                      </p>
                    </div>
                  
                    <div className="trait-row">
                      <p className="text-white">
                        TIRE TREAD <br /> {props.data.traits["Tire Tread"]}
                      </p>
                    </div>
    
                    <div className="trait-row">
                      <p className="text-white">
                        TIRE DESIGN <br /> {props.data.traits["Tire Design"]}
                      </p>
                    </div>
                    
                    <div className="trait-row">
                      <p className="text-white">
                        RIM STYLE <br /> {props.data.traits["Rim Style"]}
                      </p>
                    </div>
    
                    <div className="trait-row">
                      <p className="text-white">
                        LOGO FORMAT <br /> {props.data.traits["Logo Format"]}
                      </p>
                    </div>
                    
                    <div className="trait-row">
                      <p className="text-white">
                        LEGENDARY VERSION <br /> {props.data.traits["Legendary Version"]}
                      </p>
                    </div>
    
                    <div className="trait-row">
                      <p className="text-white">
                        STAKING % <br /> {props.data.traits["Staking %"]}
                      </p>
                    </div>
                    
                    <div className="trait-row">
                      <p className="text-white">
                        SPEED <br /> {props.data.traits["Speed"]}
                      </p>
                    </div>
                    
                    <div className="trait-row">
                      <p className="text-white">
                        BRAKING <br /> {props.data.traits["Braking"]}
                      </p>
                    </div>
                    
                    <div className="trait-row">
                      <p className="text-white">
                        PASSING <br /> {props.data.traits["Passing"]}
                      </p>
                    </div>
    
                    <div className="trait-row">
                      <p className="text-white">
                        TURNING <br /> {props.data.traits["Turning"]}
                      </p>
                    </div>
                    
                  </>
                }
                <div className="backcard-button">
                  <p
                    className="custom-text text-center mb-0 font-weight-bold"
                    onClick={() => profileClick(props.data.name)}
                    role="button"
                  >
                    Back
                  </p>
                </div>
              </div>
            </Card>
          </ReactCardFlip>
        </div>
      );
      */
}