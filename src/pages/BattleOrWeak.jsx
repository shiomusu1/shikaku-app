import { useNavigate, useLocation } from "react-router-dom";
import battleorweakBackground from "../assets/battleorweak.png";
import"./battleorweak.css";


function BattleOrWeak() {
  const navigate = useNavigate();
  const location = useLocation();

  const area = location.state?.area;

  const areaName = {
    1: "①企業活動・経営",
    2: "②法務・知的財産",
    3: "③システム戦略",
    4: "④プロジェクト管理",
    5: "⑤サービスマネジメント",
    6: "⑥システム開発",
    7: "⑦コンピュータ基礎",
    8: "⑧ネットワーク",
    9: "⑨データベース",
    10: "⑩セキュリティ",    
  }[area];

      return(
        <div className="battleorweak">
        <div className="battleorweak-viewport">
        <div className="battleorweak-map">
      
             {/* 背景画像 */}
              <img
                className="battleorweak-background"
                src={battleorweakBackground}
                alt="エリア選択画面の背景"
              />
            
              {/* 背景画像の上に置くボタン */}
              <div className="battleorweak-buttons">
      <h1> エリア{areaName} モード選択</h1>

      <button className="battleorweak1-button" onClick={() => navigate(`/battle/${area}`)}>
        戦闘
      </button>

      <button className="battleorweak2-button" onClick={() => navigate(`/weak/${area}`)}>
        苦手問題
      </button>

      <button className="battleorweak-back-button" onClick={() => navigate("/eriasentaku")}>
        エリア選択画面へ戻る
      </button>
    </div>
    </div>
    </div>
    </div>
  );
}

export default BattleOrWeak;