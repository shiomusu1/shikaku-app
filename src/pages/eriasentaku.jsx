import { useNavigate } from 'react-router-dom';
import './eriasentaku.css';

function Eriasantaku() {
  const navigate = useNavigate();

  const goToBattle1 = () => {
    navigate('/battle1');
  };

  const goToBattle2 = () => {
    navigate('/battle2');
  };

  const goToBattle3 = () => {
    navigate('/battle3');
  };

    const goToBattle4 = () => {
    navigate('/battle4');
  };

  const goToBattle5 = () => {
    navigate('/battle5');
  };

  const goToBattle6 = () => {
    navigate('/battle6');
  };

  const goToBattle7 = () => {
    navigate('/battle7');
  };

  const goToBattle8 = () => {
    navigate('/battle8');
  };

  const goToBattle9 = () => {
    navigate('/battle9');
  };

  const goToBattle10 = () => {
    navigate('/battle10');
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
    </div>
  );
}

export default Eriasantaku;