import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import { Button, Form, Grid, Message, Segment, Icon } from 'semantic-ui-react'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="login-form">
      <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}</style>
      <Grid
        textAlign="center"
        style={{ height: '100%'}}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
        <Form size="large" onSubmit={handleSubmit} name={name}>
          <Segment stacked>
            <Button color='white' href="/auth/github">
              <img src='http://chittagongit.com//images/github-icon-svg/github-icon-svg-14.jpg'
              placeholder='octocat picture should be here' />
            </Button>
          </Segment>
        </Form>
        {error && error.response && <Message> {error.response.data} </Message>}
      </Grid.Column>
    </Grid>
  </div>
  )
}

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}


// <Icon name='github' /> {displayName} with GitHub
