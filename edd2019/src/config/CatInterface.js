export const ChaosLevels = {
    GOOD_BOII: 0,
    LITTLE_DEVIL: 1,
    CHAOS_BRINGER: 2
};

export class CatAttr {
  // do not change order of params, please :)
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
