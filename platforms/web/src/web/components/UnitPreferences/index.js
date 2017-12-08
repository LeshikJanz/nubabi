// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const UnitPreferences = () => {
  return <h1>UnitPreferences</h1>;
};

const mapDispatchToProps = () => ({});

const mapStateToProps = () => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UnitPreferences),
);
