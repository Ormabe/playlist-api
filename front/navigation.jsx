// IMPORT REACT:
import React from 'react';
import {Link} from 'react-router'

// IMPORT CSS:
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

var NavBar = React.createClass({
  render: function () {
    return (
      <div className="container-fluid nav-container" >
        <nav className="navbar navbar-fixed-top">
          <div className="navbar-header">
          <Link className="navbar-brand navImg" to="/">Music DB</Link>
            <button id="juno" type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav">
              <li><Link to="album">Album</Link></li>
              <li><Link to="artist">Artist</Link></li>
              <li><Link to="song">Songs</Link></li>
              <li><Link to="playlist">Playlist</Link></li>
              <li><Link to="createPlaylist">Create Playlist</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
})

export default NavBar