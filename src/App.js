import './App.css';
import AppRouter from './Routes/Routes';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';


function App() {
  return (
    <BrowserRouter>
        <AuthProvider>
          <AppRouter/>
        </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
