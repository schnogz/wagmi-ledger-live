import './App.css';

import { defaultChains } from 'wagmi';
import { IFrameEthereumConnector } from '@ledgerhq/ledger-live-wagmi-connector';
import { useConnect, useAccount, createClient, WagmiConfig } from "wagmi";
import { getDefaultProvider } from 'ethers'

const wagmiClient = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})

const Observer = () => {
  const { address, connector, isConnected } = useAccount();
  const { connect, error } = useConnect({
    connector: new IFrameEthereumConnector( {chains: defaultChains, options: {}}),
  })

  console.log(address, connector, isConnected);

  if (isConnected) return  <div>ADDRESS: {address}</div>
  if (error ) return <div>{error.toString()}</div>

  return <button onClick={() => connect()}>Connect</button>
};

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <div className="App">
        <header className="App-header">
          <Observer />
        </header>
      </div>
    </WagmiConfig>
  );
}

export default App;
