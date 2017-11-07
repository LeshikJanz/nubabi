import firebaseConnector from '../firebaseConnector';

const firebase = firebaseConnector(jest.fn());

describe('firebaseConnector', () => {
  describe('deleteMemory', () => {
    it('deletes a memory and removes it from the baby', () => {
      const task = firebase.deleteMemory('1'); /*?*/

      expect(task.reads).toMatchSnapshot();
      expect(task.updates).toMatchSnapshot();
    });
  });
});
