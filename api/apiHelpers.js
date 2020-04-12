const getCache = ({ buildId }, cacheLogs) => {
  if (cacheLogs[buildId]
    && (Math.abs(cacheLogs[buildId].timeout - Date.now())) < 5 * 60 * 1000) {
    return cacheLogs[buildId].data;
  } return false;
};

const send = (res, { status, data }) => {
  res.json({
    status,
    data,
  });
};

module.exports = { send, getCache };
