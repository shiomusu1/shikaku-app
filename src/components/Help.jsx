
import { useState } from "react";
import "./Help.css";

function Help({ isOpen, onClose }) {
  const [selected, setSelected] = useState("purpose");

  if (!isOpen) return null;

  const helpContents = {
    purpose: {
      title: "ゲームの目的",
      description:
        "このゲームは、ITパスポートの勉強を楽しく進めるための学習ゲームです。問題に正解して敵にダメージを与え、ステージを攻略しながら、ITパスポートの知識を身につけましょう！",
    },

    progress: {
      title: "ゲームの進め方",
      description:
        "大きく分けて「10分野」「3系統」「ラストボス」の3つのステージがあります。自分に合ったステージを選んで問題に挑戦し、敵を倒しましょう！",
    },

    detail: {
      title: "10分野・3系統・ラストボスとは",
      description:
        "10分野：①企業活動・経営 ②法務・知的財産 ③システム戦略 ④プロジェクト管理 ⑤サービスマネジメント ⑥システム開発 ⑦コンピュータ基礎 ⑧ネットワーク ⑨データベース ⑩セキュリティ\n3系統：①ストラテジ系 ②マネジメント系 ③テクノロジ系\nラストボス：ITパスポート全範囲",
    },

    battle: {
      title: "バトルのルール",
      description:
        "それぞれのステージの中で、「戦闘」か「苦手問題」のどちらかを選択できます。\n戦闘：問題に正解すると敵にダメージを与えることができます。全問正解して敵を倒しましょう！\n苦手問題：戦闘で間違えた問題に再挑戦できます。繰り返し解いて、苦手を克服していきましょう！",
    },

    operation: {
      title: "アイテムについて",
      description:
        "戦闘中に5問連続で問題に正解すると、アイテムを1つ獲得できます。アイテムを使用すると、不正解の選択肢を2つ消すことができます。獲得したアイテムは、好きなタイミングで使用することができます。10分野・3系統では1回のバトルにつき1回、ラストボスでは最大3回までアイテムを獲得・使用できます。",
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
