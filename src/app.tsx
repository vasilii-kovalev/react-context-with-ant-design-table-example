import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ReactQueryConfigProvider, ReactQueryConfig } from 'react-query';
import { UsersTableProvider } from 'context/users-table';

const MainPage = React.lazy(() => import('pages/main'));

const queryConfig: ReactQueryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
  },
};

const App = () => {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router>
        <React.Suspense fallback={null}>
          <Switch>
            <UsersTableProvider>
              <Route path="/">
                <MainPage />
              </Route>
            </UsersTableProvider>
          </Switch>
        </React.Suspense>
      </Router>
    </ReactQueryConfigProvider>
  );
};

export { App };
