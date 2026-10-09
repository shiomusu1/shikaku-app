import { useState } from "react";
import "./Battle.css";

import bossStrategy from "../data/bossStrategy";
import bossManagement from "../data/bossManagement";
import bossTechnology from "../data/bossTechnology";

import bossSettings from "../data/bossSettings";

import { useNavigate, useParams } from "react-router-dom";

function Battle() {
  
  const navigate = useNavigate();

  // URLからバトル番号を取得する
  const { bossId } = useParams();

  // それぞれぼバトルの問題データ
  const questionData = {
    1: bossStrategy,
    2: bossManagement,
    3: bossTechnology,
  };

  // バトル設定を取得
  const boss = bossSettings[Number(bossId)];

  // 問題データを取得
  const questions = questionData[Number(bossId)];

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

  // 撃破時の画面フラッシュ
  const [showFlash, setShowFlash] = useState(false);

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
    `wrongQuestions_boss_${bossId}`;


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
    // 全問正解
    setIsDefeated(true);

    // 画面を白くフラッシュ
    setShowFlash(true);

    // 0.5秒後にフラッシュを消す
    setTimeout(() => {
      setShowFlash(false);
    }, 500);

    // 0.8秒後にクリア画面を表示
    setTimeout(() => {
      setBattleClear(true);
    }, 800);
    }
  }

  return (
    <div
      className="game"
      style={{
        backgroundImage: `url(${boss.backgroundImage})`,
      }}
    >

    <h1 className="title">{boss.title}</h1>

    <img
      src={boss.enemyImage}
      alt="ボス"
      className={`enemy-img 
        ${isDefeated ? "defeated" : ""}
        ${isHit ? "hit" : ""}
        ${enemyHp <= 30 && enemyHp > 0 ? "danger" : ""}
      `}
    />

    {/* ダメージ数字 */}
    {damagePopup && (
      <div
        key={damagePopup.id}
        className="damage-number"
      >
        -{damagePopup.value}
      </div>
    )}

      <div className="enemy-name">{quiz.title}</div>

      <div className={`hp-bar ${enemyHp <= 30 && enemyHp > 0 ? "danger" : ""}`}>

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

      {/* 何問目 */}
      <p className="question-count">
          第{currentQuestion + 1}問 / 全{quizList.length}問
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
        <div className="item-area">

          <button
            className="item-btn"
            onClick={useItem}
            disabled={answered}
          >
            アイテムを使う
          </button>

          {/* アイテム説明ボタン */}
          <button
            className="item-help-btn"
            onClick={() => setShowItemInfo(!showItemInfo)}
          >
            ?
          </button>

          {/* アイテム説明 */}
          {showItemInfo && (
            <div className="item-info">
              <p>アイテムについて</p>
              <p>
                5問連続で正解すると獲得！<br />
                使用すると選択肢が2つ消えます。<br />
                1回のバトルで1度だけ獲得・使用できます。<br />
                好きなタイミングで使用できます。<br />
              </p>
            </div>
          )}

        </div>
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

      <p className={`result ${result === "正解！" ? "correct" : "incorrect"}`}>
       {result}
      </p>

      {/* 不正解だった場合、正解を表示 */}
      {result === "不正解！" && (
        <p className="correct-answer">
          正解：{quiz.choices[quiz.answer]}
        </p>
      )}

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

            これで君も
            {boss.title}マスター！！
          </p>

          <button onClick={() => navigate("/boss")}>
            ボス選択へ戻る
          </button>
        </div>
      )}

      {/* 撃破時の粒子エフェクト */}
      {isDefeated && (
        <div className="particles">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      {/* 撃破時の画面フラッシュ */}
      {showFlash && (
        <div className="battle-flash"></div>
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

         <button   onClick={() =>navigate(`/bossweak/${bossId}`)}>
           苦手問題に挑戦
         </button>

         <button onClick={() => window.location.reload()}>
          もう一度
         </button>

         <button onClick={() => navigate("/boss")}>
           🗺  ボス選択画面へ戻る
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
