import React from 'react';
import Web3 from 'web3';
import leagueABI from "../contractsBin/league.json";
import { Config } from "../config/Config";

class ResetLeague extends React.Component {

    async resetLeague() {
        // Metamask insert web3 object into window object when the account is unlocked
        var web3 = new Web3(window.web3.currentProvider);
        const leagueAddress = Config.LeagueContractAddress;
        let contract = new web3.eth.Contract(leagueABI, leagueAddress);
        let accounts = await web3.eth.getAccounts();
        await contract.methods.resetLeague().send({ from: accounts[0], gas: 600000 });
    }

    render() {
        return (
            <div className="Reset league">
                <button onClick={this.resetLeague}>Reset league</button>
            </div>
        );
    }
}

export default ResetLeague;