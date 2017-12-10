import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import LogoutButton from '../../buttons/LogoutButton/LogoutButton.jsx';
import ContactList from '../../containers/ContactList/ContactList.jsx';
import ContactCard from '../../containers/ContactCard/ContactCard.jsx';
import HeaderBar from '../../containers/HeaderBar/HeaderBar.jsx';
import './_home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: []
		}
  }
  
  myCallback = (dataFromChild) => {
    //[...we will use the dataFromChild here...]
    this.setState({ contact: dataFromChild });
  }
  
  render() {
    return (
      <div className="home">
        <div className="container">
          <HeaderBar className="item" />
        </div>
        <div className="container">
          <ContactList className="item" />
          <ContactCard className="item" />
        </div>
      </div>
    );
  }
}

export default Home;
