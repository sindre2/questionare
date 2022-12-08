import { useState } from 'react';
import { ContextProvider } from './components/ContextProvider';
import { LandingPage } from './pages/LandingPage';
import Provider from './components/ThemeProvider/Provider';

function App() {
  //useState set the default value for the category. 17 is the ID for "Science & Nature".
  const [categoryID, setCategoryID] = useState(17);
  return (
    <div className="App">
      <ContextProvider.Provider value={{categoryID, setCategoryID}}>
        <Provider>
          <LandingPage />
        </Provider>
      </ContextProvider.Provider>
    </div>
  );
}

export default App;
