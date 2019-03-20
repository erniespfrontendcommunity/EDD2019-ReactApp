import * as React from 'react';
import Web3 from 'web3';
import * as catABI from "../contractsBin/cat.json";
import { AbiItem } from 'web3-utils/types';

const web3 = new Web3("ws://localhost:8545");


class AddCat extends React.Component {

    private async addCat() {
        const catAddress = "0x080cf7a545bddeeb1f3ab898801d5b68dd198408";
        let contract = new web3.eth.Contract(catABI as Array<AbiItem>, catAddress);
        let accounts = await web3.eth.getAccounts();
        await contract.methods.addCat("catName1", 2, 2, 2, 2, 2, 2).send({ from: accounts[0], value: web3.utils.toWei("0.1", "ether"), gas: 600000 })
    }

    public render() {
        return (
            <div className="AddCat">
                <button onClick={this.addCat}>Add cat</button>
            </div>
        );
    }
}

export default AddCat;