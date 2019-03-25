pragma solidity >=0.4.22 <0.6.0;
import "./Cat.sol";

contract League{
    
    address private _owner;
        
    Cat catContract;
    
    bool isLeagueFinished;

    struct Squad{
        string name;
        uint cat1;
        uint cat2;
        uint cat3;
    }
    
    mapping(address => Squad) public leagueTeams;
    address[] participants;
    mapping(address => uint) public points;
    
    event MatchStart(
        string squadName1,
        string squadName2
    );
    
    event MatchWin(
        string squadName1,
        string squadName2
        );
        
    constructor(address catContractAddress) public{
        catContract = Cat(catContractAddress);
        _owner = msg.sender;
        isLeagueFinished = false;
    }
    
     modifier onlyOwner() {
        require(msg.sender == _owner, "You need to be the owner of the contract to execute this function");
        _;
}

    function addSquad(string memory name, uint catId1, uint catId2, uint catId3) public {
        bytes memory nameByte = bytes(name);
        require(nameByte.length != 0, "A squad needs a name");
        require(catContract.ownerOf(catId1) == msg.sender, "Owner does not have cat1");
        require(catContract.ownerOf(catId2) == msg.sender, "Owner does not have cat2");
        require(catContract.ownerOf(catId3) == msg.sender, "Owner does not have cat3");        
        Squad memory squad = Squad(name, catId1,catId2,catId3);
        participants.push(msg.sender);
        leagueTeams[msg.sender] = squad;
    }
    
    function getParticipant(uint i) public view returns(address){
        return participants[i];
    }
    
    function getSquadName(address participant) public view returns(string memory){
        return leagueTeams[participant].name;
    }
    
    function getTotalParticipants() public view returns(uint){
        return participants.length;
    }
    
    function playLeague() public onlyOwner{
        require(isLeagueFinished == false, "League is already finished, reset before starting again!");
        address participant;
        address oponent;
        for(uint i = 0; i < participants.length; i++){
            participant = participants[i];
            for(uint j = i + 1; j < participants.length; j++){
                oponent = participants[j];
                address winner = playGame(participant, oponent);
                points[winner] = points[winner] + 1;
                
            }
        }
        isLeagueFinished = true;
    }
    
    function resetLeague() public onlyOwner{
        require(isLeagueFinished == true, "League has not started");
        address participant;
         for(uint i = 0; i < participants.length; i++){
            participant = participants[i];
            delete leagueTeams[participant];
            delete points[participant];
         }
         delete participants;
         isLeagueFinished = false;
    }
    
    function playGame(address participant1, address participant2) private returns (address){
        Squad memory squad1 = leagueTeams[participant1];
        Squad memory squad2 = leagueTeams[participant2];
        emit MatchStart(squad1.name, squad2.name);
        int score = givePresentToYourHuman(squad1.cat1, squad2.cat1);
        score += getFed(squad1.cat2, squad2.cat2);
        score += tryKillHuman(squad1.cat3, squad2.cat3);
        address winner =  score >= 0 ? participant1 : participant2;
        address loser = winner == participant1 ? participant2 : participant1;
        emit MatchWin(leagueTeams[winner].name, leagueTeams[loser].name);
        return winner;
    }
    
    function GetCatAttributesFromCat(uint catId) private view returns(Cat.CatAttributes memory){
        string memory catName;
        int256 stealth;
        int256 dexterity;
        int256 intelligence;
        int256 cuteness;
        int256 evilness;
        Cat.ChaosLevels chaosLevel;
        (catName, stealth, dexterity, intelligence, cuteness, evilness, chaosLevel) = catContract.getCatAttributes(catId);
        Cat.CatAttributes memory attributes = Cat.CatAttributes(
        {
            name: catName,
            stealth: stealth,
            dexterity: dexterity,
            intelligence: intelligence,
            cuteness: cuteness,
            evilness: evilness,
            chaosLevel: chaosLevel
        });
        return attributes;
    }
    
    function givePresentToYourHuman(uint cat1, uint cat2) private view returns (int){
        Cat.CatAttributes memory catAttr1 = GetCatAttributesFromCat(cat1);
        Cat.CatAttributes memory catAttr2 = GetCatAttributesFromCat(cat2);
        int randomNumberCat1 = getRandomNumber(catAttr1);
        int randomNumberCat2 = getRandomNumber(catAttr2);
        int scoreCat1 = getScoreGivePresentToYourHuman(catAttr1, randomNumberCat1, catAttr2.intelligence);
        int scoreCat2 = getScoreGivePresentToYourHuman(catAttr2, randomNumberCat2, catAttr1.intelligence);
        return getResultMatch(scoreCat1, scoreCat2);
    }
    
    function getResultMatch(int scoreCat1, int scoreCat2) private pure returns (int){
        if(scoreCat1 > scoreCat2){
            return 1;
        }else if(scoreCat1 < scoreCat2){
            return -1;
        }else{
            return 0;
        }
    }
    
    // Main attributes: 
    function getFed(uint cat1, uint cat2) private view returns (int){
        Cat.CatAttributes memory catAttr1 = GetCatAttributesFromCat(cat1);
        Cat.CatAttributes memory catAttr2 = GetCatAttributesFromCat(cat2);
        int randomNumberCat1 = getRandomNumber(catAttr1);
        int randomNumberCat2 = getRandomNumber(catAttr2);
        int scoreCat1 = getScoreGetFed(catAttr1, randomNumberCat1, catAttr2.intelligence);
        int scoreCat2 = getScoreGetFed(catAttr2, randomNumberCat2, catAttr1.intelligence);
        return getResultMatch(scoreCat1, scoreCat2);
    }
    
    function tryKillHuman(uint cat1, uint cat2) private view returns (int){
        Cat.CatAttributes memory catAttr1 = GetCatAttributesFromCat(cat1);
        Cat.CatAttributes memory catAttr2 = GetCatAttributesFromCat(cat2);
        int randomNumberCat1 = getRandomNumber(catAttr1);
        int randomNumberCat2 = getRandomNumber(catAttr2);
        int scoreCat1 = getScoreGetFed(catAttr1, randomNumberCat1, catAttr2.intelligence);
        int scoreCat2 = getScoreGetFed(catAttr2, randomNumberCat2, catAttr1.intelligence);
        return getResultMatch(scoreCat1, scoreCat2);
    }
    
    function getScoreGivePresentToYourHuman(Cat.CatAttributes memory catAttr, int randomNumber, int intelligenceEnemyCat) private pure returns(int){
        return catAttr.stealth + catAttr.dexterity + randomNumber - intelligenceEnemyCat;
    }
    
    function getScoreGetFed(Cat.CatAttributes memory catAttr, int randomNumber, int intelligenceEnemyCat) private pure returns(int){
        return catAttr.dexterity + catAttr.cuteness + randomNumber - intelligenceEnemyCat;
    }
    
    function getScoreTryKillHuman(Cat.CatAttributes memory catAttr, int randomNumber, int intelligenceEnemyCat) private pure returns(int){
        return catAttr.intelligence + catAttr.evilness + randomNumber + intelligenceEnemyCat;
    }
    
    function getRandomNumber(Cat.CatAttributes memory catAttr) private view returns (int){
        int randomEncodedNumberCat = int256(keccak256(abi.encodePacked(block.difficulty,block.timestamp, catAttr.name)));
        // Needed because '1' is converted to int, and compiler shows an error due to difference of tipes between true and false values
        int isRandomMultiplier = randomEncodedNumberCat % 2 != 0 ? int(1) : -1; 
        int finalRandom = 0;
        Cat.ChaosLevels chaosLevelCat = catAttr.chaosLevel;
        if(chaosLevelCat == Cat.ChaosLevels.GOOD_BOII){
            finalRandom = randomEncodedNumberCat % 10;
        }else if(chaosLevelCat == Cat.ChaosLevels.LITTLE_DEVIL){
            finalRandom = randomEncodedNumberCat % 15 * isRandomMultiplier;
        }else if(chaosLevelCat == Cat.ChaosLevels.CHAOS_BRINGER){
            finalRandom = randomEncodedNumberCat % 20 * isRandomMultiplier;
        }
        return finalRandom;
    }
}