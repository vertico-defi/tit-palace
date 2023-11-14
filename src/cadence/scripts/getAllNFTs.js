export const getAllNFTs = `
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetadataViews from 0x631e88ae7f1d7c20
import DriverzNFT from 0x6e9ac121d7106a09

pub struct NFTData {
    pub let nftId: UInt64
    pub let nftType: String
    pub let thumbnail: String
    pub let name: String
    pub let description: String


    init(nftId: UInt64, nftType: String, thumbnail: String, name: String, description: String, listed: Bool, price: UFix64?, listingId: UInt64) {
        self.nftId = nftId
        self.nftType = nftType
        self.thumbnail = thumbnail
        self.name = name
        self.description = description
    }
}

pub fun main(address: Address): [NFTData] {
    let nftData: [NFTData] = []

    let account = getAccount(address)



    //DRIVERZ NFTS CHECK
    if(account.getCapability<&{NonFungibleToken.CollectionPublic}>(DriverzNFT.CollectionPublicPath).borrow() != nil){
        let marketCollectionRef = account.getCapability<&{NonFungibleToken.CollectionPublic}>(DriverzNFT.CollectionPublicPath).borrow()!
        let carIds = marketCollectionRef.getIDs()

        for nftID in carIds {
            let nft = marketCollectionRef.borrowNFT(id: nftID) 
                        


            let view = nft.resolveView(Type<MetadataViews.Display>())!
            let display = view as! MetadataViews.Display

            let nftID = nft.id
            let uri = display.thumbnail.uri().slice(from: 7, upTo: display.thumbnail.uri().length)
            let url = "https://ipfs.io/ipfs/".concat(uri)
            var price: UFix64? = nil
            var listed: Bool = false
            let nftType = "Genesis"
            var listingId: UInt64 = 0


            nftData.append(NFTData(nftId: nftID, nftType: nftType ,thumbnail: url, name: display.name, description: display.description, listed: listed, price: price, listingId: listingId))
        }
    }

    return nftData
}

`