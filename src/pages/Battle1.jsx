import { useState } from 'react'
import './Battle1.css'
import questions from '../data/battle1'

function Battle1() {

  const [quizList] = useState(
    [...questions].sort(() => Math.random() - 0.5)
  )

  const [wrongQuestions, setWrongQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0)

  const quiz = quizList[currentQuestion]

  const [result, setResult] = useState('')

  const [enemyHp, setEnemyHp] = useState(100)

  const [answered, setAnswered] = useState(false)

function answer(num) {

  if (answered) return; // 回答済みなら何もしない

  setAnswered(true);

  if (num === quiz.answer) {
    setResult("正解！");
    setEnemyHp((prevHp) => Math.max(prevHp - 20, 0));
  } else {
    setResult("不正解！");
  }

}

function nextQuestion() {
  setResult('')
  setAnswered(false)

  if (currentQuestion < quizList.length - 1) {
    setCurrentQuestion(currentQuestion + 1)
  }
}

  return (
    <div className="game">
      <h1 className="title">ステージ1</h1>

      <img
        src="/image/zakokyara.jpg"
        className="enemy-img"
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

    </div>
  )
}

export default Battle1