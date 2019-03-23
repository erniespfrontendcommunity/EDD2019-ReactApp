export const ChaosLevels = {
    GOOD_BOII: 'GOOD_BOII',
    LITTLE_DEVIL: 'LITTLE_DEVIL',
    CHAOS_BRINGER: 'CHAOS_BRINGER'
};

export class CatAttr {
  constructor(name, stealth, dexterity, intelligence, cuteness, evilness, chaosLevel) {
      this.name = name;
      this.stealth = stealth;
      this.dexterity = dexterity;
      this.intelligence = intelligence;
      this.cuteness = cuteness;
      this.evilness = evilness;
      this.chaosLevel = chaosLevel;
  }
}
