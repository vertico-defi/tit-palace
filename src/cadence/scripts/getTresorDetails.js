export const getTresorDetails = `import TitTokenRepository from 0x66b60643244a7738

pub struct TresorInfo {
    pub let tresorID: UInt64
    pub let seller: Address
    pub let price: UFix64
    pub let amount: UFix64

    init (tresorID: UInt64, seller: Address, price: UFix64, amount: UFix64) {
        self.tresorID = tresorID
        self.seller = seller
        self.price = price
        self.amount = amount
    }
}

pub fun main(repositoryAddress: Address): [TresorInfo]  {

    let tresorInfo: [TresorInfo] = []

    let repositoryRef = getAccount(repositoryAddress)
        .getCapability<&TitTokenRepository.Repository{TitTokenRepository.RepositoryPublic}>(
            TitTokenRepository.RepositoryPublicPath
        )!
        .borrow()
        ?? panic("Could not borrow reference to the TitTokenRepository")

    let tresorIds = repositoryRef.getTresorIDs()
    var tresorDetails: {UInt64: TitTokenRepository.TresorDetails} = {}

    for tresorId in tresorIds {
            let tresor = repositoryRef.borrowTresor(tresorResourceID: tresorId)
                ?? panic("Tresor does not exist.")

            let tresorId = tresorId
            let seller = tresor.getDetails().seller
            let price = tresor.getDetails().price
            let amount = tresor.getDetails().amount

            

            tresorInfo.append(TresorInfo(tresorID: tresorId, seller: seller, price: price, amount: amount))
    }

    return tresorInfo
}
`