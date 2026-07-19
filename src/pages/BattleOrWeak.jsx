import { useNavigate } from "react-router-dom";

function BattleOrWeak() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>モード選択</h1>

      <button onClick={() => navigate("/Battle1")}>
        戦闘
      </button>

      <button onClick={() => navigate("/Weak")}>
        苦手問題
      </button>

      <button onClick={() => navigate("/Eriasentaku")}>
        エリア選択画面へ戻る
      </button>
    </div>
  );
}

export default BattleOrWeak;