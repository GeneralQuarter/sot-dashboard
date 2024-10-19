import { useMemo, useState } from 'react'
import './App.scss'
import Faction from './components/Faction'
import Header from './components/Header'
import useBalance from './hooks/useBalance'
import useDistanceToNow from './hooks/useDistanceToNow'
import useFactions from './hooks/useFactions'
import useRefreshDate from './hooks/useRefreshDate'
import ConfigProvider from './components/ConfigProvider'
import useConfig from './hooks/useConfig'
import TreasuresModal from './components/TreasuresModal'
import SearchModal from './components/SearchModal'
import useOnKeyboardShortcut from './hooks/useOnKeyboardShortcut'
import useTreasures from './hooks/useTreasures'
import LoggedOutModal from './components/LoggedOutModal'
import { LoggedOutError } from './lib/sot-api'

function App() {
  const [config] = useConfig();
  const [loading, setLoading] = useState<boolean>(false);
  const [treasuresModalOpen, setTreasuresModalOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [loggedOutModalOpen, setLoggedOutModalOpen] = useState<boolean>(false);
  const [balance, refreshBalance] = useBalance();
  const [factions, ledgers, refreshReputations, refreshLedgers] = useFactions();
  const treasures = useTreasures();
  const [lastUpdated, updateLastUpdated] = useRefreshDate('sot-dashboard-last-updated');
  const lastUpdatedDistance = useDistanceToNow(lastUpdated);
  const ledgerEndDate = useMemo(() => {
    const firstValue = Object.values(ledgers)[0];

    if (!firstValue) {
      return;
    }

    return firstValue.endDate;
  }, [ledgers]);
  const ledgerEndDistance = useDistanceToNow(ledgerEndDate);

  const onRefreshAll = async () => {
    setLoading(true);
    try {
      await Promise.all([
        refreshBalance(true),
        refreshReputations(true),
        refreshLedgers(true),
      ]);
      updateLastUpdated();
    } catch (e) {
      if (e instanceof LoggedOutError) {
        setLoggedOutModalOpen(true);
      }
    }
    setLoading(false);
  };

  useOnKeyboardShortcut({ctrlKey: true, key: 'f'}, () => {
    setSearchModalOpen(!searchModalOpen);
  });

  useOnKeyboardShortcut({ctrlKey: true, key: 'r'}, () => {
    onRefreshAll();
  });

  useOnKeyboardShortcut({ctrlKey: true, key: 'k'}, () => {
    setTreasuresModalOpen(!treasuresModalOpen);
  });

  return (
    <ConfigProvider config={config}>
      <Header balance={balance}>
        <div className='status'>
          <button onClick={onRefreshAll} className='button refresh-all-button' disabled={loading}>{loading ? 'Refreshing...' : <><span>Refresh</span><kbd>Ctrl+R</kbd></>}</button>
          <span className='status__description'>
            Last updated {lastUpdated && <time title={lastUpdated.toISOString()} dateTime={lastUpdated.toISOString()}>{lastUpdatedDistance} ago</time>}
          </span>
        </div>
        <div className='status'>
          {ledgerEndDate && <span className='status__description'>Ledger Ends in {ledgerEndDate && <time title={ledgerEndDate.toISOString()} dateTime={ledgerEndDate.toISOString()}>{ledgerEndDistance}</time>}</span>}
        </div>
        <button className='button' onClick={() => setSearchModalOpen(true)}><span>Search</span><kbd>Ctrl+F</kbd></button>
        <button className='button' onClick={() => setTreasuresModalOpen(true)}><span>Treasures</span><kbd>Ctrl+K</kbd></button>
      </Header>
      <main className='app-main'>
        {factions.map((faction) => (
          <Faction key={faction.id} faction={faction} ledger={ledgers[faction.id]} />
        ))}
      </main>
      <TreasuresModal treasures={treasures} open={treasuresModalOpen} closeClick={() => setTreasuresModalOpen(false)} />
      <SearchModal open={searchModalOpen} onCloseClick={() => setSearchModalOpen(false)} factions={factions} treasures={treasures} />
      <LoggedOutModal open={loggedOutModalOpen} closeClick={() => setLoggedOutModalOpen(false)} />
    </ConfigProvider>
  )
}

export default App
