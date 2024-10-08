import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './css/style.css'
import './css/emoji.css'
import './css/lightbox.css'
import './css/feather.css'
import './css/bootstrap-datetimepicker.css'
import './css/themify-icons.css'
import './css/video-player.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
