// Battle1.jsx（完成版の骨組み）
// ※ questions の構造は現在のままで利用できます。
import { useState } from "react";
import "./Battle1.css";
import questions from "../data/battle1";
import { useNavigate } from "react-router-dom";

function Battle1() {
  
  const navigate = useNavigate();

  const [quizList] = useState([...questions].sort(() => Math.random() - 0.5));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [result, setResult] = useState("");
  const [answered, setAnswered] = useState(false);

  const [enemyHp, setEnemyHp] = useState(100);
  const [isDefeated, setIsDefeated] = useState(false);
  const [stageClear, setStageClear] = useState(false);
  const [battleFailed, setBattleFailed] = useState(false);

  const quiz = quizList[currentQuestion];
  const damage = 100 / quizList.length;

  function answer(index) {
    if (answered) return;

    setAnswered(true);

    if (index === quiz.answer) {
      setResult("正解！");
      setEnemyHp(prev => Math.max(prev - damage, 0));
    } else {
      setResult("不正解！");
      setWrongQuestions(prev => [...prev, quiz]);
    }
  }

  function nextQuestion() {
    if (currentQuestion < quizList.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setAnswered(false);
      setResult("");
      return;
    }

    // 全問終了
    if (wrongQuestions.length === 0) {
      setIsDefeated(true);
      setTimeout(() => {
        setStageClear(true);
      }, 800);
    } else {
      setTimeout(() => {
        setBattleFailed(true);
      }, 500);
    }
  }

  return (
    <div className="game">
      <h1 className="title">ステージ1</h1>

      <img
        src="/image/zakokyara.jpg"
        alt="敵"
        className={`enemy-img ${isDefeated ? "defeated" : ""}`}
      />

      <div className="enemy-name">{quiz.title}</div>

      <div className="hp-bar">
        <div className="hp-fill" style={{ width: `${enemyHp}%` }} />
      </div>

      <div className="hp-text">
        HP {Math.round(enemyHp)} / 100
      </div>

      <div className="question">
        <p>{quiz.question}</p>

        {quiz.image && (
          <img
            src={quiz.image}
            alt="問題"
            className="question-image"
          />
        )}
      </div>

      <div className="choices">
        {quiz.choices.map((choice, index) => (
          <button
            key={index}
            className="choice-btn"
            disabled={answered}
            onClick={() => answer(index)}
          >
            {choice}
          </button>
        ))}
      </div>

      <h2>{result}</h2>

      {!stageClear && !battleFailed && (
        <button onClick={nextQuestion}>
          {currentQuestion === quizList.length - 1 ? "結果を見る" : "次の問題"}
        </button>
      )}

      {stageClear && (
        <div className="clear-screen">
          <h1>STAGE CLEAR!!!!!!!!!</h1>
          <h2>敵を倒した！！</h2>
          <p>全問正解おめでとう♪<br/>
          これで君も企業活動・経営マスター！！</p>

          <button onClick={() => navigate("/eriasentaku")}>
            エリア選択へ戻る
          </button>
        </div>
      )}

      {battleFailed && (
        <div className="clear-screen">
          <h1>GAME OVER</h1>
          <h2>今回は敵を倒せなかった…</h2>
          <p>❌ 間違えた問題：{wrongQuestions.length}問</p>
          <p>
            苦手問題を復習して
            <br />
            再挑戦しよう！
          </p>

          <button>
            📚 苦手問題に挑戦
          </button>

          <button onClick={() => navigate("/eriasentaku")}>
            🗺 エリア選択へ戻る
          </button>

        </div>
      )}
    </div>
  );
}

export default Battle1;
