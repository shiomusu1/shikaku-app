import { useNavigate, useLocation } from "react-router-dom";

function BoosBattleOrweak() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const boss = location.state?.boss;

  return (
    <div>
      <h1>ボス{boss} モード選択</h1>

      <button onClick={() => navigate(`/boss/${boss}`)}>
        戦闘
      </button>

      <button onClick={() => navigate(`/Bossweak/${boss}`)}>
        苦手問題
      </button>

      <button onClick={() => navigate("/boss ")}>
        ボス選択画面へ戻る
      </button>

    </div>
  );
}

export default BoosBattleOrweak;