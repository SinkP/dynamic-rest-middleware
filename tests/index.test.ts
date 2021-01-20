import { getUrl } from '../src/index';
import axios from 'axios';

let response = undefined;

function checkCorrectData() {
  expect(response.data.results).not.toBeUndefined()
  expect(response.data.results.songs).not.toBeUndefined()
  expect(response.data.results.songs.length).toBeGreaterThan(0);
}

beforeAll(async () => {
  response = await axios.get(getUrl({ url: 'http://bychords.com:8000/api/admin/songs' }));
});

test('getUrl is defined', async () => {
  expect(getUrl).not.toBeUndefined()
})

test('getUrl is function', async () => {
  expect(typeof getUrl).toBe('function');
})

test('It response some request', async () => {
  expect(response).not.toBeUndefined()
});

// test('It response correct response with some data', checkCorrectData);_

test('Testing filter by id', async () => {
  response = await axios.get(getUrl({
    url: 'http://bychords.com:8000/api/admin/songs',
    filters: [
      {
        field: 'id',
        value: '122445'
      },
    ],
  }));

  checkCorrectData();
  expect(response.data.results.songs[0].id).toBe(122445);
  expect(response.data.count).toBe(1);
});

test('Testing filter by performer', async () => {
  response = await axios.get(getUrl({
    url: 'http://bychords.com:8000/api/admin/songs',
    filters: [
      {
        field: 'performer',
        value: '2000'
      },
    ]
  }));

  checkCorrectData();

  for (const song of response.data.results.songs) {
    expect(song.performer).toBe(2000);
  }
});

test('Testing filter by performer and by id', async () => {
  response = await axios.get(getUrl({
    url: 'http://bychords.com:8000/api/admin/songs',
    filters: [
      {
        field: 'performer',
        value: '2000'
      },
      {
        field: 'id',
        value: '54821'
      },
    ]
  }));

  checkCorrectData();

  expect(response.data.results.songs.length).toBe(1);
  expect(response.data.results.songs[0].id).toBe(54821);

  for (const song of response.data.results.songs) {
    expect(song.performer).toBe(2000);
  }
});

test('Testing filter by title with modificator ', async () => {
  response = await axios.get(getUrl({
    url: 'http://bychords.com:8000/api/admin/songs',
    filters: [
      {
        field: 'title',
        value: '3000',
        mod: 'icontains',
      },
    ]
  }));

  expect(response.data.results.songs.length).toBeGreaterThan(1);
});

test('Testing filter with "not" modificator ', async () => {
  response = await axios.get(getUrl({
    url: 'http://bychords.com:8000/api/admin/songs',
    filters: [
      {
        field: 'title',
        value: 'Kill me',
        not: true,
      },
    ]
  }));

  checkCorrectData();

  expect(response.data.results.songs.length).toBe(200);
});

test('Testing exclude all fields', async () => {
  response = await axios.get(getUrl({
    url: 'http://bychords.com:8000/api/admin/songs',
    excludeAll: true,
  }));

  for (const song of response.data.results.songs) {
    expect(song.id).toBeUndefined();
    expect(song.performer).toBeUndefined();
    expect(song.links).not.toBeUndefined();
  }
});

test('Testing include', async () => {
  response = await axios.get(getUrl({
    url: 'http://bychords.com:8000/api/admin/songs',
    filters: [
      {
        field: 'performer',
        value: '2000'
      },
    ],
    include: [
      'performer.*',
    ]
  }));

  checkCorrectData();

  expect(response.data.results.performers).not.toBeUndefined()
  expect(response.data.results.performers.length).toBe(1);
  expect(response.data.results.performers[0].id).toBe(2000);
});

test('Testing many includes', async () => {
  response = await axios.get(getUrl({
    url: 'http://bychords.com:8000/api/admin/songs',
    filters: [ 
      {
        field: 'performer',
        value: '2000'
      },
    ],
    include: [
      'performer.*',
      'user_added.*',
    ]
  }));

  checkCorrectData();

  expect(response.data.results.performers).not.toBeUndefined()
  expect(response.data.results.performers.length).toBe(1);
  expect(response.data.results.performers[0].id).toBe(2000);
  
  expect(response.data.results.custom_users).not.toBeUndefined()
  expect(response.data.results.custom_users.length).toBeGreaterThan(0);
});

