import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Start from './pages/Start';
import Eriasentaku from './pages/Eriasentaku';
import Battle from './pages/Battle';
import BattleOrWeak from './pages/BattleOrWeak';
import Weak from './pages/Weak';

import Boss from './pages/Boss';
import BossBattleOrWeak from './pages/BossBattleOrWeak';
import BossBattle from './pages/BossBattle';
import BossWeak from './pages/BossWeak';
import LastBoss from './pages/lastboss';
import LastBossBattle from './pages/lastbossbattle';
import LastBossWeak from './pages/lastbossweak';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"element={<Start />}/>
        <Route path="/start" element={<Start />} />

        <Route path="/eriasentaku" element={<Eriasentaku />} />
        <Route path="/battleorweak" element={<BattleOrWeak />} />      
        <Route path="/battle/:battleId" element={<Battle />} />
        <Route path="/weak/:battleId" element={<Weak />} />

        <Route path="/boss" element={<Boss />} />
        <Route path="/bossbattleorweak" element={<BossBattleOrWeak />} />
        <Route path="/boss/:bossId" element={<BossBattle />} />
        <Route path="/bossweak/:bossId" element={<BossWeak />} />


        <Route path="/lastboss" element={<LastBoss />} />
        <Route path="/lastbossbattle" element={<LastBossBattle />} />
        <Route path="/lastbossweak" element={<LastBossWeak />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;