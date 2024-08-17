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

function App() {
  const [config] = useConfig();
  const [reputationsLoading, setReputationLoading] = useState<boolean>(false);
  const [ledgersLoading, setLedgersLoading] = useState<boolean>(false);
  const [balance, refreshBalance] = useBalance();
  const [factions, ledgers, refreshReputations, refreshLedgers] = useFactions();
  const [reputationLastUpdated, updateReputationLastUpdated] = useRefreshDate('sot-dashboard-reputation-last-updated');
  const [ledgerLastUpdated, updateLedgerLastUpdated] = useRefreshDate('sot-dashboard-ledger-last-updated');
  const reputationLastUpdatedDistance = useDistanceToNow(reputationLastUpdated);
  const ledgerLastUpdatedDistance = useDistanceToNow(ledgerLastUpdated);
  const ledgerEndDate = useMemo(() => {
    const firstValue = Object.values(ledgers)[0];

    if (!firstValue) {
      return;
    }

    return firstValue.endDate;
  }, [ledgers]);
  const ledgerEndDistance = useDistanceToNow(ledgerEndDate);

  const onRefreshAll = async () => {
    setReputationLoading(true);
    setLedgersLoading(true);
    try {
      await Promise.all([
        refreshBalance(true),
        refreshReputations(true),
        refreshLedgers(true),
      ]);
      updateReputationLastUpdated();
      updateLedgerLastUpdated();
    } catch (e) {
      console.log(e);
    }
    setReputationLoading(false);
    setLedgersLoading(false);
  };

  const onRefreshReputations = async () => {
    setReputationLoading(true);
    try {
      await Promise.all([
        refreshBalance(true),
        refreshReputations(true),
      ]);
      updateReputationLastUpdated();
    } catch (e) {
      console.log(e);
    }
    setReputationLoading(false);
  }

  const onRefreshLedgers = async () => {
    setLedgersLoading(true);
    try {
      await refreshLedgers(true);
      updateReputationLastUpdated();
    } catch (e) {
      console.log(e);
    }
    setLedgersLoading(false);
  }

  return (
    <ConfigProvider config={config}>
      <Header balance={balance}>
        <button onClick={onRefreshAll} className='refresh-all-button' disabled={reputationsLoading || ledgersLoading}>{reputationsLoading || ledgersLoading ? 'Refreshing...' : 'Refresh All'}</button>
        <div className='status'>
          <button onClick={onRefreshReputations} className='status__refresh-button' disabled={reputationsLoading}>{reputationsLoading ? 'Refreshing...' : 'Refresh Reputations'}</button>
          <span className='status__description'>Reputations last updated {reputationLastUpdated && <time dateTime={reputationLastUpdated.toISOString()}>{reputationLastUpdatedDistance} ago</time>}</span>
        </div>
        <div className='status'>
          <button onClick={onRefreshLedgers} className='status__refresh-button' disabled={ledgersLoading}>{ledgersLoading ? 'Refreshing...' : 'Refresh Ledgers'}</button>
          {ledgerLastUpdated && <span className='status__description'>Ledger ends {ledgerEndDate && <time dateTime={ledgerEndDate.toISOString()}>in {ledgerEndDistance}</time>}, last updated {ledgerLastUpdated && <time dateTime={ledgerLastUpdated.toISOString()}>{ledgerLastUpdatedDistance} ago</time>}</span>}
        </div>
      </Header>
      <main className='app-main'>
        {factions.map((faction) => (
          <Faction key={faction.id} faction={faction} ledger={ledgers[faction.id]} />
        ))}
      </main>
    </ConfigProvider>
  )
}

export default App
