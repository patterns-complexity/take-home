import React from 'react';
import finalRuneStyles from './FinalRune.module.css';
import RunePicker from './RunePicker';

const FinalRune = ({ runes }) => {
  return (
    <div className={finalRuneStyles.FinalRuneContainer}>
      <h2>Result</h2>
      <div className={finalRuneStyles.ResultContainer}>
        <div className={finalRuneStyles.Result}>
          <RunePicker runes={runes} />
        </div>
      </div>
    </div>
  );
};

export default FinalRune;
