import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addArtist} from '../../AC';
import './artistform.css';

class ArtistForm extends React.Component {
  static propTypes = {
    addArtist: PropTypes.func
  };

  state = {
    name: '',
    invalidForm: false
  };

  render() {
    const {name} = this.state;
    return (
      <div className="add_artist">
        <form onSubmit = {this.handleSubmit}>
          <p><input
            type = 'text'
            placeholder = 'Write artist name'
            value = {name}
            onChange = {this.handleChange}
            className = {this.getClassName()} /></p>
          <p><button type = "submit">Add artist</button></p>
        </form>
      </div>
    );
  };

  handleChange = ev => {
    this.setState({ name: ev.target.value });
  };

  getClassName = () => {
    if (this.state.invalidForm) 
      return this.invalidValue() ? 'invalid_val' : '';
    return '';
  };

  handleSubmit = ev => {
    ev.preventDefault();
    if (this.invalidValue()) {
      this.setState({ invalidForm: true });
      return;
    };
    const {name} = this.state;
    this.props.addArtist(name.trim());
    this.setState({
      name: '',
      invalidForm: false
    });
  };

  invalidValue = () => {
    let pattern = /[a-zA-Z0-9А-Яа-я]/;
    const str = this.state.name;
    if (pattern.test(str)) return false;
    else return true;
  };

};

export default connect(null, { addArtist })(ArtistForm);