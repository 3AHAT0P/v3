/* eslint-disable no-param-reassign */
import { v4 as uuidv4 } from 'uuid';

import { Script, createContext } from 'node:vm';
import { serialize, deserialize } from 'node:v8';

export const itemRarity = <const>{
  COMMON: 1, RARE: 2, EPIC: 3, LEGENDARY: 4, DIVINE: 5,
};

export type ItemRarity = keyof typeof itemRarity;

// Максимум и минимум включаются
export const getRandomIntInclusive = (min: number, max: number): number => {
  const _min = Math.ceil(min);
  const _max = Math.floor(max);
  return Math.floor(Math.random() * (_max - _min + 1)) + _min;
};

// Максимум и минимум включаются
export const getRandomFloatInclusive = (min: number, max: number, precision: number = 2): number => {
  const precisionModificator = 10 ** precision;
  const range = max - min + 1 / precisionModificator;
  return Math.trunc((Math.random() * range + min) * precisionModificator) / precisionModificator;
};

const multipleMinMaxToModifiers = (
  minmax: { min: number; max: number },
  ...modifiers: number[]
) => modifiers.reduce((result, modifier) => ({
  min: result.min * modifier,
  max: result.max * modifier,
}), minmax);

const renderTemplate = (template: string, context: Record<string, any>) => {
  const safeContext = createContext(deserialize(serialize(context)) as Record<string, any>);
  return new Script(template).runInContext(safeContext);
};

const blueprintMap = <const>{
  'ARMOR:HUMAN:HEAD:HELMET': () => {
    const item = <const>{
      model: {
        itemType: 'ARMOR',
        userType: 'HUMAN',
        slotType: 'HEAD',
        kindType: 'HELMET',
      },
      requirements: {
        attributes: {
          constitution: { min: 4 },
        },
      },
      id: uuidv4(),
      armor: 1,
      name: 'Шлем',
      price: 5,
    };

    return item;
  },
  'ARMOR:RAT:BODY:SKIN': () => {
    const item = <const>{
      model: {
        itemType: 'ARMOR',
        userType: 'RAT',
        slotType: 'BODY',
        kindType: 'SKIN',
      },
      id: uuidv4(),
      armor: 1,
      name: 'Крысинная шкура (броня)',
      price: 0,
    };

    return item;
  },
  'WEAPON:RAT:PAWS:CLAWS': () => {
    const item = <const>{
      model: {
        itemType: 'WEAPON',
        userType: 'RAT',
        slotType: 'PAWS',
        kindType: 'CLAWS',
      },
      id: uuidv4(),
      baseDamage: {
        min: 1,
        max: 2,
      },
      name: 'Крысинная когти (оружие)',
      price: 0,
      abilities: [
        {
          name: 'Удар когтями',
          cost: 1,
          costType: 'STAMINA',
          type: 'DAMAGE',
          formula: 'multipleMinMaxToModifiers(parameters.damage, attributes.strength)',
        },
      ],
    };

    return item;
  },
};

interface ActorAbility {
  name: string;
  cost: number;
  costType: 'STAMINA' | 'MANA';
  type: 'DAMAGE' | 'HEAL';
  formula: Array<string>;
}

interface Actor {
  nominal: {
    attributes: {
      strength: number;
      constitution: number;
      dexterity: number;
      intelligence: number;
      perception: number;
      luck: number;
    }
    parameters: {
      maxHP: number;
      healthPoints: number;
      maxMP: number;
      manaPoints: number;
      maxSP: number;
      staminaPoints: number;
      damage: { min: number; max: number };
      armor: number;
    },
  },
  modifiers: {
    attributes: {
      strength?: number;
      constitution?: number;
      dexterity?: number;
      intelligence?: number;
      perception?: number;
      luck?: number;
    }
    parameters: {
      maxHP?: number;
      healthPoints?: number;
      maxMP?: number;
      manaPoints?: number;
      maxSP?: number;
      staminaPoints?: number;
      damage?: { min: number; max: number };
      armor?: number;
    },
  },
  actual: {
    attributes: {
      strength: number;
      constitution: number;
      dexterity: number;
      intelligence: number;
      perception: number;
      luck: number;
    }
    parameters: {
      maxHP: number;
      healthPoints: number;
      maxMP: number;
      manaPoints: number;
      maxSP: number;
      staminaPoints: number;
      damage: { min: number; max: number };
      armor: number;
    },
  },
}

const useAbility = (ability: ActorAbility, actor: Actor, target: Actor) => {
  if (ability.cost !== 0) {
    if (ability.costType === 'STAMINA') actor.actual.parameters.staminaPoints -= ability.cost;
    else if (ability.costType === 'MANA') actor.actual.parameters.manaPoints -= ability.cost;
  }

  if (ability.type === 'DAMAGE') {
    let value = 1;
    const ops = [];
    for (const part of ability.formula) {
      if (['mul'].includes(part)) ops.push(part);
      else if (part === 'BASE_DAMAGE') value = getRandomFloatInclusive(actor.actual.parameters.damage.min, actor.actual.parameters.damage.max, 1);
      else if (part === 'STRENGTH') {
        const op = ops.pop();
        if (op === 'mul') value *= actor.actual.attributes.strength;
      }
    }
    value -= target.actual.parameters.armor;
    if (value > 0) target.actual.parameters.healthPoints -= value;
  }
};


type BlueprintName = keyof typeof blueprintMap;

const generateItem = <TBlueprintName extends BlueprintName>(
  blueprintName: TBlueprintName,
): ReturnType<typeof blueprintMap[typeof blueprintName]> => {
  const blueprint = blueprintMap[blueprintName];
  return <ReturnType<typeof blueprintMap[typeof blueprintName]>>blueprint();
};

const hydrateItem = (blueprint: Blueprint, data: any) => {

}

const qwe = generateItem('ARMOR:HUMAN:HEAD:HELMET');
const qwe2 = generateItem('ARMOR:RAT:BODY:SKIN');
