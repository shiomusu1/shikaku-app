import { useState } from "react";
import { useNavigate } from "react-router-dom";
import startmap from "../assets/startmap.png";
import"./start.css";

function Start() {
  const navigate = useNavigate();
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="start">
    {/* 最初に画面を覆う雲 */}    
   <div
     className={`cloud-intro ${revealed ? "revealed" : ""}`}
     onClick={() => setRevealed(true)}
   >
     {!revealed && (
       <span className="cloud-intro-text">
         ▶ぼうけんをはじめる
       </span>
     )}
   </div>


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
    

    <div className="cloud-frame">
   {/* 上の雲 */}
    <div className="cloud-row cloud-top">
    <span className="puff puff-1" />
    <span className="puff puff-2" />
    <span className="puff puff-3" />
    <span className="puff puff-4" />
    <span className="puff puff-5" />
    <span className="puff puff-6" />
    </div>
  {/* 下の雲 */}
  <div className="cloud-row cloud-bottom">
    <span className="puff puff-1" />
    <span className="puff puff-2" />
    <span className="puff puff-3" />
    <span className="puff puff-4" />
    <span className="puff puff-5" />
    <span className="puff puff-6" />
  </div>

  {/* 左の雲 */}
  <div className="cloud-row cloud-left">
    <span className="puff puff-1" />
    <span className="puff puff-2" />
    <span className="puff puff-3" />
    <span className="puff puff-4" />
    <span className="puff puff-5" />
  </div>

  {/* 右の雲 */}
  <div className="cloud-row cloud-right">
    <span className="puff puff-1" />
    <span className="puff puff-2" />
    <span className="puff puff-3" />
    <span className="puff puff-4" />
    <span className="puff puff-5" />
  </div>
   </div>
   </div>
  );
}

export default Start;