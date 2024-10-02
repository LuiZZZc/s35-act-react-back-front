import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Header } from './components/ui/Header';
import { DirectorView } from './components/directores/DirectorView';
import { GeneroView } from './components/generos/GeneroView';
import { TipoView } from './components/tipos/TipoView';
import { ProductoraView } from './components/productoras/ProductoraView.js';


import { MediaUpdate } from './components/medias/MediaUpdate.js';
import { MediaCard } from './components/medias/MediaCard.js';
import { MediaView } from './components/medias/MediaView.js';

const App = () => {
  return <Router>
    <Header/>
    <Switch>
        <Route exact path='/directores' component={ DirectorView } />
        <Route exact path='/generos' component={ GeneroView } />
        <Route exact path='/tipos' component={ TipoView } />
        <Route exact path='/productoras' component={ ProductoraView } />

        <Route exact path='/' component={ MediaView } />
        <Route exact path='/medias' component={ MediaCard } />
        <Route path="/media/:mediaId" component={MediaUpdate} />


        <Redirect to='/' />
    </Switch>
  </Router>
}

export {
    App 
}
