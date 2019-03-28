import React, { Component } from 'react';
import Web3 from 'web3';

import { CatAttr } from '../config/CatInterface.js';
import catABI from "../contractsBin/cat.json";
import { Config } from "../config/Config";
import CatCard from '../components/CatCard.js';

const INITAL_STATE = {
  cats: []
}

class CatSquad extends Component {
    constructor() {
        super();
        this.state = {
            cats: INITAL_STATE.cats
        }
    }

    async componentWillMount() {
        await this.getCatList();
    }

    async getCatList() {
        // Metamask insert web3 object into window object when the account is unlocked
        const web3 = new Web3(window.web3.currentProvider);
        const contract = new web3.eth.Contract(catABI, Config.CatContractAddress);
        const accounts = await web3.eth.getAccounts();
        const personalAccount = accounts[0];
        const numberOfCats = await contract.methods.balanceOf(personalAccount).call();

        for (var i = 0; i < numberOfCats; ++i) {
            let tokenuid = await contract.methods.tokenOfOwnerByIndex(personalAccount, i).call();
            let catAttr = await contract.methods.getCatAttributes(tokenuid).call();
            // as they come (not all at once...)
            this.catsToState(new CatAttr(...Object.values(catAttr)));
        }
    }

    catsToState = (newCat) => {
        this.setState(state => {
            return {
                cats: state.cats.concat(newCat) // creates new array (instead of push)
            }
        })
    }


    render() {
        return (
            <>
                {
                    this.state.cats.map((cat, i) => {
                    return (
                        <CatCard
                            key={i}
                            name={cat.name}
                            stealth={cat.stealth}
                            dexterity={cat.dexterity}
                            intelligence={cat.intelligence}
                            cuteness={cat.cuteness}
                            evilness={cat.evilness}
                            chaosLevel={cat.chaosLevel}
                        />)
                    })
                }
            </>
        );
    }
}

export default CatSquad;