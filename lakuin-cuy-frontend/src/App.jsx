import { RouterProvider } from "react-router-dom"
import router from "./router"
import { ThemeProvider } from "@mui/material"
import theme from "./theme"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"

const client = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={client}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}/>
    </ThemeProvider>
    </QueryClientProvider>
    )
}

export default App
