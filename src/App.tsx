import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global/global'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'
import { CyclesContextProvider } from './contexts/CycleContexts'

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>

        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  )
}
