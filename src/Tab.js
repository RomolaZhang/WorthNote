import React, { Component } from "react";
import { Link } from "react-scroll";
import "./Tab.css";

class Tab extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick(this.props.label);
  }

  render() {
    let classes = "chi category";
    if (this.props.chosen === this.props.label) {
      classes += " chosen";
    }
    return (
      <Link
        className={classes}
        onClick={this.onClick}
        activeClass="active"
        to="firstInsideContainer"
        duration={0}
        containerId="articles"
      >
        {this.props.label}
      </Link>
    );
  }
}

export default Tab;
