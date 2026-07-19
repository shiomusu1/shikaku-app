import { useNavigate } from 'react-router-dom';
import './Eriasentaku.css';

function Eriasentaku() {
  const navigate = useNavigate();

const goToBattle1 = () => {
  navigate('/BattleOrWeak', {
    state: { area: 1 },
  });
};

const goToBattle2 = () => {
  navigate('/BattleOrWeak', {
    state: { area: 2 },
  });
};

const goToBattle3 = () => {
  navigate('/BattleOrWeak', {
    state: { area: 3 },
  });
};

const goToBattle4 = () => {
  navigate('/BattleOrWeak', {
    state: { area: 4 },
  });
};

const goToBattle5 = () => {
  navigate('/BattleOrWeak', {
    state: { area: 5 },
  });
};

const goToBattle6 = () => {
  navigate('/BattleOrWeak', {
    state: { area: 6 },
  });
};

const goToBattle7 = () => {
  navigate('/BattleOrWeak', {
    state: { area: 7 },
  });
};

const goToBattle8 = () => {
  navigate('/BattleOrWeak', {
    state: { area: 8 },
  });
};

const goToBattle9 = () => {
  navigate('/BattleOrWeak', {
    state: { area: 9 },
  });
};

const goToBattle10 = () => {
  navigate('/BattleOrWeak', {
    state: { area: 10 },
  });
};

  return (
    <div>
      <h1>エリア選択</h1>
      <button onClick={goToBattle1}>
        ①企業活動・経営
      </button>
      <button onClick={goToBattle2}>
        ②法務・知的財産
      </button>
      <button onClick={goToBattle3}>
        ③システム戦略
      </button>
      <button onClick={goToBattle4}>
        ④プロジェクト管理
      </button>
      <button onClick={goToBattle5}>
        ⑤サービスマネジメント
      </button>
      <button onClick={goToBattle6}>
        ⑥システム開発
      </button>
      <button onClick={goToBattle7}>
        ⑦コンピュータ基礎
      </button>
      <button onClick={goToBattle8}>
        ⑧ネットワーク
      </button>
      <button onClick={goToBattle9}>
        ⑨データベース
      </button>
      <button onClick={goToBattle10}>
        ⑩セキュリティ
      </button>
      <button onClick={() => navigate("/Start")}>
        スタート画面へ戻る
      </button>
    </div>
  );
}

export default Eriasentaku;