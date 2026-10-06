import { useNavigate } from 'react-router-dom';
import areaBackground from "../assets/forest.jpg";
import './Eriasentaku.css';

function Eriasentaku() {
  const navigate = useNavigate();

const goToBattle1 = () => {
  navigate('/battleorweak', {
    state: { area: 1 },
  });
};

const goToBattle2 = () => {
  navigate('/battleorweak', {
    state: { area: 2 },
  });
};

const goToBattle3 = () => {
  navigate('/battleorweak', {
    state: { area: 3 },
  });
};

const goToBattle4 = () => {
  navigate('/battleorweak', {
    state: { area: 4 },
  });
};

const goToBattle5 = () => {
  navigate('/battleorweak', {
    state: { area: 5 },
  });
};

const goToBattle6 = () => {
  navigate('/battleorweak', {
    state: { area: 6 },
  });
};

const goToBattle7 = () => {
  navigate('/battleorweak', {
    state: { area: 7 },
  });
};

const goToBattle8 = () => {
  navigate('/battleorweak', {
    state: { area: 8 },
  });
};

const goToBattle9 = () => {
  navigate('/battleorweak', {
    state: { area: 9 },
  });
};

const goToBattle10 = () => {
  navigate('/battleorweak', {
    state: { area: 10 },
  });
};

  return (
        <div className="eriasentaku">
        <div className="area-viewport">
        <div className="area-map">

      {/* 背景画像 */}
      <img
        className="area-background"
        src={areaBackground}
        alt="エリア選択画面の背景"
      />

      {/* 背景画像の上に置くボタン */}
      <div className="area-buttons">

      <h1>エリア選択</h1>
      <button className="area1-button" onClick={goToBattle1}>
        ①企業活動・経営
      </button>
      <button className="area2-button" onClick={goToBattle2}>
        ②法務・知的財産
      </button>
      <button className="area3-button" onClick={goToBattle3}>
        ③システム戦略
      </button>
      <button className="area4-button" onClick={goToBattle4}>
        ④プロジェクト管理
      </button>
      <button className="area5-button" onClick={goToBattle5}>
        ⑤サービスマネジメント
      </button>
      <button className="area6-button" onClick={goToBattle6}>
        ⑥システム開発
      </button>
      <button className="area7-button" onClick={goToBattle7}>
        ⑦コンピュータ基礎
      </button>
      <button className="area8-button" onClick={goToBattle8}>
        ⑧ネットワーク
      </button>
      <button className="area9-button" onClick={goToBattle9}>
        ⑨データベース
      </button>
      <button className="area10-button" onClick={goToBattle10}>
        ⑩セキュリティ
      </button>
      <button className="back-button" onClick={() => navigate("/start")}>
        スタート画面へ
      </button>
       </div>
    </div>
    </div>
    </div>
  );
}

export default Eriasentaku;