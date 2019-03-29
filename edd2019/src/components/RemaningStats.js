import React from 'react';

function RemainingStats (props) {
    const getRemainingStats = () => {
        debugger;
        let statsFromForm = Number(props.CatStealth) + Number(props.CatDexterity) + Number(props.CatIntelligence)
            + Number(props.CatCuteness) + Number(props.CatEvilness);

        return 40 - statsFromForm;
    }

    return (
        <p>Remaining Stats: {getRemainingStats()}</p>
    )
}

export default RemainingStats;