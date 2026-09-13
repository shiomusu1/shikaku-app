import { useState } from "react";
import "./Battle.css";

import battle1 from "../data/battle1";
import battle2 from "../data/battle2";
import battle3 from "../data/battle3";
import battle4 from "../data/battle4";
import battle5 from "../data/battle5";
import battle6 from "../data/battle6";
import battle7 from "../data/battle7";
import battle8 from "../data/battle8";
import battle9 from "../data/battle9";
import battle10 from "../data/battle10";

import battleSettings from "../data/battleSettings";

import { useNavigate, useParams } from "react-router-dom";

function Battle() {
  
  //画面遷移機能を準備
const navigate = useNavigate();

  // URLからバトル番号を取得する
const { battleId } = useParams();

  // それぞれぼバトルの問題データ
const questionData = {
  1: battle1,
  2: battle2,
  3: battle3,
  4: battle4,
  5: battle5,
  6: battle6,
  7: battle7,
  8: battle8,
  9: battle9,
  10: battle10,
};

//バトル設定を取得
const battle = battleSettings[Number(battleId)];

//問題データを取得
const questions = questionData[Number(battleId)];

//問題をランダムな順番にする
  const [quizList] = useState(() =>
  questions
    ? [...questions].sort(() => Math.random() - 0.5)
    : []
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [wrongQuestions, setWrongQuestions] = useState([]);

  const [hasWrongAnswer, setHasWrongAnswer] = useState(false);
  
  const [result, setResult] = useState("");
  
  const [answered, setAnswered] = useState(false);

  const [enemyHp, setEnemyHp] = useState(100);
  
  const [isDefeated, setIsDefeated] = useState(false);

  const [isHit, setIsHit] = useState(false);
  
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

      // 敵が攻撃を受けた状態にする
      setIsHit(true);
  
      // 0.4秒後に元に戻す
      setTimeout(() => {
        setIsHit(false);
      }, 400);
    }

    //不正解
    else {
      setResult("不正解！");
      setHasWrongAnswer(true);
      // 間違えた問題を保存
      saveWrongQuestion(quiz);
    }
  }

  // ==============================
  // 次の問題へ
  // ==============================

  function nextQuestion() {

      // まだ回答していない場合は何もしない
    if (!answered) return;

    if (currentQuestion < quizList.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setAnswered(false);
      setResult("");
      return;
    }

    // ==============================
    // 全問終了
    // ==============================

    // 全問正解だった場合に、敵を倒してクリア画面を表示する
    if (hasWrongAnswer) {
      // 1問でも間違えていた
      setTimeout(() => {
        setBattleFailed(true);
      }, 500);
    } else {
      //全問正解
      setIsDefeated(true);
      setTimeout(() => {
        setBattleClear(true);
      }, 800);  
    }
  }

  return (
    <div
      className="game"
      style={{
        backgroundImage: `url(${battle.backgroundImage})`,
      }}
    >

    <h1 className="title">{battle.title}</h1>

    <img
      src={battle.enemyImage}
      alt="敵"
      className={`enemy-img 
        ${isDefeated ? "defeated" : ""}
        ${isHit ? "hit" : ""}
      `}
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

        <button onClick={() => window.location.reload()}>
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
