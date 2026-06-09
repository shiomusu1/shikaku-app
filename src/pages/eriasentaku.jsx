import { useState } from 'react';
import './eriasentaku.css';

function eriasentaku() {

  const goToNextPage = () => {
    window.location.href = '/Battle1.jsx';
  }

  const goToNextPage1 = () => {
    window.location.href = '';
  }

  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>エリア選択画面</h1>
      <p><button className="button" onClick={goToNextPage}>企業活動</button></p>
      <p><button className="button" onClick={goToNextPage1}>法務</button></p> 
      <p><button className="button">経営戦略マネジメント</button></p>
      <p><button className="button">技術選択マネジメント</button></p>
      <p><button className="button">システム戦略</button></p>
    </div>
  );    
}

export default eriasentaku;