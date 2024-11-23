
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom' ;
import { MainSection } from './components/MainSection';
import { MainProductsSection } from './components/MainProductsSection';

function App() {

  return (
  <>
      <BrowserRouter>
        <Routes>
           <Route index element = {<MainSection />} />
           <Route path='/products' element = {<MainProductsSection />} >  </Route>
        </Routes>
      </BrowserRouter>
  </>
  )
}

export default App
