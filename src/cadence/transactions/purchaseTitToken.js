export const purchaseTitToken = `
import TitTokenMarket from 0x66b60643244a7738 // Replace with the actual address where the contract is deployed
import FungibleToken from 0xf233dcee88fe0abe

transaction(listingId: UInt64, paymentAmount: UFix64) {
    let paymentVault: @FungibleToken.Vault
    let buyer: AuthAccount

    prepare(signer: AuthAccount) {
        // Assign the signer to the buyer field
        self.buyer = signer

        // Make sure the signer's account has a FlowToken vault
        let vaultRef = signer.borrow<&FungibleToken.Vault{FungibleToken.Provider}>(from: /storage/flowTokenVault)
            ?? panic("Could not borrow reference to the FlowToken vault")

        // Withdraw Flow tokens for payment
        self.paymentVault <- vaultRef.withdraw(amount: paymentAmount)
    }

    execute {
        // Call the purchaseTokens function from the TitTokenMarket contract
        TitTokenMarket.purchaseTokens(listingId: listingId, buyer: self.buyer, paymentVault: <-self.paymentVault)
    }
}
`