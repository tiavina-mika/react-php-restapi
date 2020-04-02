import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.linkedin.com/in/tiavina-michael-ralainirina/">
              Tiavina Michael Ralainirina
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: 'red'
  },
  loading: {
    marginLeft: 12,
    color: '#fff'
  }
}));

const API_PATH = 'http://localhost/demo/api/index.php';

const Contact = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  
const handleFormSubmit = async e => {
    e.preventDefault();
    try {

        setLoading(true);
        const result = await axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: { name, email }
        })
        console.log('result:  ', result.data);

        if (result && !result.data.sent) setError(result.data.error);

        setData(result.data);
    } catch (error) {
        console.log('error: ', error);
        setError(error.error)
    } finally {
        setLoading(false);
    }
};

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
           { data && data.sent && data.name? `Added successfully, Welcome ${name && name.toUpperCase()}`: 'Contact'}
        </Typography>
        { error && 
            <Box mt={2}>
                <Typography className={classes.error}>Error : {error} </Typography>
            </Box> }
        <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange={e => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign Up { loading && <CircularProgress size={20} className={classes.loading}/> }
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Contact;