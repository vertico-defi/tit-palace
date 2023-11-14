export const transferFlow = `

/// Mainnet
import FungibleToken from 0xf233dcee88fe0abe
import TitToken from 0x6e9ac121d7106a09
import FlowToken from 0x1654653399040a61

transaction(amountVroom: UFix64, amountFlow: UFix64, to: Address) {

    let sentVault: @FungibleToken.Vault
    let senderVaultRef: &FlowToken.Vault
    let recipientVault: Capability<&FlowToken.Vault{FungibleToken.Receiver}>

    prepare(signer: AuthAccount) {

        /// Vroom Movement
        let vaultRef = signer.borrow<&{FungibleToken.Provider}>(from: TitToken.VaultStoragePath)
        ?? panic("Could not borrow reference to the owners''s vault!")
        self.sentVault <- vaultRef.withdraw(amount: amountVroom)

        /// Flow Movement
        self.senderVaultRef = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault) 
        ?? panic("Unable to borrow reference to sender vault")


        let recipientAddress = to
        self.recipientVault = getAccount(recipientAddress).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)

    }

    execute {

        /// Vroom Movement
        let recipient = getAccount(to)

        let receiverRef = recipient.getCapability(TitToken.VaultReceiverPath)!.borrow<&{FungibleToken.Receiver}>()
        ?? panic("Could not borrow receiver reference to the recipient''s vault")

        receiverRef.deposit(from: <- self.sentVault)

        /// Flow Movement
        let sentVault <- self.senderVaultRef.withdraw(amount: amountFlow)
        
        let receiver = self.recipientVault.borrow() 
            ?? panic("Could not borrow receiver reference from recipientVault capability")
        
        receiver.deposit(from: <-sentVault)
    }
}
`

