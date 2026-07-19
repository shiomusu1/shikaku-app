import { useNavigate } from "react-router-dom";

function Start() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>スタート画面</h1>

      <button onClick={() => navigate("/Eriasentaku")}>
        10種類のエリアへ
      </button>

      <button onClick={() => navigate("/boss")}>
        三種類のボス戦へ
      </button>

      <button onClick={() => navigate("/lastboss")}>
        ラストボス戦へ
      </button>
    </div>
  );
}

export default Start;