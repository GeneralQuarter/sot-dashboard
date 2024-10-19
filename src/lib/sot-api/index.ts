import type { SOTBalanceResponse } from './balance';
import { SOTConfigResponse } from './config';
import type { SOTLedgerResponse } from './ledger';
import type { SOTReputationResponse } from './reputation';

export class LoggedOutError extends Error {
  constructor(msg: string = 'Logged out') {
    super(msg);
  }
};

async function apiCall<T>(path: string): Promise<T> {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`);

  if (res.redirected && res.url.includes('/logout')) {
    throw new LoggedOutError();
  }

  if (!res.ok) {
    throw new Error(`${res.status}: ${res.statusText}`);
  }

  const json = await res.json();
  localStorage.setItem(path, JSON.stringify(json));
  return json;
}

async function apiCallCached<T>(path: string, force = false): Promise<T> {
  const cached = localStorage.getItem(path);

  if (!cached || force) {
    return apiCall(path);
  }

  return JSON.parse(cached);
}

export async function getConfig(force = false) {
  return apiCallCached<SOTConfigResponse>('/api/config', force);
}

export async function getBalance(force = false) {
  return apiCallCached<SOTBalanceResponse>('/api/profilev2/balance', force);
}

export async function getReputations(force = false) {
  return apiCallCached<SOTReputationResponse>('/api/profilev2/reputation', force);
}

export async function getLedger(factionId: string, force = false) {
  return apiCallCached<SOTLedgerResponse>(`/api/ledger/global/${factionId}?count=10`, force);
}
