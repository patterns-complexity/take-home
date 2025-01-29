import React, { useState } from 'react';
import appStyles from './App.module.css';
import RunesLegend from './src/Components/RunesLegend/RunesLegend';
import NumberInputForm from './src/Components/Forms/NumberInputForm/NumberInputForm';
import Page from './src/Layout/Page/Page';
import { ToastContainer } from 'react-toastify';
import FinalRune from './src/Components/FinalRune/FinalRune';
function App() {
  const [runes, setRunes] = useState(null);

  return (
    <div className={appStyles.AppContainer}>
      <h1>Rune builder</h1>
      <Page>
        <RunesLegend />
        <NumberInputForm setRunes={setRunes} />
        <FinalRune runes={runes} />
      </Page>
      <ToastContainer />
    </div>
  );
}

export default App;
