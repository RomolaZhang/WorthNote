import React, { Component } from "react";
import "./Job.css";

class Job extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick(this.props.name);
  }

  render() {
    return (
      <span className="Job" onClick={this.onClick}>
        <img className="job-image" src={this.props.src} />
        <div className="job-title">{this.props.name}</div>
      </span>
    );
  }
}

export default Job;
