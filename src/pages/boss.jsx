import { useNavigate } from "react-router-dom";

import bossBackground from "../assets/boss.png";
import"./Boss.css";

function Boss() {
  const navigate = useNavigate();
  
  const goToBoss1 = () => {
  navigate('/bossbattleorweak', {
    state: { boss: 1 },
  });
};

  const goToBoss2 = () => {
  navigate('/bossbattleorweak', {
    state: { boss: 2 },
  });
};

  const goToBoss3 = () => {
  navigate('/bossbattleorweak', {
    state: { boss: 3 },
  });
};

  return(
        <div className="boss">
        <div className="boss-viewport">
        <div className="boss-map">

       {/* 背景画像 */}
        <img
          className="boss-background"
          src={bossBackground}
          alt="エリア選択画面の背景"
        />
      
        {/* 背景画像の上に置くボタン */}
        <div className="boss-buttons">  

      <h1>ボス選択</h1>

      <button className="boss1-button" onClick={goToBoss1}>
        ①ストラテジ系
      </button>

      <button className="boss2-button" onClick={goToBoss2}>
        ②マネジメント系
      </button>

      <button className="boss3-button" onClick={goToBoss3}>
        ③テクノロジ系
      </button>

      <button className="back-button" onClick={() => navigate("/start")}>
        スタート画面へ戻る
      </button>
      </div>
    </div>
  </div>
</div>
 );
}

export default Boss;