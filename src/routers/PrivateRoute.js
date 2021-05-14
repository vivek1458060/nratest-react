import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
        <div>
            <Route {...rest} component={(props) => (
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/question/list" />
                )
            )} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.user,
})

export default connect(mapStateToProps)(PrivateRoute);