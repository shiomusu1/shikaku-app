import { useNavigate } from "react-router-dom";

function LastBoss() {
    const navigate = useNavigate();

      return(
      <div>
      <h1>ボス選択</h1>
      <button onClick={() => navigate("/start")}>
        モード選択画面へ戻る
      </button>
    </div>

)}

export default LastBoss;