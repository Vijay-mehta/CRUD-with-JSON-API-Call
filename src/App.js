import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/Home';
import Update from './Pages/Update';
import View from './Pages/View';

function App() {
  return (
    <BrowserRouter>
<Routes>
  <Route exact path="/" element={<Home/>}/>

  <Route exact path="/view/:id" element={<View/>}/>
  <Route exact path="/update/:id" element={<Update/>}/>

</Routes>
    </BrowserRouter>
  );
}

export default App;
