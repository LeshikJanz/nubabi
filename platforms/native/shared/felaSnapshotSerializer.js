// WIP
// prettier-ignore
const felaSnapshotSerializer = {
  test(val) {
    return val && val.felaRules && val.$$typeof === Symbol.for('react.test.json');
  },

  print(val, print) {
    const styles = val.felaRules;
    val.felaRules = false;

    return `style = Object ${JSON.stringify(styles, null, 4)}\n\n${print(val)}`;
  },
};

module.exports = felaSnapshotSerializer;
