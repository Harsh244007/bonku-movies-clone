import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./configs/store/store";
// import * as serviceWorkerRegistration from './serviceWorker';

import "./App.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  
    <Provider store={store}>
      <App />
    </Provider>
  );
// serviceWorkerRegistration.register();