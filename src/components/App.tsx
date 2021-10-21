import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { MainPage } from '../pages/MainPage';
import { NotFound404 } from '../pages/NotFound404';
import { UserDetailsPage } from '../pages/UserDetailsPage';
import { TPerson } from '../services/types';

function App() {
  const [response, setResponse] = useState<null | Array<TPerson>>(null);

	useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => {
            return res.ok ? res.json() : res.json().then((error) => Promise.reject(error));
        })
        .then(res => {
            setResponse(res);
        })
        .catch(err => {
            console.log(err);
        })
	}, [])

  const handlePersonDelete = (person: TPerson): void => {
    if (response) {
      const newPersonList = response?.filter((item) => item.id !== person.id);
      setResponse(newPersonList)
    }
  }
	
  return (
    <Router>
			<Switch>
        <Route path="/" exact>
          <MainPage 
            personList={response} 
            handlePersonDelete={handlePersonDelete}
          />
        </Route>
        <Route path="/users/:id">
          <UserDetailsPage />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
