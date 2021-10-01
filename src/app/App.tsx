import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodolistList} from '../features/TodolistsList/TodolistList';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Menu } from '@mui/icons-material';
import LinearProgress from '@mui/material/LinearProgress';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {RequestStatusType} from './app-reducer';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';



function App() {
const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge={'start'} color={'inherit'} arial-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolists
                    </Typography>
                    <Button
                        variant={'outlined'}
                        color={'inherit'}
                    >
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color="secondary" />}
            <Container fixed>
                <TodolistList/>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;
