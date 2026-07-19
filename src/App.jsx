import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Start from './pages/Start';
import Eriasentaku from './pages/Eriasentaku';
import Battle from './pages/Battle';
import BattleOrWeak from './pages/BattleOrWeak';
import Weak1 from './pages/Weak1';

import Boss from './pages/Boss';
import BossBattleOrWeak from './pages/BossBattleOrWeak';
import BossBattle1 from './pages/BossBattle1';
import BossWeak1 from './pages/BossWeak1';
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
        <Route path="/battle/:stageId" element={<Battle />} />
        <Route path="/weak1" element={<Weak1 />} />

        <Route path="/boss" element={<Boss />} />
        <Route path="/bossbattleorweak" element={<BossBattleOrWeak />} />
        <Route path="/bossbattle1" element={<BossBattle1 />} />
        <Route path="/bossweak1" element={<BossWeak1 />} />


        <Route path="/lastboss" element={<LastBoss />} />
        <Route path="/lastbossbattle" element={<LastBossBattle />} />
        <Route path="/lastbossweak" element={<LastBossWeak />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;