import { useState } from "react";
import { useNavigate } from "react-router-dom";

import startmap from "../assets/startmap.png";
import"./start.css";

function Start() {
  const navigate = useNavigate();
  const [revealed, setRevealed] = useState(
    sessionStorage.getItem("startCloudSeen") === "true"
  );
  
  const revealCloud = () => {
  setRevealed(true);
  sessionStorage.setItem("startCloudSeen", "true");
};


return (
  <div className="start">
    {/* スワイプできる表示領域 */}
    <div className="map-viewport">
      <div className="map-stage">
        <img src={startmap} alt="スタートマップ" />

        <button
          className="area-button"
          onClick={() => navigate("/eriasentaku")}
        >
          10分野のエリア選択画面
        </button>

        <button
          className="boss-button"
          onClick={() => navigate("/boss")}
        >
          三系統のボス選択画面
        </button>

        <button
          className="lastboss-button"
          onClick={() => navigate("/lastboss")}
        >
          ラストボス選択画面
        </button>

        {/* マップの周囲を囲む雲 */}
        <div className="cloud-frame">
          <div className="cloud-row cloud-top">
            <span className="puff puff-1" />
            <span className="puff puff-2" />
            <span className="puff puff-3" />
            <span className="puff puff-4" />
            <span className="puff puff-5" />
            <span className="puff puff-6" />
            <span className="puff puff-7" />
            <span className="puff puff-8" />
            <span className="puff puff-9" />
            <span className="puff puff-10" />
            <span className="puff puff-11" />
            <span className="puff puff-12" /> 
            <span className="puff puff-13" /> 
            <span className="puff puff-14" />
          </div>

          <div className="cloud-row cloud-bottom">
            <span className="puff puff-1" />
            <span className="puff puff-2" />
            <span className="puff puff-3" />
            <span className="puff puff-4" />
            <span className="puff puff-5" />
            <span className="puff puff-6" />
            <span className="puff puff-7" />
            <span className="puff puff-8" />
            <span className="puff puff-9" />
            <span className="puff puff-10" />
            <span className="puff puff-11" />
            <span className="puff puff-12" />  
            <span className="puff puff-13" />
            <span className="puff puff-14" />
          </div>

          <div className="cloud-row cloud-left">
            <span className="puff puff-1" />
            <span className="puff puff-2" />
            <span className="puff puff-3" />
            <span className="puff puff-4" />
            <span className="puff puff-5" />
            <span className="puff puff-6" />
            <span className="puff puff-7" />
            <span className="puff puff-8" />
          </div>

          <div className="cloud-row cloud-right">
            <span className="puff puff-1" />
            <span className="puff puff-2" />
            <span className="puff puff-3" />
            <span className="puff puff-4" />
            <span className="puff puff-5" />
            <span className="puff puff-6" />
            <span className="puff puff-7" />
            <span className="puff puff-8" />
          </div>
        </div>
      </div>
      </div>
      {/* 最初に画面を覆う雲 */}
    <div
      className={`cloud-intro ${revealed ? "revealed" : ""}`}
      onClick={revealCloud}
    >
      {!revealed && (
        <span className="cloud-intro-text">
          ▶ぼうけんをはじめる
        </span>
      )}
    </div>
    </div>
  );      
}
export default Start;