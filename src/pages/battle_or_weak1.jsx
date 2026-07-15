import { useNavigate } from "react-router-dom";

function BattleOrWeak1() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>モード選択</h1>

      <button onClick={() => navigate("/battle1")}>
        戦闘
      </button>

      <button onClick={() => navigate("/weak1")}>
        苦手問題
      </button>

      <button onClick={() => navigate("/eriasentaku")}>
        エリア選択画面へ戻る
      </button>
    </div>
  );
}

export default BattleOrWeak1;