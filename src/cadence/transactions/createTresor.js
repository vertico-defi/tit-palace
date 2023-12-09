export const createTresor = `
import FungibleToken from 0xf233dcee88fe0abe
import TitToken from 0x66b60643244a7738
import TitTokenRepository from 0x66b60643244a7738

transaction(price: UFix64, amount: UFix64) {

    let signer: AuthAccount
    let titTokenVaultRef: &TitToken.Vault{FungibleToken.Provider}

    prepare(signer: AuthAccount) {
        self.signer = signer

        // Borrow a reference to the signer's TitToken vault
        self.titTokenVaultRef = signer.borrow<&TitToken.Vault{FungibleToken.Provider}>(
            from: TitToken.VaultStoragePath
        ) ?? panic("Could not borrow reference to the TitToken vault")

                // Get a reference to the TitTokenRepository's Repository
        let repositoryRef = signer.borrow<&TitTokenRepository.Repository{TitTokenRepository.RepositoryManager}>(
            from: TitTokenRepository.RepositoryStoragePath
        ) ?? panic("Could not borrow reference to the TitTokenRepository")

        // Call the createTresor method to list TitTokens for sale
        let tresorId = repositoryRef.createTresor(
            signer: self.signer, 
            price: price, 
            amount: amount
        )

    }

    execute {

    }
}
`