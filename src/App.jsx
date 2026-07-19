import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Start from './pages/Start';
import Eriasentaku from './pages/Eriasentaku';
import Battle1 from './pages/Battle1';
import BattleOrWeak from './pages/BattleOrWeak';
import Weak from './pages/Weak';

import Boss from './pages/boss';
import Boss1 from './pages/boss1';
import Boss2 from './pages/boss2';
import Boss3 from './pages/boss3';
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
        <Route path="/battle1" element={<Battle1 />} />
        <Route path="/weak" element={<Weak />} />

        <Route path="/boss" element={<Boss />} />
        <Route path="/boss1" element={<Boss1 />} />
        <Route path="/boss2" element={<Boss2 />} />
        <Route path="/boss3" element={<Boss3 />} />

        <Route path="/lastboss" element={<LastBoss />} />
        <Route path="/lastbossbattle" element={<LastBossBattle />} />
        <Route path="/lastbossweak" element={<LastBossWeak />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;