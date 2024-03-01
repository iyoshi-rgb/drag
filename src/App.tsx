import React from 'react';
import './App.css';
import Main from './components/Main';


function App() {
  return (
    <div className='home'>
      <h1 style={{marginBottom: '20px'}}>場所決め君</h1>
      <h3> 場所を追加し、Memberをドラッグ&ドロップで移動させると、場所・役割決めを行えます。</h3>
      <Main />
    </div>
  );
}

export default App;
