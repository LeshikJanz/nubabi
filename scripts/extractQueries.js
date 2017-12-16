#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const childProcess = require('child_process');
const prettier = require('prettier');
const gql = require('graphql-tag');

console.log('Extracing queries...');
childProcess.execSync('persistgraphql platforms/native --js --extension=js');
console.log('Wrote extracted queries to extracted_queries.json');

const queries = Object.keys(require('../extracted_queries.json'));

queries.forEach(queryString => {
  const query = gql`${queryString}`;
  const queryName = query.definitions[0].name.value;
  const queryFilename = path.resolve(
    __dirname,
    `../__generated__/${queryName}.graphql`,
  );
  console.log(`Writing ${queryFilename}`);
  fs.writeFileSync(
    queryFilename,
    prettier.format(queryString, { parser: 'graphql' }),
    'utf-8',
  );
});
