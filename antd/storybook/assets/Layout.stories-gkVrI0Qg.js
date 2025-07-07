import{j as e,C as L}from"./iframe-DrCYgfLS.js";import{L as v,f as W,s as C,p as O,a as R,b as D,c as y,d as k}from"./secondary-sidebar-LhAjb62u.js";import{l as g,P as u}from"./lorem-ipsum-paragraphs-CNK4o1od.js";import{h as b}from"./header-NeeRce-L.js";import"./index-CKxrAZsF.js";import"./index-ruu9K9Xr.js";import"./PieChartOutlined-DfLPCS6x.js";import"./presets-DEv5GCtW.js";import"./index-BnSWRL8f.js";import"./Telegram-Co0kd7v2.js";import"./mediaQueryUtil-BnZLGvuw.js";const x="div",H={component:x,children:e.jsx("div",{style:{textAlign:"center",width:"100%",padding:"1em"},children:e.jsx("b",{children:"Main"})})},w={component:x,children:e.jsx("div",{style:{padding:"1em",background:"var(--ant-color-bg-container)"},children:g(30)})};g(3);const U={children:e.jsx("div",{style:{textAlign:"center",flex:1},children:e.jsx("b",{children:"Header"})})},r=({header:n=U,primarySidebar:S=O,main:f=H,secondarySidebar:h=C,footer:P=W,...j}={})=>a=>e.jsx(v,{...j,...a,header:n!==!1?{...n,...a.header}:void 0,primarySidebar:S!==!1?{...S,...a.primarySidebar}:void 0,main:f!==!1?{...f,...a.main}:void 0,secondarySidebar:h!==!1?{...h,...a.secondarySidebar}:void 0,footer:P!==!1?{...P,...a.footer}:void 0}),G={title:"Components/Layout",component:v,parameters:{layout:"fullscreen"},tags:["autodocs"],argTypes:D,render:r(),decorators:[R]},s={args:{header:{sticky:!0},primarySidebar:{sticky:!0},secondarySidebar:{sticky:!0},main:{component:"div"},direction:"ltr"},parameters:{docs:{description:{story:"Consists of `header`, `primarySidebar`, `main`, `secondarySidebar` and `footer` parts."}}}},o={args:{},parameters:{docs:{description:{story:"Header and sidebars are sticky by default."}}},render:r({primarySidebar:y,main:w,secondarySidebar:k})},t={args:{header:{sticky:!1},primarySidebar:{sticky:!1},secondarySidebar:{sticky:!1}},parameters:{docs:{description:{story:"Header and sidebars could be not sticky."}}},render:r({primarySidebar:y,main:w,secondarySidebar:k})},d={args:{primarySidebar:{style:{width:"150%"}}},parameters:{docs:{description:{story:"Sidebars could be overflowed, i.e. when expanded on small screens. This feature uses [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)."}}},render:r({primarySidebar:y})},i={args:{direction:"rtl"},parameters:{docs:{description:{story:"Rtl-direction supported."}}},decorators:[n=>e.jsx(L,{direction:"rtl",children:e.jsx(n,{})})]},c={args:{},parameters:{docs:{description:{story:"Could be used without some parts."}}},render:r({header:!1,secondarySidebar:!1,footer:!1})},p={args:{},parameters:{docs:{description:{story:"Using `Page` component."}}},render:r({main:{component:"div",children:e.jsx(u,{header:b,children:g(5)})}})},m={args:{},parameters:{docs:{description:{story:"Using `Page` without other parts."}}},render:r({footer:!1,header:!1,primarySidebar:!1,secondarySidebar:!1,main:{children:e.jsx(u,{header:b,centered:"content-only"})}})},l={args:{},parameters:{docs:{description:{story:"Using `Page` with some parts."}}},render:r({header:!1,primarySidebar:!1,secondarySidebar:!1,main:{children:e.jsx(u,{header:b,centered:!0})}})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    header: {
      sticky: true
    },
    primarySidebar: {
      sticky: true
    },
    secondarySidebar: {
      sticky: true
    },
    main: {
      component: "div"
    },
    direction: "ltr"
  },
  parameters: {
    docs: {
      description: {
        story: "Consists of \`header\`, \`primarySidebar\`, \`main\`, \`secondarySidebar\` and \`footer\` parts."
      }
    }
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Header and sidebars are sticky by default."
      }
    }
  },
  render: render({
    primarySidebar: primarySidebarLong,
    main: mainLong,
    secondarySidebar: secondarySidebarLong
  })
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    header: {
      sticky: false
    },
    primarySidebar: {
      sticky: false
    },
    secondarySidebar: {
      sticky: false
    }
  },
  parameters: {
    docs: {
      description: {
        story: "Header and sidebars could be not sticky."
      }
    }
  },
  render: render({
    primarySidebar: primarySidebarLong,
    main: mainLong,
    secondarySidebar: secondarySidebarLong
  })
}`,...t.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    primarySidebar: {
      style: {
        width: "150%"
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: "Sidebars could be overflowed, i.e. when expanded on small screens. This feature uses [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)."
      }
    }
  },
  render: render({
    primarySidebar: primarySidebarLong
  })
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    direction: "rtl"
  },
  parameters: {
    docs: {
      description: {
        story: "Rtl-direction supported."
      }
    }
  },
  decorators: [Story => <ConfigProvider direction="rtl">
                <Story />
            </ConfigProvider>]
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Could be used without some parts."
      }
    }
  },
  render: render({
    header: false,
    secondarySidebar: false,
    footer: false
  })
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Using \`Page\` component."
      }
    }
  },
  render: render({
    main: {
      component: "div",
      children: <Page header={pageHeader}>{loremIpsumParagraphs(5)}</Page>
    }
  })
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Using \`Page\` without other parts."
      }
    }
  },
  render: render({
    footer: false,
    header: false,
    primarySidebar: false,
    secondarySidebar: false,
    main: {
      children: <Page header={pageHeader} centered="content-only" />
    }
  })
}`,...m.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Using \`Page\` with some parts."
      }
    }
  },
  render: render({
    header: false,
    primarySidebar: false,
    secondarySidebar: false,
    main: {
      children: <Page header={pageHeader} centered />
    }
  })
}`,...l.parameters?.docs?.source}}};const J=["Default","StickyParts","NotStickyParts","OverflowedSidebars","Rtl","WithoutSomeParts","WithPage","WithOnlyPage","WithPageAndSomeParts"];export{s as Default,t as NotStickyParts,d as OverflowedSidebars,i as Rtl,o as StickyParts,m as WithOnlyPage,p as WithPage,l as WithPageAndSomeParts,c as WithoutSomeParts,J as __namedExportsOrder,G as default};
