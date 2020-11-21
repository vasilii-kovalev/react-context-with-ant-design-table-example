import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ReactQueryConfigProvider, ReactQueryConfig } from 'react-query';
import { UsersTableProvider } from 'context/users-table';
import { ColorsTableProvider } from 'context/colors-table';

const MainPage = React.lazy(() => import('pages/main'));
const AssociationsPage = React.lazy(() => import('pages/associations'));

const queryConfig: ReactQueryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
  },
};

const App = () => {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router basename="/react-context-with-ant-design-table-example">
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
  );
};

export { App };