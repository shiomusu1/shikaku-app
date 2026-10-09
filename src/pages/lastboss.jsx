import { useNavigate } from "react-router-dom";
import lastbossBackground from "../assets/lastboss.png";
import"./lastboss.css";

function LastBoss() {
    const navigate = useNavigate();

      return(
        <div className="lastboss">
        <div className="lastboss-viewport">
        <div className="lastboss-map">
      
             {/* 背景画像 */}
              <img
                className="lastboss-background"
                src={lastbossBackground}
                alt="エリア選択画面の背景"
              />
            
              {/* 背景画像の上に置くボタン */}
              <div className="lastboss-buttons"> 
                
      <h1>ラストボス モード選択</h1>
      <button className="lastboss1-button" onClick={() => navigate("/lastbossbattle")}>
        戦闘
      </button>
      <button className="lastboss2-button" onClick={() => navigate("/lastbossweak")}>
        苦手問題
      </button>
      <button className="lastboss-back-button" onClick={() => navigate("/Start")}>
        スタート画面へ戻る
      </button>
      </div>
   </div>
  </div>
</div>
 );
}

export default LastBoss;