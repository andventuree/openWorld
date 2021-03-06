import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import { Image, Container, Button, Form, Grid, Message, Segment, Icon } from 'semantic-ui-react'

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
          <Container textAlign='center'>
            This web application uses Github's API. If you do not log in, you may reach Github's maximum api call limit fairly quickly. To log in, simply click the button below.
          </Container>
          <Container>
            <a href='/auth/github' >
              <Image src='github-icon-svg-14.png' size='medium' centered circular />
            </a>
          </Container>
          <Container textAlign='center'>
            To see this web application in action without logging in, simply navigate to http://open-world-repos.herokuapp.com/home.
          </Container>
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

