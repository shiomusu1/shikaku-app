import { useNavigate } from "react-router-dom";

function Boss() {
  const navigate = useNavigate();

  return(
      <div>
      <h1>ボス選択</h1>

      <button onClick={() => navigate("/boss1")}>
        ボス1
      </button>

      <button onClick={() => navigate("/boss2")}>
        ボス2
      </button>

      <button onClick={() => navigate("/boss3")}>
        ボス3
      </button>

      <button onClick={() => navigate("/start")}>
        モード選択画面へ戻る
      </button>
    </div>
)}

export default Boss;