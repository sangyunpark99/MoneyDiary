import {Provider} from 'react-redux';
import store from './redux/store';
import MainPage from '../src/pages/MainPage';
import { BrowserRouter } from 'react-router-dom';
const App = () => {
  return(
      <Provider store={store}>
          <BrowserRouter>
            <MainPage/>
          </BrowserRouter>
      </Provider>
  );
}

export default App;
