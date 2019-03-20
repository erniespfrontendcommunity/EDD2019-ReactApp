import * as React from 'react';
import Web3 from 'web3';
import * as catABI from "../contractsBin/cat.json";
import { AbiItem } from 'web3-utils/types';


class AddCat extends React.Component {

    private async addCat() {
        // Metamask insert web3 object into window object when the account is unlocked
        var web3 = new Web3(((window as any).web3.currentProvider));  
        const catAddress = "0xe62d3bfaadbc5373fb14e78c91f0405b5838b981";
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