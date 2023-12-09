export const getTitBalance = `

// Testnet
// import FungibleToken from 0x9a0766d93b6608b7
// import TitToken from 0x6e9ac121d7106a09


// Mainnet
import FungibleToken from 0xf233dcee88fe0abe
import TitToken from 0x66b60643244a7738


pub fun main(address: Address): UFix64 {
    let vaultRef = getAccount(address).getCapability<&{FungibleToken.Balance}>(/public/TitTokenBalance)
        .borrow()
        ?? panic("Could not borrow reference to the vault!")

    return vaultRef.balance
}


// start main: 444434394.00000000

// after main: 444434294.00000000

// start user: 9580.00000000

`