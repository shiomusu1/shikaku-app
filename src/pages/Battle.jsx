import { useState } from "react";
import "./Battle.css";

import battle1 from "../data/battle1";

import { useNavigate, useParams } from "react-router-dom";

function Battle() {
  
  const navigate = useNavigate();

  // URLからバトル番号を取得する
  const { battleId } = useParams();

  // それぞれぼバトルの問題データ
  const questionData = {
    1: battle1,

  };

  // いまのバトルの問題を取得する
  const questions = questionData[battleId];

  const [quizList] = useState(() =>
  questions
    ? [...questions].sort(() => Math.random() - 0.5)
    : []
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [wrongQuestions, setWrongQuestions] = useState([]);
  
  const [result, setResult] = useState("");
  
  const [answered, setAnswered] = useState(false);

  const [enemyHp, setEnemyHp] = useState(100);
  
  const [isDefeated, setIsDefeated] = useState(false);
  
  const [battleClear, setBattleClear] = useState(false);
  
  const [battleFailed, setBattleFailed] = useState(false);

  //データ存在しないとき
  if (!questions) {
    return <h1>問題データが見つかりません</h1>;
  }

  const quiz = quizList[currentQuestion];

  // 1問正解したときのダメージ
  const damage = 100 / quizList.length;


   // ==============================
  // 間違えた問題を保存する関数
  // ==============================

function saveWrongQuestion(question) {

  // バトルごとの保存場所
  const storageKey =
    `wrongQuestions_battle_${battleId}`;


  // localStorageに保存されている苦手問題を取得
  const savedQuestions =
    JSON.parse(localStorage.getItem(storageKey)) || [];


  // localStorageに同じ問題があるか確認
  const alreadySaved = savedQuestions.some(
    savedQuestion =>
      savedQuestion.question === question.question
  );


  // 保存されていなければlocalStorageに追加
  if (!alreadySaved) {

    localStorage.setItem(
      storageKey,
      JSON.stringify([
        ...savedQuestions,
        question
      ])
    );

  }


  // 今回のバトルで間違えた問題として追加
  setWrongQuestions(prev => {

    const alreadyWrong = prev.some(
      wrongQuestion =>
        wrongQuestion.question === question.question
    );

    if (alreadyWrong) {
      return prev;
    }

    return [
      ...prev,
      question
    ];

  });

}


  // ==============================
  // 問題に答えたとき
  // ==============================

  function answer(index) {
    //回答済みなにもしない
    if (answered) return;

    setAnswered(true);

    //正解
    if (index === quiz.answer) {
      setResult("正解！");
      setEnemyHp(prev => Math.max(prev - damage, 0));
    } 

    //不正解
    else {
      setResult("不正解！");
      // 間違えた問題を保存
      saveWrongQuestion(quiz);
    }
  }

  // ==============================
  // 次の問題へ
  // ==============================

  function nextQuestion() {
    if (currentQuestion < quizList.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setAnswered(false);
      setResult("");
      return;
    }

    // ==============================
    // 全問終了
    // ==============================

    // localStorageから最新の間違えた問題を取得
   if (wrongQuestions.length === 0) {
      setIsDefeated(true);
      setTimeout(() => {
        setBattleClear(true);
      }, 800);
    } 
      //間違えた問題ある
    else {
      setTimeout(() => {
        setBattleFailed(true);
      }, 500);
    }
  }

  return (
    <div className="game">
      <h1 className="title">エリア1</h1>

      <img
        src="/image/zakokyara.jpg"
        alt="敵"
        className={`enemy-img ${isDefeated ? "defeated" : ""}`}
      />

      <div className="enemy-name">{quiz.title}</div>

      <div className="hp-bar">

      <div className="hp-fill" 
           style={{ width: `${enemyHp}%` }} 
        />
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

      {!battleClear && !battleFailed && (
        <>
        <button onClick={nextQuestion}>
          {currentQuestion === quizList.length - 1 
          ? "結果を見る" 
          : "次の問題"}
        </button>

        <button onClick={() => navigate("/start")}>
           スタート画面へ戻る
        </button>
       </>
      )}

      {battleClear && (
        <div className="clear-screen">
          <h1>
             CLEAR!!!!!!!!!
          </h1>

          <h2>
            敵を倒した！！
          </h2>

          <p>
            全問正解おめでとう♪
            <br/>

            これで君も
            企業活動・経営マスター！！
          </p>

          <button onClick={() => navigate("/eriasentaku")}>
            エリア選択へ戻る
          </button>
        </div>
      )}

      {battleFailed && (
        <div className="clear-screen">
          <h1 className="game-over-title">
            GAME OVER
          </h1>

          <h2>
            今回は敵を倒せなかった…
          </h2>

          <p>
            間違えた問題：{wrongQuestions.length}問
          </p>

         <p>
           苦手問題を復習して
           <br />
           再挑戦しよう！
         </p>

         <button   onClick={() =>navigate(`/weak/${battleId}`)}>
           苦手問題に挑戦
         </button>

         <button onClick={() => navigate("/battleorweak")}>
            もう一度
         </button>

         <button onClick={() => navigate("/eriasentaku")}>
           🗺 エリア選択画面へ戻る
         </button>

         <button onClick={() => navigate("/start")}>
            スタート画面へ戻る
         </button>
         
        </div>
        
      )}
    </div>
  );
}

export default Battle;
