import React from 'react';
import RuneMapping, { RuneMappingType } from '../../Data/RuneMapping';
import finalRuneStyles from './FinalRune.module.css';
import Rune from '../Rune/Rune';

type RunePickerType = {
  runes: Array<number>;
};

const RunePicker = ({ runes }: RunePickerType) => {
  if (!runes) return null;

  const runeMapping = RuneMapping();

  const getRuneTableCoordinates = (runeValue) => {
    const stringValue = String(runeValue);
    const splitStringValue = stringValue.split('');
    const row = Number(splitStringValue.length) - 1;
    const column = Number(splitStringValue[0]) - 1;

    const runeRow = runeMapping[row];
    return runeRow[column];
  };

  const pickedRunes = runes
    .filter((runeValue) => runeValue != 0)
    .map((runeValue) => {
      return getRuneTableCoordinates(runeValue);
    });

  const fetchSVGElements: () => NodeListOf<SVGSVGElement> = () => {
    const finalRunesElement = document.getElementById('final-runes');
    const allSVGs = finalRunesElement?.querySelectorAll('svg');
    return allSVGs;
  };

  const fetchPathFromSVG: (svg: SVGSVGElement) => string = (svg) => {
    const clonedSvg = svg.cloneNode(true) as SVGElement;
    const svgPath = clonedSvg.querySelector('*');
    if (svgPath) {
      return new XMLSerializer().serializeToString(svgPath);
    }
  };

  // This is unfinished. I'd have to rewrite the
  // whole process to not use CSS for styling rune transformations
  // and actually modify their paths.
  // Unfortunately that early mnistake cost me the ability
  // to download the final rune.
  const createDownloadBlob = (svgContent) => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'runes.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const onDownload = () => {
    const svgElements = fetchSVGElements();
    const paths = [];
    if (svgElements) {
      svgElements.forEach((svg) => {
        paths.push(svg.innerHTML);
      });
    }

    const joinedPaths = paths.join('');

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg">${joinedPaths}</svg>`;

    console.log(svgContent);

    createDownloadBlob(svgContent);
  };

  const renderPickedRunes = (runes: Array<RuneMappingType>) => {
    return runes.map((pickedRune, index) => {
      return (
        <Rune
          key={index}
          svg={pickedRune?.SvgComponent}
          value={pickedRune?.runeValue}
          flipped={pickedRune?.flipped}
          rotated={pickedRune?.rotated}
          hideValue
        />
      );
    });
  };

  return (
    <a href="#" onClick={onDownload}>
      <div id="final-runes" className={finalRuneStyles.RuneContainer}>
        {renderPickedRunes(pickedRunes)}
      </div>
    </a>
  );
};

export default RunePicker;
