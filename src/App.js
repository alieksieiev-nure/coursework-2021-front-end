import './App.css';
import RouterConfig from './navigation/RouterConfig';
import { BrowserRouter } from 'react-router-dom';
import 'rsuite/dist/styles/rsuite-default.css';


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
