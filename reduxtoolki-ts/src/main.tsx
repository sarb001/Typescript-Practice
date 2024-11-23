

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { mainstore } from './store/mainstore.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store = {mainstore}>
    <App />
  </Provider>
)
