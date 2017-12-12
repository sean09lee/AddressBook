import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import DefaultAvatar from '../../../assets/default_avatar.jpg';

class ContactCard extends Component {
  constructor(props) {
    super(props);
    var newContact = {
      ContactFirstName: 'test',
      ContactLastName: 'last'
    };
    this.state = {
      expanded: false,
      contact: newContact
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      contact: nextProps
    });
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };

  render() {
    return (
      <Card>
        <CardHeader
          title={this.state.contact.ContactFirstName}
          subtitle="Subtitle"
          avatar={DefaultAvatar}
          actAsExpander={false}
          showExpandableButton={false}
        />
        <CardTitle title="Title" subtitle="Card subtitle" />
        <CardText >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => { 
  return state.items;
}

export default connect(mapStateToProps)(ContactCard);