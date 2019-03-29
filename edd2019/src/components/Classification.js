import React from 'react';
import Web3 from 'web3';
import leagueABI from "../contractsBin/league.json";
import { Config } from "../config/Config";
import pixelCat from '../assets/images/pixelcat.png';

class ClassificationList{
    constructor(address, name, points){
        this.address = address;
        this.name = name;
        this.points = points;
    }
}

class Classification extends React.Component {
    getClassification = async () => {
        // Metamask insert web3 object into window object when the account is unlocked
        var web3 = new Web3(window.web3.currentProvider);
        let contract = new web3.eth.Contract(leagueABI, Config.LeagueContractAddress);
        let classification = [];
        let numberOfParticipants = await contract.methods.getTotalParticipants().call();
        for (var i = 0; i < numberOfParticipants; ++i) {
            let participantAddress = await contract.methods.getParticipant(i).call();
            let squadName = await contract.methods.getSquadName(participantAddress).call();
            let points = await contract.methods.points(participantAddress).call();
            classification.push(new ClassificationList(participantAddress, squadName, points));
        }
        classification.sort(function(memberA, memberB){
            return memberB.points - memberA.points;
        });

        this.classificationTable.innerHTML = "";

        classification.forEach((squad, index) => {
            let row = this.classificationTable.insertRow(index);
            let newCellLeft = row.insertCell(0);
            let newCellRight = row.insertCell(1);
            newCellLeft.innerHTML = squad.name;
            newCellRight.innerHTML = squad.points;
        })
    }

    render() {
        return (
            <div className="Classification">
                <div className="nes-container with-title is-centered">
                    <p className="title titleContainer">Cat league results</p>
                    <div className="nes-table-responsive table-container">
                        <table className="nes-table is-bordered is-centered">
                            <thead>
                                <tr>
                                    <th>Squad Name</th>
                                    <th>Squad Points</th>
                                </tr>
                            </thead>
                            <tbody ref={ref => this.classificationTable = ref}></tbody>
                        </table>
                    </div>
                    <div className="componentFooter">
                        <img src={pixelCat} alt="pixelCat" />
                        <button className="nes-btn is-primary" onClick={this.getClassification}>Get classification</button>
                        <img src={pixelCat} alt="pixelCat" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Classification;