import logo from './logo.svg';
import './App.css';
import RouterConfig from './navigation/RouterConfig';
import 'fontsource-roboto';
import { BrowserRouter } from 'react-router-dom';


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <RouterConfig />
            </BrowserRouter>
        </div>
    );
}

export default App;
