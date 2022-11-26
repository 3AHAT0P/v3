interface ActorAbility {
  name: string;
  cost: number;
  costType: 'STAMINA' | 'MANA';
  type: 'DAMAGE' | 'HEAL';
  formula: Array<string>;
}

interface ActorAttributes {
  strength: number;
  constitution: number;
  dexterity: number;
  intelligence: number;
  perception: number;
  luck: number;
}

interface ActorParameters {
  maxHP: number;
  healthPoints: number;
  maxMP: number;
  manaPoints: number;
  maxSP: number;
  staminaPoints: number;
  damage: { min: number; max: number };
  armor: number;
}

export interface Actor {
  nominal: {
    attributes: ActorAttributes,
    parameters: ActorParameters,
  },
  modifiers: {
    attributes: Partial<ActorAttributes>,
    parameters: Partial<ActorParameters>,
  },
  actual: {
    attributes: ActorAttributes,
    parameters: ActorParameters,
  },
}

interface AttributesState {
  nominal: ActorAttributes;
  modifiers: ActorAttributes;
  actual: ActorAttributes;
}

interface ParametersState {
  nominal: ActorParameters;
  modifiers: ActorParameters;
  actual: ActorParameters;
}

export abstract class AbstractActor {
  private _attributes: AttributesState = {
    nominal: {
      strength: 1,
      constitution: 1,
      dexterity: 1,
      intelligence: 1,
      perception: 1,
      luck: 1,
    },
    modifiers: {
      strength: 0,
      constitution: 0,
      dexterity: 0,
      intelligence: 0,
      perception: 0,
      luck: 0,
    },
    actual: {
      strength: 1,
      constitution: 1,
      dexterity: 1,
      intelligence: 1,
      perception: 1,
      luck: 1,
    },
  };

  private _parameters: ParametersState = {
    nominal: {
      maxHP: 0,
      healthPoints: 0,
      maxMP: 0,
      manaPoints: 0,
      maxSP: 0,
      staminaPoints: 0,
      damage: { min: 0, max: 0 },
      armor: 0,
    },
    modifiers: {
      maxHP: 0,
      healthPoints: 0,
      maxMP: 0,
      manaPoints: 0,
      maxSP: 0,
      staminaPoints: 0,
      damage: { min: 0, max: 0 },
      armor: 0,
    },
    actual: {
      maxHP: 0,
      healthPoints: 0,
      maxMP: 0,
      manaPoints: 0,
      maxSP: 0,
      staminaPoints: 0,
      damage: { min: 0, max: 0 },
      armor: 0,
    },
  };

  public get attributes(): ActorAttributes { return this._attributes.actual; }

  public get parameters(): ActorParameters { return this._parameters.actual; }

  updateNominalAttributes(attrs: Partial<ActorAttributes>) {
    if (attrs.strength != null) this._attributes.nominal.strength += attrs.strength;
    if (attrs.constitution != null) this._attributes.nominal.constitution += attrs.constitution;
    if (attrs.dexterity != null) this._attributes.nominal.dexterity += attrs.dexterity;
    if (attrs.intelligence != null) this._attributes.nominal.intelligence += attrs.intelligence;
    if (attrs.perception != null) this._attributes.nominal.perception += attrs.perception;
    if (attrs.luck != null) this._attributes.nominal.luck += attrs.luck;
    this.calculateActualAttributes();
  }

  addAttributesModifier(attrs: Partial<ActorAttributes>) {
    if (attrs.strength != null) this._attributes.modifiers.strength += attrs.strength;
    if (attrs.constitution != null) this._attributes.modifiers.constitution += attrs.constitution;
    if (attrs.dexterity != null) this._attributes.modifiers.dexterity += attrs.dexterity;
    if (attrs.intelligence != null) this._attributes.modifiers.intelligence += attrs.intelligence;
    if (attrs.perception != null) this._attributes.modifiers.perception += attrs.perception;
    if (attrs.luck != null) this._attributes.modifiers.luck += attrs.luck;
    this.calculateActualAttributes();
  }

  calculateActualAttributes() {
    const { nominal, modifiers, actual } = this._attributes;
    actual.strength = nominal.strength + modifiers.strength;
    actual.constitution = nominal.constitution + modifiers.constitution;
    actual.dexterity = nominal.dexterity + modifiers.dexterity;
    actual.intelligence = nominal.intelligence + modifiers.intelligence;
    actual.perception = nominal.perception + modifiers.perception;
    actual.luck = nominal.luck + modifiers.luck;
    this.calculateNominalParameters();
  }

  calculateNominalParameters() {
    const { attributes } = this;

    const { nominal } = this._parameters;

    nominal.maxHP = 5 * attributes.constitution;
    if (nominal.healthPoints === -1) nominal.healthPoints = nominal.maxHP;
    nominal.maxMP = 2 * attributes.intelligence;
    if (nominal.manaPoints === -1) nominal.manaPoints = nominal.maxMP;
    nominal.maxSP = 5 * attributes.constitution;
    if (nominal.staminaPoints === -1) nominal.staminaPoints = nominal.maxSP;
    nominal.damage.min = 1;
    nominal.damage.max = 1;
    nominal.armor = 1;

    this.calculateActualParameters();
  }

  addParametersModifier(params: Partial<ActorParameters>) {
    if (params.maxHP != null) this._parameters.modifiers.maxHP += params.maxHP;
    if (params.healthPoints != null) this._parameters.modifiers.healthPoints += params.healthPoints;
    if (params.maxMP != null) this._parameters.modifiers.maxMP += params.maxMP;
    if (params.manaPoints != null) this._parameters.modifiers.manaPoints += params.manaPoints;
    if (params.maxSP != null) this._parameters.modifiers.maxSP += params.maxSP;
    if (params.staminaPoints != null) this._parameters.modifiers.staminaPoints += params.staminaPoints;
    if (params.damage?.min != null) this._parameters.modifiers.damage.min += params.damage.min;
    if (params.damage?.max != null) this._parameters.modifiers.damage.max += params.damage.max;
    if (params.armor != null) this._parameters.modifiers.armor += params.armor;
    this.calculateActualParameters();
  }

  calculateActualParameters() {
    const { nominal, modifiers, actual } = this._parameters;
    actual.maxHP = nominal.maxHP + modifiers.maxHP;
    actual.healthPoints = nominal.healthPoints + modifiers.healthPoints;
    actual.maxMP = nominal.maxMP + modifiers.maxMP;
    actual.manaPoints = nominal.manaPoints + modifiers.manaPoints;
    actual.maxSP = nominal.maxSP + modifiers.maxSP;
    actual.staminaPoints = nominal.staminaPoints + modifiers.staminaPoints;
    actual.damage.min = nominal.damage.min + modifiers.damage.min;
    actual.damage.max = nominal.damage.max + modifiers.damage.max;
    actual.armor = nominal.armor + modifiers.armor;
  }
}
