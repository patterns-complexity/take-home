import React from 'react';

import Rune1 from './1.svg?react';
import Rune2 from './2.svg?react';
import Rune3 from './3.svg?react';
import Rune4 from './4.svg?react';
import Rune5 from './5.svg?react';
import Rune6 from './6.svg?react';
import Rune7 from './7.svg?react';
import Rune8 from './8.svg?react';
import Rune9 from './9.svg?react';

const RuneSVGArray: Array<React.FunctionComponent<React.SVGProps<SVGElement>>> = [
  Rune1,
  Rune2,
  Rune3,
  Rune4,
  Rune5,
  Rune6,
  Rune7,
  Rune8,
  Rune9,
];

const shouldBeFlippedOrRotated: (value: number) => Record<string, boolean> = (value: number) => {
  const flipped = (value <= 90 && value >= 10) || (value <= 900 && value >= 100);
  const rotated = (value <= 900 && value >= 100) || (value <= 9000 && value >= 1000);
  return { flipped, rotated };
};

const getRuneValue: (index: number, row: number) => number = (index, row) => {
  return Math.pow(10, row) * index;
};

export type RuneMappingType = {
  runeValue: number;
  SvgComponent: React.FunctionComponent<React.SVGProps<SVGElement>>;
  flipped: boolean;
  rotated: boolean;
};

const RuneMapping: () => Record<number, Array<RuneMappingType>> = () => {
  const mapping = {};
  for (let row = 0; row < 4; row++) {
    mapping[row] = RuneSVGArray.map((SvgComponent, index) => {
      const runeValue = getRuneValue(index + 1, row);
      const { flipped, rotated } = shouldBeFlippedOrRotated(runeValue);
      return {
        runeValue,
        SvgComponent,
        flipped,
        rotated,
      };
    });
  }
  return mapping;
};

export default RuneMapping;
