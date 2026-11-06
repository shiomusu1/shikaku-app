
import { useState } from "react";
import "./Help.css";

function Help({ isOpen, onClose }) {
  const [selected, setSelected] = useState("purpose");

  if (!isOpen) return null;

  const helpContents = {
    purpose: {
      title: "ゲームの目的",
      description:
        "このゲームは、ITパスポートの勉強を楽しくするための学習ゲームです。問題に挑戦して、エリアを攻略し、ボスを倒していきましょう！",
    },

    progress: {
      title: "ゲームの進め方",
      description:
        "大きく分けて10分野、3系統、まとめ問題の3ステージあります。自分に合ったステージを選択して、問題に挑戦し、敵を倒しましょう！",
    },

    detail: {
      title: "10分野・3系統・ラストボスとは",
      description:
        "10分野：①企業活動・経営 ②法務・知的財産 ③システム戦略 ④プロジェクト管理 ⑤サービスマネジメント ⑥システム開発 ⑦コンピュータ基礎 ⑧ネットワーク ⑨データベース ⑩セキュリティ\n3系統：①ストラテジ系 ②マネジメント系 ③テクノロジ系\nラストボス：ITパスポート全範囲",
    },

    battle: {
      title: "バトルのルール",
      description:
        "戦闘か苦手問題か選択でき、戦闘を選択すると、問題に正解することで敵にダメージを与えられます。苦手問題を選択すると、間違えた問題に再挑戦することができます。",
    },

    operation: {
      title: "その他の操作方法",
      description:
        "戦闘で獲得したアイテムは、獲得したターンの次のターンで使用することができます。",
    },
  };

  return (
    <div
  className="help-overlay"
  onClick={(e) => {
    e.stopPropagation();
    onClose();
  }}
>
      <div
        className="help-window"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="help-title">
          HELP MENU
        </h2>

        <p className="help-subtitle">
          ～ 冒険のガイド ～
        </p>

        <div className="help-content">

          <div className="help-list">
            <button
              className={selected === "purpose" ? "active" : ""}
              onClick={() => setSelected("purpose")}
            >
              ▶ ゲームの目的
            </button>

            <button
              className={selected === "progress" ? "active" : ""}
              onClick={() => setSelected("progress")}
            >
              ▶ ゲームの進め方
            </button>

            <button
              className={selected === "detail" ? "active" : ""}
              onClick={() => setSelected("detail")}
            >
              ▶ 10分野・3系統・ラストボスとは
            </button>

            <button
              className={selected === "battle" ? "active" : ""}
              onClick={() => setSelected("battle")}
            >
              ▶ バトルのルール
            </button>

            <button
              className={selected === "operation" ? "active" : ""}
              onClick={() => setSelected("operation")}
            >
              ▶ その他の操作方法
            </button>
          </div>

          <div className="help-description">
            <h3>
              {helpContents[selected].title}
            </h3>

            <p>
              {helpContents[selected].description}
            </p>
          </div>

        </div>

        <button
          className="help-bottom-close"
          onClick={onClose}
        >
          とじる
        </button>

      </div>
    </div>
  );
}

export default Help;
