import * as React from 'react';
import Web3 from 'web3';
import leagueABI from "../contractsBin/league.json";
import {Config} from "../config/Config";

class Classification extends React.Component {

    async getClassification() {
        // Metamask insert web3 object into window object when the account is unlocked
        var web3 = new Web3(window.web3.currentProvider);
        let contract = new web3.eth.Contract(leagueABI, Config.LeagueContractAddress);
        let accounts = await web3.eth.getAccounts();
        await contract.methods.playGame().send({ from: accounts[0], gas: 600000 });
    }

    render() {
        return (
            <div className="Classification">
                <button onClick={this.getClassification}>Get classification</button>
            </div>
        );
    }
}

export default Classification;