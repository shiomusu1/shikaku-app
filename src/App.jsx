import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Start from './pages/start';
import Eriasentaku from './pages/eriasentaku';
import Battle1 from './pages/Battle1';
import BattleOrWeak1 from './pages/battle_or_weak1';
import Weak1 from './pages/weak1';

import Boss from './pages/boss';
import Boss1 from './pages/boss1';
import Boss2 from './pages/boss2';
import Boss3 from './pages/boss3';
import LastBoss from './pages/lastboss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"element={<Start />}/>
        <Route path="/start" element={<Start />} />

        <Route path="/eriasentaku" element={<Eriasentaku />} />
        <Route path="/battle_or_weak1" element={<BattleOrWeak1 />} />      
        <Route path="/battle1" element={<Battle1 />} />
        <Route path="/weak1" element={<Weak1 />} />

        <Route path="/boss" element={<Boss />} />
        <Route path="/boss1" element={<Boss1 />} />
        <Route path="/boss2" element={<Boss2 />} />
        <Route path="/boss3" element={<Boss3 />} />

        <Route path="/lastboss" element={<LastBoss />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;