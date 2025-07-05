import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import InputField from './Components/InputField.jsx'
import TextAreaField from './Components/TextAreaField.jsx'
import SubmitButton from './Components/SubmitButton.jsx'
import ResumeForm from './ResumeForm.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <App />
   

  </StrictMode>,
)
