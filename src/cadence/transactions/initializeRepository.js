export const initializeRepository = `
import TitTokenRepository from 0x66b60643244a7738

transaction {

    prepare(signer: AuthAccount) {
        // Create a new Repository
        let repository <- TitTokenRepository.createRepository()

        // Save it to the signer's account
        signer.save(<-repository, to: TitTokenRepository.RepositoryStoragePath)

        // Create a public link to the Repository
        signer.link<&TitTokenRepository.Repository{TitTokenRepository.RepositoryPublic}>(
            TitTokenRepository.RepositoryPublicPath,
            target: TitTokenRepository.RepositoryStoragePath
        )

    }

    execute {
        // Execution logic (if any) goes here
    }
}
`
