pragma solidity >=0.4.22 <0.6.0;
import "http://github.com/OpenZeppelin/zeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

contract Cat is ERC721Full{
    string public constant name = "ERNICat";
    string public constant symbol = "ECAT";
    mapping(uint256 => CatAttributes) catAttributesMap;
    
    enum ChaosLevels {GOOD_BOII, LITTLE_DEVIL, CHAOS_BRINGER}

    struct CatAttributes{
        string name;
        int stealth;
        int dexterity;
        int intelligence;
        int cuteness;
        int evilness;
        ChaosLevels chaosLevel;
    }
    
    event AddedCat(string name);

    constructor () public ERC721Full(name, symbol)   
    {
    }

    function getCatAttributes(uint256 catId) public view returns(string memory, int,int,int,int,int,ChaosLevels){
        CatAttributes memory attr = catAttributesMap[catId];        
        return (attr.name, attr.stealth, attr.dexterity, attr.intelligence, attr.cuteness, attr.evilness, attr.chaosLevel);
    }

    function addCat(string memory catName, int stealth, int dexterity, int intelligence, int cuteness, int evilness, ChaosLevels chaosLevel) public payable{
        bytes memory nameByte = bytes(catName);
        require(msg.value == 0.1 ether, "Payment value is incorrect");
        require(nameByte.length != 0, "A cat needs a name");
        require(stealth <= 20, "Stealth is too high");
        require(dexterity <= 20, "Dexterity is too high");
        require(intelligence <= 20, "Intelligence is too high");
        require(cuteness <= 20, "Cuteness is too high");
        require(evilness <= 20, "Evilness is too high");                
        super._mint(msg.sender, totalSupply());        
        CatAttributes memory attributes = CatAttributes(
        {
            name: catName,
            stealth: stealth,
            dexterity: dexterity,
            intelligence: intelligence,
            cuteness: cuteness,
            evilness: evilness,
            chaosLevel: chaosLevel
        });
        catAttributesMap[totalSupply() - 1] = attributes;
        emit AddedCat(name);
    }
}