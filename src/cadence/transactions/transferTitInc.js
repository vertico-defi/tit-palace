export const transferTitInc = `

// Testnet
// import FungibleToken from 0x9a0766d93b6608b7
// import TitToken from 0x6e9ac121d7106a09
// import TokenTransferEventContract from 0x6e9ac121d7106a09

// Mainnet
import FungibleToken from 0xf233dcee88fe0abe
import TitToken from 0x66b60643244a7738
import TokenTransferEventContract from 0x66b60643244a7738

transaction(amount: UFix64, to: Address, from: Address, value: UInt64) {

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

        TokenTransferEventContract.emitBasicTourIncomplete(value: value, address: from)
    }
}
`