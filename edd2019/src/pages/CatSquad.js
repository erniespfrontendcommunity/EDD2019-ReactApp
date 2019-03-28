import React, { Component } from 'react';
import Web3 from 'web3';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { CatAttr } from '../config/CatInterface.js';
import catABI from "../contractsBin/cat.json";
import { Config } from "../config/Config";
import CatCard from '../components/CatCard.js';

const INITAL_STATE = {
  cats: [],
  selected: [],
}

const INITIAL_BACKGROUND_COLORS = {
    FINAL: 'transparent',
    INITIAL: 'lightgrey',
}

const DROP_ZONES = {
    FINAL: 'FINAL',
    INITIAL: 'INITIAL',
}

const ZONES_MAPPED_TO_STATE = {
    [DROP_ZONES.INITIAL]: 'cats',
    [DROP_ZONES.FINAL]: 'selected',
};

class CatSquad extends Component {

    constructor() {
        super();
        this.state = {
            ...INITAL_STATE
        }
    }

    // @TODO inut para el nombre del squad

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
            // console.log(catAttr);
            this.catsToState(new CatAttr(
                catAttr.catName,
                catAttr.stealth,
                catAttr.dexterity,
                catAttr.intelligence,
                catAttr.cuteness,
                catAttr.evilness,
                catAttr.chaosLevel
            ));
        }
    }

    catsToState = (newCat) => {
        this.setState(state => {
            return {
                ...state,
                cats: state.cats.concat(newCat) // creates new array (instead of push)
            }
        })
    }

    reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the cards look a bit nicer
        userSelect: 'none',
        backgroundColor: 'grey,',

        // change opacity if dragging
        opacity: isDragging ? .7 : 1,

        // styles applied by the library options
        ...draggableStyle
    });

    getListStyle = (isDraggingOver, zone) => ({
        background: isDraggingOver ? 'lightblue' : INITIAL_BACKGROUND_COLORS[zone],
    });

    getCurrentList = (id) => this.state[ZONES_MAPPED_TO_STATE[id]];

    onDragEnd = result => {
        const { source, destination } = result;

        // dropped cats outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const cats = this.reorder(
                this.getCurrentList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { cats };

            if (source.droppableId === DROP_ZONES.FINAL) {
                state = { selected: cats };
            }

            this.setState(state);
        } else {
            // Is already full
            if (
                destination.droppableId === DROP_ZONES.FINAL
                && this.state.selected.length === Config.catsPerSquad
            ) {
                return;
            }
            const result = this.move(
                this.getCurrentList(source.droppableId),
                this.getCurrentList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                cats: result[DROP_ZONES.INITIAL],
                selected: result[DROP_ZONES.FINAL]
            });
        }
    };

    render() {
        return (
            <div className="CatSquad flex flex-col">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId={DROP_ZONES.FINAL} direction="horizontal">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                className="CatSquad__dropable CatSquad__dropable--is-table
                                    flex justify-content-center
                                    align-items-center
                                "
                                style={this.getListStyle(snapshot.isDraggingOver)}
                            >
                                {
                                    this.state.selected.length
                                        ? this.state.selected.map((cat, index) => {
                                            return (
                                                <Draggable
                                                    key={index}
                                                    draggableId={'' + index + DROP_ZONES.FINAL}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={this.getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}>
                                                            <CatCard
                                                                catName={cat.namame}
                                                                stealth={cat.stealth}
                                                                dexterity={cat.dexterity}
                                                                intelligence={cat.intelligence}
                                                                cuteness={cat.cuteness}
                                                                evilness={cat.evilness}
                                                                chaosLevel={cat.chaosLevel}
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                                )
                                            })
                                            : null
                                }
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId={DROP_ZONES.INITIAL} direction="horizontal">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                className="CatSquad__dropable CatSquad__dropable--is-deck
                                    flex justify-content-center
                                    align-items-center
                                "
                                style={this.getListStyle(snapshot.isDraggingOver, DROP_ZONES.INITIAL)}
                            >
                                {
                                    this.state.cats.length ?
                                        this.state.cats.map((cat, index) => {
                                            return (
                                                <Draggable
                                                    key={index}
                                                    draggableId={'' + index + DROP_ZONES.INITIAL}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={this.getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}>
                                                            <CatCard
                                                                catName={cat.namame}
                                                                stealth={cat.stealth}
                                                                dexterity={cat.dexterity}
                                                                intelligence={cat.intelligence}
                                                                cuteness={cat.cuteness}
                                                                evilness={cat.evilness}
                                                                chaosLevel={cat.chaosLevel}
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                                )
                                            })
                                            : null
                                }
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        );
    }
}

export default CatSquad;