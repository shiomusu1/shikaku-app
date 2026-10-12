import { useNavigate, useLocation } from "react-router-dom";
import bossbattleorweakBackground from "../assets/battleorweak.png";
import"./bossbattleorweak.css";


function BossBattleOrWeak() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const boss = location.state?.boss;

    const bossName = {
     1: "①ストラテジ系",
     2: "②マネジメント系",
     3: "③テクノロジ系",
    }[boss];

  return (
  <div className="bossbattleorweak">
        <div className="bossbattleorweak-viewport">
        <div className="bossbattleorweak-map">
      
             {/* 背景画像 */}
              <img
                className="bossbattleorweak-background"
                src={bossbattleorweakBackground}
                alt="エリア選択画面の背景"
              />
            
              {/* 背景画像の上に置くボタン */}
              <div className="bossbattleorweak-buttons">

      <h1>ボス{bossName} モード選択</h1>

      <button className="bossbattleorweak1-button" onClick={() => navigate(`/boss/${boss}`)}>
        ▷戦闘
      </button>

      <button className="bossbattleorweak2-button" onClick={() => navigate(`/Bossweak/${boss}`)}>
        ▷苦手問題
      </button>

      <button className="bossbattleorweak-back-button" onClick={() => navigate("/boss")}>
        ▷ボス選択画面へ戻る
      </button>

    </div>
  </div>
  </div>
</div>
  );
}

export default BossBattleOrWeak;