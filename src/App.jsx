import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Eriasantaku from './pages/eriasentaku';
import Battle1 from './pages/Battle1';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Eriasantaku />} />
        <Route path="/battle1" element={<Battle1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;