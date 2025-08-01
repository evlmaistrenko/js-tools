import{j as e}from"./iframe-MBRTCEad.js";import{useMDXComponents as i}from"./index-CZNnEy6-.js";import{M as r}from"./blocks-C57HehvF.js";function o(t){const n={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"i18next"}),`
`,e.jsx(n.h1,{id:"internationalization",children:"Internationalization"}),`
`,e.jsxs(n.p,{children:["The package exports an instance of ",e.jsx(n.code,{children:"i18next"}),", which can be customized using the full ",e.jsx(n.code,{children:"i18next"})," API. This allows you to configure translations and other internationalization features according to your application's requirements."]}),`
`,e.jsx(n.h2,{id:"typescript",children:"Typescript"}),`
`,e.jsx(n.p,{children:"Types could be customized by creating file i18next.d.ts in your project:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`import "i18next";

import { yourCustomResources } from "./resources";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: (typeof yourCustomResources)["en-US"];
  }
}
`})})]})}function u(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}export{u as default};
