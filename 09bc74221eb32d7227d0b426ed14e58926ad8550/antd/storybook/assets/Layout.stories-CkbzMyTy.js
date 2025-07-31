import{j as e}from"./iframe-Dc2UxeNr.js";import{L as v,f as W,s as O,p as R,a as H,b as l,c as k}from"./secondary-sidebar-B1Ggfi7c.js";import{l as y,P as b}from"./index-BHGJfmvy.js";import{h as g}from"./header-BBak98vR.js";import"./index-DYnDAXbX.js";import"./PieChartOutlined-CfRGQi4r.js";import"./presets-DEv5GCtW.js";import"./index-C3ZHrfhQ.js";import"./index-Cwy-z8jX.js";import"./Telegram-0i5BORMK.js";import"./DownOutlined-DeF5Gtmy.js";const x="div",U={component:x,children:e.jsx("div",{style:{textAlign:"center",width:"100%",padding:"1em"},children:e.jsx("b",{children:"Main"})})},w={component:x,children:e.jsx("div",{style:{padding:"1em",background:"var(--ant-color-bg-container)"},children:y(30)})};y(3);const C={children:e.jsx("div",{style:{textAlign:"center",flex:1},children:e.jsx("b",{children:"Header"})})},r=({header:u=C,primarySidebar:S=R,main:h=U,secondarySidebar:f=O,footer:P=W,...L}={})=>(a,j)=>e.jsx(v,{...L,...a,header:u!==!1?{...u,...a.header}:void 0,primarySidebar:S!==!1?{...S,...a.primarySidebar}:void 0,main:h!==!1?{...h,...a.main}:void 0,secondarySidebar:f!==!1?{...f,...a.secondarySidebar}:void 0,footer:P!==!1?{...P,...a.footer}:void 0,style:j.viewMode==="docs"?{"--evlta-layout-height":"600px",...a.style}:void 0}),F={title:"Components/Layout",component:v,parameters:{layout:"fullscreen"},tags:["autodocs"],argTypes:H,render:r()},n={args:{header:{sticky:!0},primarySidebar:{sticky:!0},secondarySidebar:{sticky:!0},main:{component:"div"},direction:"ltr"},parameters:{docs:{description:{story:"Consists of `header`, `primarySidebar`, `main`, `secondarySidebar` and `footer` parts."}}}},s={args:{},parameters:{docs:{description:{story:"Header and sidebars are sticky by default."}}},render:r({primarySidebar:l,main:w,secondarySidebar:k})},o={args:{header:{sticky:!1},primarySidebar:{sticky:!1},secondarySidebar:{sticky:!1}},parameters:{docs:{description:{story:"Header and sidebars could be not sticky."}}},render:r({primarySidebar:l,main:w,secondarySidebar:k})},d={args:{primarySidebar:{style:{width:"150%"}}},parameters:{docs:{description:{story:"Sidebars could be overflowed, i.e. when expanded on small screens. This feature uses [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)."}}},render:r({primarySidebar:l})},t={args:{direction:"rtl"},parameters:{docs:{description:{story:"Rtl-direction supported."}}}},i={args:{},parameters:{docs:{description:{story:"Could be used without some parts."}}},render:r({header:!1,secondarySidebar:!1,footer:!1})},c={args:{},parameters:{docs:{description:{story:"Using `Page` component."}}},render:r({main:{component:"div",children:e.jsx(b,{header:g,children:y(5)})}})},p={args:{},parameters:{docs:{description:{story:"Using `Page` without other parts."}}},render:r({footer:!1,header:!1,primarySidebar:!1,secondarySidebar:!1,main:{children:e.jsx(b,{header:g,centered:"content-only"})}})},m={args:{},parameters:{docs:{description:{story:"Using `Page` with some parts."}}},render:r({header:!1,primarySidebar:!1,secondarySidebar:!1,main:{children:e.jsx(b,{header:g,centered:!0})}})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    direction: "rtl"
  },
  parameters: {
    docs: {
      description: {
        story: "Rtl-direction supported."
      }
    }
  }
  // render: render({
  // 	primarySidebar: primarySidebarLong,
  // 	main: mainLong,
  // 	secondarySidebar: secondarySidebarLong,
  // }),
  // decorators: [
  // 	(Story) => (
  // 		<ConfigProvider direction="rtl">
  // 			<Story />
  // 		</ConfigProvider>
  // 	),
  // ],
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};const G=["Default","StickyParts","NotStickyParts","OverflowedSidebars","Rtl","WithoutSomeParts","WithPage","WithOnlyPage","WithPageAndSomeParts"];export{n as Default,o as NotStickyParts,d as OverflowedSidebars,t as Rtl,s as StickyParts,p as WithOnlyPage,c as WithPage,m as WithPageAndSomeParts,i as WithoutSomeParts,G as __namedExportsOrder,F as default};
