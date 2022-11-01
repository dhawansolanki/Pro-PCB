import React from 'react';
import ReactDomServer from 'react-dom/server';
import { dom as faDom } from '@fortawesome/fontawesome-svg-core';
import GerberViewer from './App';
import faviconIco from './images/favicon.ico';
import favicon16 from './images/favicon-16x16.png';
import favicon32 from './images/favicon-32x32.png';
import favicon64 from './images/favicon-64x64.png';
export default function StaticTemplate(props) {
    const { options } = props.htmlWebpackPlugin;
    return `<!doctype html>${ReactDomServer.renderToStaticMarkup(React.createElement("html", { lang: "en", className: "h-100 lh-solid" },
        React.createElement("head", null,
            React.createElement("meta", { charSet: "utf-8" }),
            React.createElement("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
            React.createElement("meta", { name: "description", content: options.description }),
            React.createElement("meta", { name: "author", content: options.author }),
            React.createElement("title", null, options.title),
            React.createElement("link", { rel: "shortcut icon", href: faviconIco }),
            React.createElement("link", { rel: "icon", type: "image/png", sizes: "16x16", href: favicon16 }),
            React.createElement("link", { rel: "icon", type: "image/png", sizes: "32x32", href: favicon32 }),
            React.createElement("link", { rel: "icon", type: "image/png", sizes: "32x32", href: favicon64 }),
            React.createElement("style", null, faDom.css())),
        React.createElement("body", { className: "h-100 overflow-hidden" },
            React.createElement("div", { "data-hook": "root", className: "h-100", dangerouslySetInnerHTML: {
                    __html: ReactDomServer.renderToString(React.createElement(GerberViewer, null)),
                } }))))}`;
}
//# sourceMappingURL=template.js.map