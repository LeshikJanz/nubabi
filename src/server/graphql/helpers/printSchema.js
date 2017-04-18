#!/usr/bin/env babel-node
import fs from 'fs';
import path from 'path';
import { graphql } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';
import { schema } from '../schema';

const writeSchemaFile = async () => {
  const result = await graphql(schema, introspectionQuery);

  if (result.errors) {
    console.error(
      'ERROR introspecting schema',
      JSON.stringify(result.errors, null, 2),
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, '../schema.json'),
      JSON.stringify(result, null, 2),
      'utf-8',
      'w+',
    );
  }
};

writeSchemaFile();
