export const removeTresor = `
import FungibleToken from 0xf233dcee88fe0abe
import TitToken from 0x66b60643244a7738
import TitTokenRepository from 0x66b60643244a7738

transaction(tresorId: UInt64, sellerAddress: Address) {
    let repositoryRef: &TitTokenRepository.Repository{TitTokenRepository.RepositoryManager}

    prepare(signer: AuthAccount) {
        // Ensure the signer is authorized to remove the Tresor
        assert(signer.address == sellerAddress, message: "Only the seller can remove their Tresor")

        // Borrow a reference to the Repository resource
        self.repositoryRef = signer.borrow<&TitTokenRepository.Repository{TitTokenRepository.RepositoryManager}>(
            from: TitTokenRepository.RepositoryStoragePath
        ) ?? panic("Could not borrow reference to the Repository")
    }

    execute {
        // Call the removeTresor function
        self.repositoryRef.removeTresor(signer: sellerAddress, tresorId: tresorId)
    }
}
`