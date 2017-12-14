import React, {Component} from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  customWidth: {
	width: 200,
  },
};

class Dropdown extends Component {
  constructor(props) {
	super(props);
	this.state = {value: 1};
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
	return (
	  <div>
		<DropDownMenu value={this.state.value} onChange={this.handleChange}>
		  <MenuItem value={1} primaryText="Primary" />
		  <MenuItem value={2} primaryText="Secondary" />
		  <MenuItem value={3} primaryText="Work" />
		  <MenuItem value={4} primaryText="School" />
		</DropDownMenu>
	  </div>
	);
  }
}

export default Dropdown;