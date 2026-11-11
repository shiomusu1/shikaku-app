const bossSettings = {
  1: {
    title: "ボス1",
    subtitle: "ストラテジ系問題",
    enemyImage: "${import.meta.env.BASE_URL}battlestrategy_enemy.png",
    backgroundImage: "${import.meta.env.BASE_URL}background_strategy.jpeg",
    weakBackgroundImage: "${import.meta.env.BASE_URL}background_strategy.jpeg",
  },

  2: {
    title: "ボス2",
    subtitle: "マネジメント系問題",
    enemyImage: "${import.meta.env.BASE_URL}battlemanagement_enemy.png",
    backgroundImage: "${import.meta.env.BASE_URL}background_management.jpeg",
    weakBackgroundImage: "${import.meta.env.BASE_URL}background_management.jpeg",
  },

  3: {
    title: "ボス3",
    subtitle: "テクノロジ系問題",
    enemyImage: "${import.meta.env.BASE_URL}battletechnology_enemy.png",
    backgroundImage: "${import.meta.env.BASE_URL}background_technology.jpeg",
    weakBackgroundImage: "${import.meta.env.BASE_URL}background_technology.jpeg", 
  },
};

export default bossSettings;