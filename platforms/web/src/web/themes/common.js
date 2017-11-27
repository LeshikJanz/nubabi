import { injectGlobal } from 'styled-components';

injectGlobal([
  `
  a {
    color: #454d57;
    text-decoration: none;
    cursor: pointer;
    
    &:-webkit-any-link {
      text-decoration: none;
    }
    
    &:hover {
      text-decoration: underline;
    }
  }
`,
]);
