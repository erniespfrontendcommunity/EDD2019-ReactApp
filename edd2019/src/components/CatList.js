import * as React from 'react';
import Web3 from 'web3';
import catABI from "../contractsBin/cat.json";
import { CatAttr } from '../config/CatInterface.js';
import {Config} from "../config/Config";

class CatList extends React.Component {

    async getCatList() {
        // Metamask insert web3 object into window object when the account is unlocked
        var web3 = new Web3(window.web3.currentProvider);
        let contract = new web3.eth.Contract(catABI, Config.CatContractAddress);
        let accounts = await web3.eth.getAccounts();
        let personalAccount = accounts[0];
        let catOwned = [];
        let numberOfCats = await contract.methods.balanceOf(personalAccount).call();
        for (var i = 0; i < numberOfCats; ++i) {
            let tokenuid = await contract.methods.tokenOfOwnerByIndex(personalAccount, i).call();
            let catAttr = await contract.methods.getCatAttributes(tokenuid).call();
            console.log(catAttr);
            catOwned.push(new CatAttr(catAttr.catName, catAttr.stealth, catAttr.dexterity, catAttr.intelligence, catAttr.cuteness, catAttr.evilness, catAttr.chaosLevel));
        }
        console.log("List of cats");
        console.log(catOwned);
    }

    render() {
        return (
            <div className="CatList">
                <button className="nes-btn is-primary" onClick={this.getCatList}>Get cat list</button>
            </div>
        );
    }
}

export default CatList;