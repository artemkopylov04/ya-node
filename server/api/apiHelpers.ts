import express from 'express';

const getCache = ({ buildId }: { buildId: string }, cacheLogs: any) => {
  if (cacheLogs[buildId]
    && (Math.abs(cacheLogs[buildId].timeout - Date.now())) < 5 * 60 * 1000) {
    return cacheLogs[buildId].data;
  } return false;
};

const send = (res: express.Response, { status, data }: { status: number, data: any }) => {
  res.json({
    status,
    data,
  });
};

export = { send, getCache };
