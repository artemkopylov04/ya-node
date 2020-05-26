const axios = require('axios');

jest.setTimeout(30000);

// Репозитории с ветками и коммитами
const REPOSITORIES = [
  {
    repoName: 'artemkopylov04/ya-node',
    branches: [
      {
        name: 'master',
        commits: [
          '30278072ba1020cbb2c31c5ba74c2ca36a9996f2',
          'c903b6913b25f43a1c1ec3b665994690bc360118',
          'd0b1ec98a59258a62a20c9c4310ed86153330394',
        ],
      },
      {
        name: 'frontend/react',
        commits: [
          'a7dbb32ab5a27fd956d871f7555b5e6e8161a95d',
          '2f5c5134dc8413e29d68871713857fc2f2a06e72',
        ],
      },
    ],
  },
  {
    repoName: 'expressjs/express',
    branches: [
      {
        name: 'master',
        commits: [
          'bc07a41693f8c7e9bde2bfb4cd5390ad6e3b1337',
          'b93ffd4bdc09c3af925eed80c28bd37f63bb3cfc',
          '4480fb997e9132a8b1e8b23d1a2766d27a918909',
        ],
      },
      {
        name: 'benchmark',
        commits: [
          'bcdeee2df510cea17ad4524cf53b9900a46d5042',
          '78d489d73050e87d8fd0f99d16a8283143aaf4d6',
          'b89a597029c8e0c7fe5e97d326853f7acacf0f77',
        ],
      },
    ],
  },
];

const repository = REPOSITORIES[1].repoName;
const branch = REPOSITORIES[1].branches[1].name;
const commit = REPOSITORIES[1].branches[1].commits[2];
let id;

const testUrl = 'http://127.0.0.1:4000';

test('should fetch settings', async () => {
  const res = await axios.get(`${testUrl}/api/settings`);
  expect(res.status).toBe(200);
});

test('should post settings', async () => {
  const res = await axios.post(`${testUrl}/api/settings`, {
    repoName: repository,
    buildCommand: 'npm run build',
    mainBranch: branch,
    period: 13,
  });
  expect(res.status).toBe(200);
});

test('should fetch correct settings after changes', async () => {
  const res = await axios.get(`${testUrl}/api/settings`);
  expect(res.status).toBe(200);
  expect(res.data.data.data.repoName).toBe(repository);
  expect(res.data.data.data.mainBranch).toBe(branch);
});

test('should get empty builds', async () => {
  const res = await axios.get(`${testUrl}/api/builds`);
  expect(res.status).toBe(200);
  expect(res.data.data.data.length).toBe(0);
});

test('should post commit', async () => {
  const res = await axios.post(`${testUrl}/api/builds/${commit}`);
  expect(res.status).toBe(200);
  expect(res.data.data.data.status).toBe('Waiting');
  expect(typeof res.data.data.data.id).toBe('string');
  expect(res.data.data.data.id.length !== 0).toBe(true);

  id = res.data.data.data.id;
});

test('should get this build, after post commit', async () => {
  const res = await axios.get(`${testUrl}/api/builds/${id}`);
  expect(res.status).toBe(200);
  expect(res.data.data.data.status).toBe('Waiting');
  expect(res.data.data.data.id.length !== 0).toBe(true);
  expect(res.data.data.data.configurationId.length !== 0).toBe(true);
  expect(typeof res.data.data.data.buildNumber).toBe('number');
  expect(res.data.data.data.commitMessage.length !== 0).toBe(true);
});

test('should get logs of this build', async () => {
  const res = await axios.get(`${testUrl}/api/builds/${id}/logs`);
  expect(res.status).toBe(200);
});
