import { useNavigate } from "react-router-dom";

function LastBoss() {
    const navigate = useNavigate();

      return(
      <div>
      <h1>ラストボス モード選択</h1>
      <button onClick={() => navigate("/lastbossbattle")}>
        戦闘
      </button>
      <button onClick={() => navigate("/lastbossweak")}>
        苦手問題
      </button>
      <button onClick={() => navigate("/Start")}>
        スタート画面へ戻る
      </button>
    </div>

)}

export default LastBoss;