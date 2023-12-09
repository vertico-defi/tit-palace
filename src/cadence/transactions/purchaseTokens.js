export const purchaseTokens = `

import FungibleToken from 0xf233dcee88fe0abe
import TitToken from 0x66b60643244a7738
import TitTokenRepository from 0x66b60643244a7738

transaction(tresorId: UInt64, paymentAmount: UFix64, sellerAddress: Address) {
    let paymentVault: @FungibleToken.Vault
    let buyer: AuthAccount

    prepare(signer: AuthAccount) {
        self.buyer = signer

        // Borrow a reference to the buyer's Flow token vault
        let vaultRef = signer.borrow<&FungibleToken.Vault{FungibleToken.Provider}>(
            from: /storage/flowTokenVault
        ) ?? panic("Could not borrow reference to the Flow token vault")

        // Withdraw Flow tokens for payment
        self.paymentVault <- vaultRef.withdraw(amount: paymentAmount)
    }

    execute {
        // Get a reference to the seller's account
        let sellerAccount = getAccount(sellerAddress)

        // Borrow a reference to the seller's Repository
        let sellerRepositoryRef = sellerAccount
            .getCapability<&TitTokenRepository.Repository{TitTokenRepository.RepositoryPublic}>(
                TitTokenRepository.RepositoryPublicPath
            )
            .borrow()
            ?? panic("Could not borrow reference to the seller's Repository")

        // Borrow a reference to the Tresor resource
        let tresorRef = sellerRepositoryRef.borrowTresor(tresorResourceID: tresorId)
            ?? panic("Tresor does not exist")

        // Transfer the payment to the seller
        let sellerReceiver = sellerAccount.getCapability<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)
            .borrow()
            ?? panic("Could not borrow receiver reference to the seller's Flow token vault")
        sellerReceiver.deposit(from: <- self.paymentVault)

        // Transfer the TitTokens to the buyer
        let buyerReceiver = self.buyer.getCapability<&{FungibleToken.Receiver}>(TitToken.VaultReceiverPath)
            .borrow()
            ?? panic("Could not borrow receiver reference to the buyer's TitToken vault")
//        tresorRef.transferTokens(buyerVaultRef: buyerReceiver)
        tresorRef.transferAndRemoveTresor(buyerVaultRef: buyerReceiver, repositoryRef: sellerRepositoryRef)


        // Emit a purchase event
//        emit TitTokenRepository.TokensPurchased(
//            tresorId: tresorId, 
//            buyer: self.buyer.address, 
//            price: tresorRef.getDetails().price, 
//            amount: tresorRef.getDetails().amount
//        )
    }
}
`
