import { useNavigate, useLocation } from "react-router-dom";

function BattleOrWeak() {
  const navigate = useNavigate();
  const location = useLocation();

  const area = location.state?.area;

  return (
    <div>
      <h1>モード選択（エリア{area}）</h1>

      <button onClick={() => navigate(`/Battle${area}`)}>
        戦闘
      </button>

      <button onClick={() => navigate(`/Weak${area}`)}>
        苦手問題
      </button>

      <button onClick={() => navigate("/Eriasentaku")}>
        エリア選択画面へ戻る
      </button>
    </div>
  );
}

export default BattleOrWeak;