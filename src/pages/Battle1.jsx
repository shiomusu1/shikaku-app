import { useState } from 'react'
import './Battle1.css'

function Battle1() {

  const [result, setResult] = useState('')

  function answer(num) {

    if (num === 1) {
      setResult("正解！")
    }
    else {
      setResult("不正解！")
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
        Lv.1 企業活動
      </div>

      <div className="question">
        経営理念を説明したものはどれか
      </div>

      <div className="choices">

        <button
          className="choice-btn"
          onClick={() => answer(1)}
        >
          企業が活動する際に指針となる基本的な考え方
        </button>

        <button
          className="choice-btn"
          onClick={() => answer(2)}
        >
          人・物・金・情報で分類されるもの
        </button>

        <button
          className="choice-btn"
          onClick={() => answer(3)}
        >
          長期・中期・短期の別に策定されるもの
        </button>

        <button
          className="choice-btn"
          onClick={() => answer(4)}
        >
          社風とも呼ばれるもの
        </button>

      </div>

      <h2>{result}</h2>

    </div>
  )
}

export default Battle1