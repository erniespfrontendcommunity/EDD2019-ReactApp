import * as React from 'react';
import Web3 from 'web3';
import catABI from "../contractsBin/cat.json";


class AddCat extends React.Component {

    async addCat() {
        // Metamask insert web3 object into window object when the account is unlocked
        var web3 = new Web3(window.web3.currentProvider);  
        const catAddress = "0x16d8ef9a12f618d426df1bfe7735cd8a74803572";
        let contract = new web3.eth.Contract(catABI, catAddress);
        let accounts = await web3.eth.getAccounts();
        await contract.methods.addCat("catName1", 2, 2, 2, 2, 2, 2).send({ from: accounts[0], value: web3.utils.toWei("0.1", "ether"), gas: 600000 })
    }

    async addSquad() {
        // Metamask insert web3 object into window object when the account is unlocked
        var web3 = new Web3(window.web3.currentProvider);  
        const leagueAddress = "0x3aeb8c7e110d3abf46f4d2a6a947a730e70c8b1e";
        let contract = new web3.eth.Contract(catABI, leagueAddress);
        let accounts = await web3.eth.getAccounts();
        await contract.methods.addCat("squad1", 0, 1, 2).send({ from: accounts[0], gas: 600000 })
    }

    render() {
        return (
            <div className="AddCat">
                <button className="nes-btn is-primary" onClick={this.addCat}>Add cat</button>
            </div>
        );
    }
}

export default AddCat;