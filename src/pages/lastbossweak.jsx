import { useState } from "react";
import { useNavigate } from "react-router-dom";
import lastbossSettings from "../data/lastbossSettings";

import "./Battle.css";

function LastBossWeak() {

  const navigate = useNavigate();

  // ラスボスの設定
  const lastboss = lastbossSettings;

  // ラスボスのlocalStorageの保存場所
  const storageKey = "wrongQuestions_lastboss";

  // localStorageから苦手問題を取得
  const savedQuestions =
    JSON.parse(localStorage.getItem(storageKey)) || [];

  const [quizList, setQuizList] =
    useState(savedQuestions);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [result, setResult] =
    useState("");

  const [answered, setAnswered] =
    useState(false);


  // 苦手問題がない場合
  if (quizList.length === 0) {

    return (

      <div className="clear-screen">

        <h1>
          苦手問題
        </h1>

        <h1>
          全問正解！！！！
        </h1>

        <p>
          苦手問題はありません！苦手克服おめでとう♪
          <br />
          ラスボス戦にチャレンジして、敵を倒そう！！
        </p>

        <button
          onClick={() =>
            navigate("/lastboss")
          }
        >
          ラスボスへ戻る
        </button>

      </div>

    );

  }


  const quiz =
    quizList[currentQuestion];


  // ==============================
  // 正解した問題を削除
  // ==============================

  function removeQuestion(question) {

    // 現在の問題を除外
    const newQuizList =
      quizList.filter(
        (_, index) =>
          index !== currentQuestion
      );


    // stateを更新
    setQuizList(newQuizList);


    // localStorageも更新
    localStorage.setItem(
      storageKey,
      JSON.stringify(newQuizList)
    );


    // 問題が残っている場合
    if (newQuizList.length > 0) {

      // currentQuestionが範囲外にならないようにする
      if (
        currentQuestion >= newQuizList.length
      ) {

        setCurrentQuestion(0);

      }

    }

  }


  // ==============================
  // 回答
  // ==============================

  function answer(index) {

    if (answered) return;


    setAnswered(true);


    // 正解
    if (index === quiz.answer) {

      setResult("正解！");

    }


    // 不正解
    else {

      setResult("不正解！");

    }

  }


  // ==============================
  // 次の問題
  // ==============================

  function nextQuestion() {

  // 正解した問題を削除
  if (result === "正解！") {

    const newQuizList =
      quizList.filter(
        (_, index) =>
          index !== currentQuestion
      );

    setQuizList(newQuizList);

    // localStorageも更新
    localStorage.setItem(
      storageKey,
      JSON.stringify(newQuizList)
    );

    // 問題がなくなった場合
    if (newQuizList.length === 0) {

      setResult("");
      setAnswered(false);
      return;

    }

    // 次の問題へ
    if (currentQuestion >= newQuizList.length) {

      setCurrentQuestion(0);

    }

  }

  else {

    // 不正解の場合は問題を削除しない

    if (
      currentQuestion >= quizList.length - 1
    ) {

      setCurrentQuestion(0);

    }

    else {

      setCurrentQuestion(prev =>
        prev + 1
      );

    }

  }

  setResult("");
  setAnswered(false);

}


  return (

    <div
      className="game"
      style={{
        backgroundImage:
          `url(${lastboss.weakBackgroundImage})`,
      }}
    >

      <h1 className="title">
        ラスボス 苦手問題
      </h1>


      <p className="weak-count">

        残り
        {quizList.length}
        問

      </p>


      <div className="question">

        <p>
          {quiz.question}
        </p>


        {quiz.image && (

          <img
            src={quiz.image}
            alt="問題"
            className="question-image"
          />

        )}

      </div>


      <div className="choices">

        {quiz.choices.map(
          (choice, index) => (

            <button
              key={index}
              className="choice-btn"
              disabled={answered}
              onClick={() =>
                answer(index)
              }
            >

              {choice}

            </button>

          )
        )}

      </div>


      <h2>
        {result}
      </h2>


      {answered && (

        <button
          onClick={nextQuestion}
        >

          {quizList.length === 0
            ? "終了"
            : "次の問題"}

        </button>

      )}


      <button
        onClick={() =>
          navigate("/lastboss")
        }
      >

        ラスボスへ戻る

      </button>


    </div>

  );

}

export default LastBossWeak;