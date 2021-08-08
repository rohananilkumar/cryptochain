import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Blocks from './components/Blocks';
import ConductTransaction from './components/ConductTransaction';
import TransactionPool from './components/TransactionPool';

render(
    <React.StrictMode>
        <BrowserRouter>

            <Switch>
                <Route path='/blocks'>
                    <Blocks/>
                </Route>

                <Route path='/transact'>
                    <ConductTransaction/>
                </Route>

                <Route path='/transaction-pool'>
                    <TransactionPool/>
                </Route>

                <Route path='/' exact>
                    <App/>
                </Route>
                
            </Switch>

        </BrowserRouter>


    </React.StrictMode>, 
    document.getElementById('root')
);
