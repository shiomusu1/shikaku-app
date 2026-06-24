import { useState } from 'react'
import './Battle1.css'
import questions from '../data/battle1'

function Battle1() {

  const [quizList] = useState(
    [...questions].sort(() => Math.random() - 0.5)
  )

  const [currentQuestion, setCurrentQuestion] = useState(0)

  const quiz = quizList[currentQuestion]

  const [result, setResult] = useState('')

  function answer(num) {

    if (num === quiz.answer) {
      setResult("正解！")
    }
    else {
      setResult("不正解！")
    }

  }

  function nextQuestion() {
    setResult('')
 
    if (currentQuestion < quizList.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  return (
    <div className="game">
      <h1>テスト</h1>

      <img
        src="/image/zakokyara.jpg"
        className="enemy-img"
        alt="敵キャラクター"
      />

      <div className="enemy-name">
        {quiz.title}
      </div>

      <div className="question">
        {quiz.question}
      </div>

      <div className="choices">
        {quiz.choices.map((choice, index) => (
    <button
      key={index}
      className="choice-btn"
      onClick={() => answer(index)}
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