import { useNavigate } from "react-router-dom";

function Start() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>スタート画面</h1>

      <button onClick={() => navigate("/eriasentaku")}>
        10分野のエリア選択画面へ
      </button>

      <button onClick={() => navigate("/boss")}>
        三系統のボス選択画面へ
      </button>

      <button onClick={() => navigate("/lastboss")}>
        ラストボス選択画面へ
      </button>
    </div>
  );
}

export default Start;