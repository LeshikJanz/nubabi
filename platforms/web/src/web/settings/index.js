// import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Settings from './components/Settings';

const mapDispatchToProps = () => ({});

const mapStateToProps = () => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Settings),
);
