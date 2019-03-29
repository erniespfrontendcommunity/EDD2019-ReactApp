import React from 'react';
import Web3 from 'web3';
import leagueABI from "../contractsBin/league.json";
import { Config } from "../config/Config";

class ClassificationList{
    constructor(address, name, points){
        this.address = address;
        this.name = name;
        this.points = points;
    }
}

class Classification extends React.Component {

    async getClassification() {
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
        console.log(classification);
    }

    render() {
        return (
            <div className="Classification">
                <button
                    className="nes-btn is-success"
                    onClick={this.getClassification}
                >Get classification</button>
            </div>
        );
    }
}

export default Classification;