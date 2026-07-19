import { useState } from 'react'
import './Battle1.css'
import questions from '../data/battle1'
import { useNavigate } from "react-router-dom";

function Battle1() {

  const [quizList] = useState(
    [...questions].sort(() => Math.random() - 0.5)
  )

  const [wrongQuestions, setWrongQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0)

  const quiz = quizList[currentQuestion]

  const damage = 100 / quizList.length;

  const [result, setResult] = useState('')

  const [enemyHp, setEnemyHp] = useState(100)

  const [answered, setAnswered] = useState(false)

  const [isDefeated, setIsDefeated] = useState(false)

  const [stageClear, setStageClear] = useState(false)

  const [battleFailed, setBattleFailed] = useState(false)

  const navigate = useNavigate();

function answer(num) {

  if (answered) return;

  setAnswered(true);

  if (num === quiz.answer) {
    setResult("正解！");
    setEnemyHp((prevHp) => {
       const newHp = Math.max(prevHp - damage, 0);

       if (newHp === 0) {
         setIsDefeated(true);

         setTimeout(() => {
            setStageClear(true);
         }, 1000); // 敵が消えるアニメーションが終わってから表示
       }

       return newHp;
     });
  } else {
    setResult("不正解！");

    setWrongQuestions((prev) => [...prev, quiz]);
  }

}

function nextQuestion() {
  setResult("");
  setAnswered(false);

  if (currentQuestion < quizList.length - 1) {
    setCurrentQuestion(currentQuestion + 1);
  } else {
    // 全問題終了

    if (wrongQuestions.length > 0) {
      setBattleFailed(true);
    }
  }
}

  return (
    <div className="game">
      <h1 className="title">ステージ1</h1>

      <img
        src="/image/zakokyara.jpg"
        className={`enemy-img ${isDefeated ? "defeated" : ""}`}
        alt="敵キャラクター"
      />

      <div className="enemy-name">
        {quiz.title}
      </div>

      <div className="hp-bar">
        <div
          className="hp-fill"
          style={{ width: `${enemyHp}%` }}
        ></div>
      </div>

      <div className="hp-text">
         HP {Math.round(enemyHp)} / 100
      </div>

      <div className="question">
       <p>{quiz.question}</p>

       {quiz.image && (
         <img
           src={quiz.image}
           alt="問題画像"
           className="question-image"
         />
       )}
     </div>

     <div className="choices">
       {quiz.choices.map((choice, index) => (
        <button
          key={index}
          className="choice-btn"
          onClick={() => answer(index)}
          disabled={answered}
        >
          {choice}
        </button>
      ))}
    </div>

      <h2>{result}</h2>

      <button onClick={nextQuestion}>
       次の問題
      </button>

    {stageClear && (
       <div className="clear-screen">
         <h1> STAGE CLEAR!! </h1>
         <h2>パンパカパーン！！</h2>

        <button onClick={() => navigate("/Eriasentaku")}>
           エリア選択へ戻る
        </button>
        <button onClick={() => navigate("/Start")}>
           スタート画面へ戻る
        </button>

  </div>
)}

     {battleFailed && (
       <div className="clear-screen">
         <h1>⚔ BATTLE RESULT</h1>

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

         <button onClick={() => navigate("/BattleOrWeak")}>
              もう一度
         </button>

         <button onClick={() => navigate("/Eriasentaku")}>
           🗺 エリア選択画面へ戻る
         </button>

         <button onClick={() => navigate("/Start")}>
              スタート画面へ戻る
         </button>
         
       </div>
)}

    </div>
  )
}

export default Battle1