export const transferFlow = `

// Testnet
// import FungibleToken from 0x9a0766d93b6608b7
// import FlowToken from 0x7e60df042a9c0868
// import TokenTransferEventContract from 0x6e9ac121d7106a09

// Mainnet
import FungibleToken from 0xf233dcee88fe0abe
import FlowToken from 0x1654653399040a61
import TokenTransferEventContract from 0x66b60643244a7738

transaction(recipientAddress: Address, amount: UFix64) {
    let senderVaultRef: &FlowToken.Vault
    let recipientVault: Capability<&FlowToken.Vault{FungibleToken.Receiver}>

    prepare(signer: AuthAccount) {
        self.senderVaultRef = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault) 
            ?? panic("Unable to borrow reference to sender vault")
        
        self.recipientVault = getAccount(recipientAddress).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)

    }

    execute {
        let sentVault <- self.senderVaultRef.withdraw(amount: amount)
        
        let receiver = self.recipientVault.borrow() 
            ?? panic("Could not borrow receiver reference from recipientVault capability")
        
        receiver.deposit(from: <-sentVault)

        TokenTransferEventContract.emitTokensTransferred(amount: amount)
    }
}
`

