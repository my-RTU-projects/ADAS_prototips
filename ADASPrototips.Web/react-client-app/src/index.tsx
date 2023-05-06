import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import AutoPartsPage from "./pages/autoParts/AutoPartsPage";
import AutoPartsLayout from "./components/autoParts/AutoPartsLayout";
import DataQueryProvider from "./components/providers/DataQueryProvider";
import AddAutoPartModal from "./pages/autoParts/AddAutoPartModal";
import EditAutoPartModal from "./pages/autoParts/EditAutoPartModal";
import AutoPartsRequestPage from "./pages/autoParts/AutoPartsRequestPage";
import ServiceLayout from "./pages/service/ServiceLayout";
import ProtocolListPage from "./pages/service/ProtocolListPage";
import CreateProtocolModal from "./pages/service/CreateProtocolModal";
import EditProtocolModal from "./pages/service/EditProtocolModal";
import MarketingLayout from "./pages/marketing/MarketingLayout";
import FinancesLayout from "./pages/finances/FinancesLayout";
import HiringLayout from "./pages/hiring/HiringLayout";
import ClientListPage from "./pages/service/ClientListPage";
import {SnackbarProvider} from "notistack";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "noliktava",
                element: <AutoPartsLayout />,
                children: [
                    {
                        path: "saraksts",
                        element: <AutoPartsPage />
                    },
                    {
                        path: "pieprasijumi",
                        element: <AutoPartsRequestPage />,
                    }
                ]
            },
            {
                path: "remonts",
                element: <ServiceLayout />,
                children: [
                    {
                        path: "protokoli",
                        element: <ProtocolListPage />,
                    },
                    {
                        path: "klienti",
                        element: <ClientListPage />,
                    },
                ]
            },
            {
                path: "noligsana",
                element: <HiringLayout />
            },
            {
                path: "finanses",
                element: <FinancesLayout />
            },
            {
                path: "marketings",
                element: <MarketingLayout />
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <SnackbarProvider
            preventDuplicate
            autoHideDuration={3000}
            maxSnack={3}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <ThemeProvider theme={theme}>
                <DataQueryProvider>
                    <RouterProvider router={router} />
                </DataQueryProvider>
            </ThemeProvider>
        </SnackbarProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
