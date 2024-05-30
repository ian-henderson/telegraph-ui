import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { useSynchronizeTheme } from "./hooks";
import router from "./router";
import store from "./store";

export default function App() {
    useSynchronizeTheme();

    return (
        <Provider {...{ store }}>
            <RouterProvider {...{ router }} />
        </Provider>
    );
}
