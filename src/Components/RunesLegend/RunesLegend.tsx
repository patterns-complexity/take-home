import React from 'react';
import RuneMapping from '../../Data/RuneMapping';
import runeStyles from './RunesLegend.module.css';
import { RuneMappingType } from '../../Data/RuneMapping';
import Rune from '../Rune/Rune';

const RunesLegend = () => {
  const runeMapping = RuneMapping();

  const renderRuneRow = (row: Array<RuneMappingType>) => {
    return row.map((RR, index) => (
      <Rune
        key={index}
        svg={RR.SvgComponent}
        flipped={RR.flipped}
        rotated={RR.rotated}
        value={RR.runeValue}
      />
    ));
  };

  const renderRuneRows = () => {
    return Object.values(runeMapping).map((RuneRow: Array<RuneMappingType>) => {
      return <div className={runeStyles.RuneRow}>{renderRuneRow(RuneRow)}</div>;
    });
  };

  return (
    <div>
      <h2>Runes</h2>
      <div className={runeStyles.LegendContainer}>{renderRuneRows()}</div>
    </div>
  );
};

export default RunesLegend;
