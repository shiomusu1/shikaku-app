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

  const [damagePopup, setDamagePopup] = useState(null);
  
  const [battleClear, setBattleClear] = useState(false);
  
  const [battleFailed, setBattleFailed] = useState(false);

  // 連続正解数
  const [combo, setCombo] = useState(0);

  // アイテムを持っているか
  const [hasItem, setHasItem] = useState(false);

  // アイテムを使用済みか
  const [itemUsed, setItemUsed] = useState(false);

  // アイテムで消す選択肢の番号
  const [hiddenChoices, setHiddenChoices] = useState([]);

  // アイテム獲得メッセージ
  const [itemMessage, setItemMessage] = useState("");

  
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


  if (index === quiz.answer) {
    //正解
    setResult("正解！");

    // 敵が攻撃を受けた状態にする
    setIsHit(true);

    // ダメージ数字を表示する
    setDamagePopup({
      id: Date.now(),
      value: Math.round(damage),
    });

    // 0.3秒後にHPを減らす
    setTimeout(() => {
      setEnemyHp(prev => Math.max(prev - damage, 0));
    }, 300);

    // 0.4秒後に敵の揺れを止める
    setTimeout(() => {
      setIsHit(false);
    }, 400);

    // 0.8秒後にダメージ数字を消す
    setTimeout(() => {
      setDamagePopup(null);
    }, 800);

    // 連続正解数を増やす
    const newCombo = combo + 1;

    setCombo(newCombo);

      // 5連続正解でアイテム獲得
      if (
        newCombo === 5 && 
        !hasItem &&
        !itemUsed  
      ){
        setHasItem(true);
        setItemMessage("アイテムを獲得した！");
      }

  } 
  else {
    // 不正解のとき
    setResult("不正解！");

    // 連続正解数をリセット
    setCombo(0);

    // メッセージを残す
    setItemMessage("");

    // 間違えた問題を記録
    setHasWrongAnswer(true);

    // 間違えた問題を保存
    saveWrongQuestion(quiz);
  }
}

//アイテムを使用する関数
 function useItem() {
   if (!hasItem || itemUsed || answered) return;

   // 正解以外の選択肢の番号を取得
   const incorrectChoices = quiz.choices
     .map((_, index) => index)
     .filter((index) => index !== quiz.answer);

   // 不正解の選択肢をランダムに並べる
   const shuffledChoices = [...incorrectChoices].sort(
     () => Math.random() - 0.5
   );

   // 不正解の選択肢を2つ消す
   setHiddenChoices(shuffledChoices.slice(0, 2));

   // アイテムを使用済みにする
   setHasItem(false);
   setItemUsed(true);

   setItemMessage("アイテムを使った！選択肢が2つ消えた！");
 }


  // ==============================
  // 次の問題へ
  // ==============================

  function nextQuestion() {

      // まだ回答していない場合は何もしない
    if (!answered) return;

    if (currentQuestion < quizList.length - 1) {
      setCurrentQuestion((prev) => prev + 1);

      setAnswered(false);
      setResult("");

      // 次の問題では選択肢をすべて表示する
      setHiddenChoices([]);

      // アイテムのメッセージを消す
      setItemMessage("");

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

    {/* ダメージ与えたときの数字表示 */}
    {damagePopup && (
      <div
        key={damagePopup.id}
        className="damage-number"
      >
        -{damagePopup.value}
      </div>
    )}

      <div className="enemy-name">{quiz.title}</div>

      <div className="hp-bar">

      <div className="hp-fill" 
           style={{ width: `${enemyHp}%` }} 
        />
      </div>

      <div className="hp-text">
        HP {Math.round(enemyHp)} / 100
      </div>

      {/* 連続正解 */}
      <p className="combo-text">
        {combo} COMBO!! 
      </p>

      {/* 問題表示 */}
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

      {/* アイテム獲得メッセージ */}
      {itemMessage && (
        <p className="item-message">
          {itemMessage}
        </p>
      )}

      {/* アイテムボタン */}
      {hasItem && !itemUsed && (
        <button
          className="item-btn"
          onClick={useItem}
          disabled={answered}
        >
          アイテムを使う
        </button>
      )}
      
      {/* 選択肢 */}
      <div className="choices">

        {quiz.choices.map((choice, index) => {

          // アイテムで消された選択肢は表示しない
          if (hiddenChoices.includes(index)) {
            return null;
          }

          return (
            <button
              key={index}
              className="choice-btn"
              disabled={answered}
              onClick={() => answer(index)}
            >
              {choice}
            </button>
          );
        })}

      </div>

      <h2>{result}</h2>

      {/* 次の問題・戻るボタン */}
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

      {/* クリア画面 */}
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

            これで
            {battle.title}マスター！！
          </p>

          <button onClick={() => navigate("/eriasentaku")}>
            エリア選択へ戻る
          </button>
        </div>
      )}

      {/* ゲームオーバー画面 */}
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
