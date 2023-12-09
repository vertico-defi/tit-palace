export const transferTit =`
import FungibleToken from 0xf233dcee88fe0abe
import TitToken from 0x66b60643244a7738

transaction(amount: UFix64, to: Address) {

    let sentVault: @FungibleToken.Vault

    prepare(signer: AuthAccount) {
        let vaultRef = signer.borrow<&{FungibleToken.Provider}>(from: TitToken.VaultStoragePath)
        ?? panic("Could not borrow reference to the owners''s vault!")

        self.sentVault <- vaultRef.withdraw(amount: amount)
    }

    execute {
        let recipient = getAccount(to)

        let receiverRef = recipient.getCapability(TitToken.VaultReceiverPath)!.borrow<&{FungibleToken.Receiver}>()
        ?? panic("Could not borrow receiver reference to the recipient''s vault")

        receiverRef.deposit(from: <- self.sentVault)
    }
}

`