// @flow
import React, { PureComponent } from 'react';
import MemoryForm from './MemoryForm';

export class AddMemory extends PureComponent {
  handleSubmit = () => {
    return new Promise(resolve => setTimeout(resolve, 2000));
  };

  render() {
    return <MemoryForm onSubmit={this.handleSubmit} />;
  }
}

export default AddMemory;
