import { Login } from '../components/pages/Login';
import { memo } from 'react';
import { Route, Switch } from 'react-router-dom';
import { homeRoutes } from '../router/HomeRoutes';
import { Page404 } from '../components/pages/Page404';
import { HeaderLayout } from '../components/templates/HeaderLayout';
import { LoginUserProvider } from '../providers/LoginUserProvider';

export const Router = memo(() => {
    return (
        <Switch>
            <LoginUserProvider>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route
                    path="/home"
                    render={({ match: { url } }) => (
                        <Switch>
                            {homeRoutes.map((route) => (
                                <Route key={route.path} exact={route.exact} path={`${url}${route.path}`}>
                                    <HeaderLayout>{route.children}</HeaderLayout>
                                </Route>
                            ))}
                        </Switch>
                    )}
                />
            </LoginUserProvider>
            <Route path="*">
                <Page404 />
            </Route>
        </Switch>
    );
});
