import React from 'react';
import runeStyles from './Rune.module.css';
import cln from 'classnames';

type RuneProps = {
  svg: React.ElementType;
  key: number | string;
  value: number;
  flipped?: boolean;
  rotated?: boolean;
  hideValue?: boolean;
};

const Rune = ({ value, svg: SvgComponent, key, flipped, rotated, hideValue }: RuneProps) => {
  if (!SvgComponent) return null;
  const runeContainerClass = cln(
    runeStyles.RuneContainer,
    { [runeStyles.Flipped]: flipped },
    { [runeStyles.Rotated]: rotated },
    { [runeStyles.FlippedAndRotated]: flipped && rotated },
  );

  return (
    <div className={runeContainerClass}>
      <SvgComponent key={key} />
      {!hideValue && <span>{value}</span>}
    </div>
  );
};

export default Rune;
