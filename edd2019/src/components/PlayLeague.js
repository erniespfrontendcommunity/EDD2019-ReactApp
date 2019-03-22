import * as React from 'react';
import Web3 from 'web3';
import leagueABI from "../contractsBin/league.json";


class PlayLeague extends React.Component {

    async playLeague() {
        // Metamask insert web3 object into window object when the account is unlocked
        var web3 = new Web3(window.web3.currentProvider);  
        const leagueAddress = "0x3aeb8c7e110d3abf46f4d2a6a947a730e70c8b1e";
        let contract = new web3.eth.Contract(leagueABI, leagueAddress);
        let accounts = await web3.eth.getAccounts();
        await contract.methods.playGame().send({ from: accounts[0], gas: 600000 });
    }

    render() {
        return (
            <div className="PlayLeague">
                <button onClick={this.playLeague}>Play league</button>
            </div>
        );
    }
}

export default PlayLeague;