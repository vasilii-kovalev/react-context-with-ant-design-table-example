import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ReactQueryConfigProvider, ReactQueryConfig } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { UsersTableProvider } from './context/users-table';
import { ColorsTableProvider } from './context/colors-table';

const MainPage = React.lazy(() => import('./pages/main'));
const AssociationsPage = React.lazy(() => import('./pages/associations'));

const queryConfig: ReactQueryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
  },
};

const App = () => {
  return (
    <>
      <ReactQueryConfigProvider config={queryConfig}>
        <Router basename={process.env.PUBLIC_URL}>
          <React.Suspense fallback={null}>
            <Switch>
              <UsersTableProvider>
                <ColorsTableProvider>
                  <Route exact path="/">
                    <MainPage />
                  </Route>
                  <Route exact path="/associations">
                    <AssociationsPage />
                  </Route>
                </ColorsTableProvider>
              </UsersTableProvider>
            </Switch>
          </React.Suspense>
        </Router>
      </ReactQueryConfigProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export { App };
