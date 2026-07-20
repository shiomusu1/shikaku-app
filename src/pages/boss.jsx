import { useNavigate } from "react-router-dom";

function Boss() {
  const navigate = useNavigate();

  const goToBoss1 = () => {
  navigate('/bossbattleorweak', {
    state: { boss: 1 },
  });
};

  const goToBoss2 = () => {
  navigate('/bossbattleorweak', {
    state: { boss: 2 },
  });
};

  const goToBoss3 = () => {
  navigate('/bossbattleorweak', {
    state: { boss: 3 },
  });
};

  return(
      <div>
      <h1>ボス選択</h1>

      <button onClick={goToBoss1}>
        ストラテジ系
      </button>

      <button onClick={goToBoss2}>
        マネジメント系
      </button>

      <button onClick={goToBoss3}>
        テクノロジ系
      </button>

      <button onClick={() => navigate("/start")}>
        スタート画面へ戻る
      </button>
    </div>
)}

export default Boss;