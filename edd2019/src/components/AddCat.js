import * as React from 'react';
import Web3 from 'web3';
import catABI from "../contractsBin/cat.json";
import {Config} from "../config/Config";


class AddCat extends React.Component {

    async addCat() {
        // Metamask insert web3 object into window object when the account is unlocked
        var web3 = new Web3(window.web3.currentProvider);  
        let contract = new web3.eth.Contract(catABI, Config.CatContractAddress);
        let accounts = await web3.eth.getAccounts();
        await contract.methods.addCat("catName1", 2, 2, 2, 2, 2, 2).send({ from: accounts[0], value: web3.utils.toWei("0.1", "ether"), gas: 600000 })
    }

    async addSquad() {
        // Metamask insert web3 object into window object when the account is unlocked
        var web3 = new Web3(window.web3.currentProvider);  
        let contract = new web3.eth.Contract(catABI, Config.LeagueContractAddress);
        let accounts = await web3.eth.getAccounts();
        await contract.methods.addCat("squad1", 0, 1, 2).send({ from: accounts[0], gas: 600000 })
    }

    render() {
        return (
            <div className="App">
                <p>Form goes here?</p>
                <div className="AddCat">
                    <button className="nes-btn is-primary" onClick={this.addCat}>Add cat</button>
                </div>
            </div>
        );
    }
}

export default AddCat;