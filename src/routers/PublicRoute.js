import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
        <div>
            <Route {...rest} component={(props) => (
                isAuthenticated ? (
                    <Redirect to="/question/list" />
                ) : (
                    <Component {...props} />
                )
            )} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.user,
})

export default connect(mapStateToProps)(PublicRoute);