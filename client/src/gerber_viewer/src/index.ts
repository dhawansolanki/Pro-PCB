// @tracespace/view entry point
import GerberViewer from "./App";
import "./styles/index.css";

export { GerberViewer };
// Promise.all([
//   import("react-dom"),
//   import("./App"),
//   import("./state/StoreProvider"),
// ]).then((imports) => {
//   const [
//     { default: ReactDom },
//     { default: App },
//     { default: StoreProvider },
//   ] = imports;

//   ReactDom.hydrate(
//     <StoreProvider>
//       <App />
//     </StoreProvider>,
//     document.querySelector("[data-hook=root]")
//   );
// });
