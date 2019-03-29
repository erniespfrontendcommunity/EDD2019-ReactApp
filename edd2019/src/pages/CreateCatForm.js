import React from 'react';
import Web3 from 'web3';
import catABI from "../contractsBin/cat.json";
import { Config } from "../config/Config";
import CatAvatar from '../components/CatAvatar';
import RemainingStats from '../components/RemaningStats';

class AddCat extends React.Component {
    constructor() {
        super();
        this.state = {
            CatName: '',
            CatStealth: 0,
            CatDexterity: 0,
            CatIntelligence: 0,
            CatCuteness: 0,
            CatEvilness: 0,
            ChaosLevel: undefined,
        }
    }

    addCat = async () => {
        // Metamask insert web3 object into window object when the account is unlocked
        var web3 = new Web3(window.web3.currentProvider);
        let contract = new web3.eth.Contract(catABI, Config.CatContractAddress);
        let accounts = await web3.eth.getAccounts();

        try {
            await contract.methods.addCat(
                this.state.CatName,
                this.state.CatStealth,
                this.state.CatDexterity,
                this.state.CatIntelligence,
                this.state.CatCuteness,
                this.state.CatEvilness,
                this.state.ChaosLevel
            )
                .send({ from: accounts[0], value: web3.utils.toWei("0.1", "ether"), gas: 600000 })
        } catch (error) {
            console.log(error)
        }
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.dataset.name]: event.target.value,
        }); 
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <section className="AddCat">
                <div className="nes-container with-title is-centered">
                    <p className="title titleContainer">Create your cat</p>
                    <div className="addCat-container-content">
                        <div className="nes-container is-rounded">
                            <CatAvatar
                                height="560px"
                                catName={this.state.CatName}
                                stealth={this.state.CatStealth}
                                dexterity={this.state.CatDexterity}
                                intelligence={this.state.CatIntelligence}
                                cuteness={this.state.CatCuteness}
                                evilness={this.state.CatEvilness}
                                chaosLevel={this.state.ChaosLevel}
                            ></CatAvatar>
                        </div>
                        <div className="addCat-form">
                            <form
                                className="catForm"
                                onSubmit={this.handleSubmit}
                            >
                                <div className="nes-field">
                                    <label htmlFor="name_field">Cat Name</label>
                                    <input
                                        id="name_field"
                                        className="nes-input"
                                        placeholder="Name..."
                                        type="text"
                                        autoComplete="nope"
                                        data-name="CatName"
                                        value={this.state.CatName}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="nes-field">
                                    <label htmlFor="stealth_field">Cat stealth</label>
                                    <input
                                        id="stealth_field"
                                        className="nes-input"
                                        placeholder="0"
                                        type="number"
                                        min="0"
                                        max="20"
                                        data-name="CatStealth"
                                        value={this.state.CatStealth}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="nes-field">
                                    <label htmlFor="dexterity_field">Cat dexterity</label>
                                    <input
                                        id="dexterity_field"
                                        className="nes-input"
                                        placeholder="0"
                                        type="number"
                                        min="0"
                                        max="20"
                                        data-name="CatDexterity"
                                        value={this.state.CatDexterity}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="nes-field">
                                    <label htmlFor="intelligence_field">Cat intelligence</label>
                                    <input
                                        id="intelligence_field"
                                        className="nes-input"
                                        placeholder="0"
                                        type="number"
                                        min="0"
                                        max="20"
                                        data-name="CatIntelligence"
                                        value={this.state.CatIntelligence}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="nes-field">
                                    <label htmlFor="cuteness_field">Cat cuteness</label>
                                    <input
                                        id="cuteness_field"
                                        className="nes-input"
                                        placeholder="0"
                                        type="number"
                                        min="0"
                                        max="20"
                                        data-name="CatCuteness"
                                        value={this.state.CatCuteness}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="nes-field">
                                    <label htmlFor="evilness_field">Cat evilness</label>
                                    <input
                                        id="evilness_field"
                                        className="nes-input"
                                        placeholder="0"
                                        type="number"
                                        min="0"
                                        max="20"
                                        data-name="CatEvilness"
                                        value={this.state.CatEvilness}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <label htmlFor="chaos_level">Chaos Level</label>
                                <div className="nes-select">
                                    <select
                                        id="chaos_level"
                                        value={this.state.ChaosLevel}
                                        data-name="ChaosLevel"
                                        defaultValue=""
                                        onChange={this.handleInputChange}
                                        required
                                    >
                                        <option value="" disabled hidden>Choose wisely</option>
                                        <option value="0">Good Boii</option>
                                        <option value="1">Little Devil</option>
                                        <option value="2">Chaos Bringer</option>
                                    </select>
                                </div>
                                <RemainingStats {...this.state}/>
                                <div className="AddCatButton">
                                    <button className="nes-btn is-primary" onClick={this.addCat}>Create cat</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </section>
        );
    }
}

export default AddCat;