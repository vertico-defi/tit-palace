export const initTit=`
//Testnet

//import FungibleToken from 0x9a0766d93b6608b7
//import DriverzNFT from 0x39bea87bca27e210
//import VroomToken from 0xb23640d151fd611d
//import CarClub from 0xb23640d151fd611d
//import DriverzExclusive  from 0xb23640d151fd611d
//import MetadataViews from 0x631e88ae7f1d7c20
//import NonFungibleToken from 0x631e88ae7f1d7c20

//Mainnet

import FungibleToken from 0xf233dcee88fe0abe
import TitToken from 0x66b60643244a7738

transaction() {

let address: Address

    prepare(account: AuthAccount){

        self.address = account.address

        if account.borrow<&TitToken.Vault>(from: TitToken.VaultStoragePath) == nil {
            let vault <- TitToken.createEmptyVault()
            account.save<@TitToken.Vault>(<-vault, to: TitToken.VaultStoragePath)
        }

        let titTokenCap = account.getCapability<&TitToken.Vault{FungibleToken.Receiver}>(TitToken.VaultReceiverPath)
        if(!titTokenCap.check()) {
            account.unlink(TitToken.VaultReceiverPath)
            // Create a public Receiver capability to the Vault
            account.link<&TitToken.Vault{FungibleToken.Receiver, FungibleToken.Balance}>(TitToken.VaultReceiverPath, target: TitToken.VaultStoragePath)
        }

        let titTokenCapBalance = account.getCapability<&TitToken.Vault{FungibleToken.Balance}>(TitToken.VaultBalancePath)
        if(!titTokenCapBalance.check()) {
            account.unlink(TitToken.VaultBalancePath)
            // Create a public Receiver capability to the Vault
            account.link<&TitToken.Vault{FungibleToken.Balance}>(TitToken.VaultBalancePath, target: TitToken.VaultStoragePath)
        }
    }
}
`