import axios from 'axios';

export const setSettings = (settings) => ({
    type: "SET_SETTINGS",
    payload: settings
});

export const getSettings = (setLoading) => {
    return (dispatch) => {
        axios.get('/api/settings')
            .then((res) => {
                const data = res.data.data.data;
                dispatch(setSettings({
                    repoName: data.repoName,
                    buildCommand: data.buildCommand,
                    mainBranch: data.mainBranch,
                    period: data.period,
                }));
            })
            .catch((e) => console.error(e))
            .finally(() => setLoading(true));
    }
}

export const setNewSettings = (settings, push, error, cb) => {
    return (dispatch) => {
        axios({
            method: 'POST',
            url: '/api/settings',
            data: {
              repoName: settings.repoName,
              buildCommand: settings.buildCommand,
              mainBranch: settings.mainBranch,
              period: parseInt(settings.period, 10),
            },
          })
          .then(() => {
            dispatch(setSettings({
              repoName: settings.repoName,
              buildCommand: settings.buildCommand,
              mainBranch: settings.mainBranch,
              period: settings.period,
            }));
    
            push();
          })
          .catch((e) => {
            cb();
            error.status(true);
            error.text('Непредвиденная ошибка');
            setTimeout(() => error.status(false), 5000);
            console.error(e);
          })
    }
}

export const runBuild = (hash, push, error, cb) => {
    return () => {
        axios.post(`/api/builds/${hash}`)
            .then(({ data }) => {
              cb();
              if (data && data.data && data.data.id) {
                push(data.data.id);
              }
            })
            .catch((e) => {
              cb();
              error.status(true);
              error.text('Непредвиденная ошибка');
              setTimeout(() => error.status(false), 5000);
              console.error(e);
            });
    }
}

export const getBuilds = (offset, builds, setShowMore, setBuilds, setIsLoaded) => {
    return () => {
        axios.get(`/api/builds?limit=10&offset=${offset}`)
            .then((res) => {
                if (res.data.data.data.length === 10) {
                    setShowMore(true);
                } else {
                    setShowMore(false);
                }
                setBuilds([...builds, ...res.data.data.data]);
                setIsLoaded(true);
            })
            .catch((e) => console.error(e));
    }
}

export const getLog = (id, setLog, cb) => {
    return () => {
        axios(
            `/api/builds/${id}/logs`,
          )
            .then((res) => {
              setLog(res.data);
              if (res.data.length > 0) {
                cb(true);
              }
            })
            .catch((e) => console.error(e));
    }
}

export const getBuild = (id, setBuild, cb) => {
    return () => {
        axios(
            `/api/builds/${id}`,
          )
            .then((res) => {
              setBuild(res.data.data.data);
              cb();
            })
            .catch((e) => console.error(e));
    }
}

export const reBuild = (build, push, setLogLoaded) => {
    return () => {
        axios.post(
            `/api/builds/${build.commitHash}`,
          )
            .then(({ data }) => {
              if (data && data.data && data.data.id) {
                setLogLoaded(false);
                push(data.data.id);
              }
            })
            .catch((e) => console.error(e));
    }
}

