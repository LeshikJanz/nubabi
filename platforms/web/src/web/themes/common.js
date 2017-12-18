import { injectGlobal } from 'styled-components';

injectGlobal([
  `
  html {
    width: 100%;
    height: 100%;
  }

  body {
    height: 100%;
  }

  #root {
    height: 100%;
  }

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
  
  input[type=checkbox] {
    display: none;
  
    & + label {
      position: relative;
      height: 21px;
      width: 21px;
      cursor: pointer;
    }
  
    & + label:before {
      content: '';
      display: inline-block;
      width: 17px;
      height: 17px;
      background: transparent;
    }
  
    & {      
      &:checked {
        & + label {
          border: solid 2px #ec4469;
          background: #ec4469;
        }
      
        & + label:before {
           background: #ec4469;
        }
        
        & + label:after {
              content: '';
              position: absolute;
              left: 3px;
              top: 8px;
              background: white;
              width: 2px;
              height: 2px;
              box-shadow: 
                2px 0 0 white,
                4px 0 0 white,
                4px -2px 0 white,
                4px -4px 0 white,
                4px -6px 0 white,
                4px -8px 0 white;
              transform: rotate(45deg);
           }
        }
    }
    
    &.rounded {
       &:not(:checked) + label {
        border: solid 2px #c5cdd7;
        border-radius: 5px;
      }    
      
      &:checked + label {
        border-radius: 5px;
      }
    }
    
    &.squared {
      &:not(:checked) + label, &:checked + label, &:checked + label:before {
        border-radius: 50%;
      }
      
      &:checked + label:after {
        left: 3px;
        top: 8px;
      }
    }
  }
`,
]);
