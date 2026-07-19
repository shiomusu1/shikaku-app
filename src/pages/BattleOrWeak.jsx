import { useNavigate, useLocation } from "react-router-dom";

function BattleOrWeak() {
  const navigate = useNavigate();
  const location = useLocation();

  const area = location.state?.area;

  return (
    <div>
      <h1> エリア{area} モード選択</h1>

      <button onClick={() => navigate(`/battle${area}`)}>
        戦闘
      </button>

      <button onClick={() => navigate(`/weak${area}`)}>
        苦手問題
      </button>

      <button onClick={() => navigate("/eriasentaku")}>
        エリア選択画面へ戻る
      </button>
    </div>
  );
}

export default BattleOrWeak;