import React, { Component } from "react";
import "./Button.css";

class Button extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick(this.props.label);
  }

  render() {
    return (
      <span className="cont chi" onClick={this.onClick}>
        {this.props.name}
      </span>
    );
  }
}

export default Button;
