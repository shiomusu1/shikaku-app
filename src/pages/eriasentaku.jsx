import { useNavigate } from 'react-router-dom';

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

  return (
    <div>
      <h1>エリア選択</h1>
      <button onClick={goToBattle1}>
        企業活動
      </button>
      <button onClick={goToBattle2}>
        法務
      </button>
      <button onClick={goToBattle3}>
        経営戦略マネジメント
      </button>
      <button onClick={goToBattle4}>
        技術選択マネジメント
      </button>
      <button onClick={goToBattle5}>
        システム戦略
      </button>
    </div>
  );
}

export default Eriasantaku;