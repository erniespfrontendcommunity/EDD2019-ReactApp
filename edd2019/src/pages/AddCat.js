import React from 'react';
import Web3 from 'web3';
import catABI from "../contractsBin/cat.json";
import { Config } from "../config/Config";
import catRpg from '../assets/images/addCat.jpg'

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
            ChaosLevel: undefined
        }
    }
    addCat = async () => {
        // Metamask insert web3 object into window object when the account is unlocked
        var web3 = new Web3(window.web3.currentProvider);
        let contract = new web3.eth.Contract(catABI, Config.CatContractAddress);
        let accounts = await web3.eth.getAccounts();
        debugger;
        await contract.methods.addCat(
            this.state.CatName,
            this.state.CatStealth,
            this.state.CatDexterity,
            this.state.CatIntelligence,
            this.state.CatCuteness,
            this.state.CatEvilness,
            this.state.ChaosLevel)
            .send({ from: accounts[0], value: web3.utils.toWei("0.1", "ether"), gas: 600000 })
    }

    // Todo change this for only one function

    handleNameChange = (event) => {
        this.setState({CatName: event.target.value });
    }

    handleStealthChange = (event) => {
        this.setState({CatStealth: event.target.value });
    }

    handleDexterityChange = (event) => {
        this.setState({CatDexterity: event.target.value });
    }

    handleIntelligenceChange = (event) => {
        this.setState({CatIntelligence: event.target.value });
    }

    handleCutenessChange = (event) => {
        this.setState({CatCuteness: event.target.value });
    }

    handleEvilnessChange = (event) => {
        this.setState({CatEvilness: event.target.value });
    }

    handleChaosLevelChange = (event) => {
        this.setState({ChaosLevel: event.target.value });
    }

    //

    render() {
        return (
            <section className="AddCat">
                <div className="nes-container with-title is-centered">
                    <p className="title titleContainer">Create your cat</p>
                    <div className="addCat-container-content">
                        <div className="nes-container is-rounded">
                            <img src={catRpg} alt="catRpg" />
                        </div>
                        <div className="addCat-form">
                            <form className="catForm">
                                <div className="nes-field margin-botton-10">
                                    <label htmlFor="name_field">Cat Name</label>
                                    <input type="text" id="name_field" className="nes-input" value={this.state.CatName} onChange={this.handleNameChange} />
                                </div>
                                <div className="nes-field margin-botton-10">
                                    <label htmlFor="stealth_field">Cat stealth</label>
                                    <input type="number" id="stealth_field" className="nes-input" value={this.state.CatStealth} onChange={this.handleStealthChange} />
                                </div>
                                <div className="nes-field margin-botton-10">
                                    <label htmlFor="dexterity_field">Cat dexterity</label>
                                    <input type="number" id="dexterity_field" className="nes-input" value={this.state.CatDexterity} onChange={this.handleDexterityChange} />
                                </div>
                                <div className="nes-field margin-botton-10">
                                    <label htmlFor="intelligence_field">Cat intelligence</label>
                                    <input type="number" id="intelligence_field" className="nes-input" value={this.state.CatIntelligence} onChange={this.handleIntelligenceChange} />
                                </div>
                                <div className="nes-field margin-botton-10">
                                    <label htmlFor="cuteness_field">Cat cuteness</label>
                                    <input type="number" id="cuteness_field" className="nes-input" value={this.state.CatCuteness} onChange={this.handleCutenessChange} />
                                </div>
                                <div className="nes-field margin-botton-10">
                                    <label htmlFor="evilness_field">Cat evilness</label>
                                    <input type="number" id="evilness_field" className="nes-input" max="20" value={this.state.CatEvilness} onChange={this.handleEvilnessChange} />
                                </div>
                                <label htmlFor="chaos_level">Chaos Level</label>
                                <div className="nes-select">
                                    <select value={this.state.ChaosLevel} defaultValue="" id="chaos_level" onChange={this.handleChaosLevelChange}>
                                        <option value="" disabled hidden>Choose wisely</option>
                                        <option value="0">Good Boii</option>
                                        <option value="1">Little Devil</option>
                                        <option value="2">Chaos Bringer</option>
                                    </select>
                                </div>
                                <div className="AddCatButton">
                                    <button className="nes-btn is-primary" onClick={this.addCat}>Add cat</button>
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