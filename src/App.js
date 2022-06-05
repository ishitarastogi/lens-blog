import React from 'react'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {LensLogin} from './components/lens/index'
function App() {
  return (
    <div>        <ConnectButton />
    <LensLogin/>
    </div>
  )
}

export default App