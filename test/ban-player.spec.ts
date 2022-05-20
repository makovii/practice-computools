import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { SUCCESS } from '../src/constants';

describe('user change login', () => {
  let tokenNewPlayer: any;
  let tokenManager: any;

  const manager = {
    "name": "manager",
    "email": "manager@gmail.com",
    "password": "1234",
  };
  const newPlayer = {
    "name": faker.name.firstName(),
    "email": faker.internet.email(),
    "password": "1234"
  };

  beforeAll(async function() {
    const resRegistration = await request('http://localhost:3030')
    .post('/auth/registration')
    .send(newPlayer);

    tokenNewPlayer = (await request('http://localhost:3030')
    .get('/auth/login')
    .send(newPlayer))
    .body.token;

    tokenManager = (await request('http://localhost:3030').get('/auth/login').send(manager)).body.token;
  }, 10000);

  it('patch /user/ban', async () => {

    const player = (await request('http://localhost:3030')
    .get('/user/me')
    .set('Authorization', `bearer ${tokenNewPlayer}`))
    .body;

    expect(player).toMatchObject({
      name: newPlayer.name,
      email: newPlayer.email,
      pathPhoto: null,
      roleId: 2,
      ban: false,
      banReason: '',
      teams: []
    });

    const banReason = 'said the earth is flat';

    const resBan = (await request('http://localhost:3030')
    .patch('/user/ban')
    .set('Authorization', `bearer ${tokenManager}`)
    .send({
      userId: player.id,
      ban: true,
      banReason: banReason
    }))
    .body;
    
    expect(resBan).toEqual(SUCCESS);
    
    tokenNewPlayer = (await request('http://localhost:3030')
    .get('/auth/login')
    .send(newPlayer))
    .body.token;

    const playerAfterBan = (await request('http://localhost:3030')
    .get('/user/me')
    .set('Authorization', `bearer ${tokenNewPlayer}`))
    .body;

    expect(playerAfterBan).toMatchObject({
      message: 'you got banned',
      banReason: banReason,
    });
  });

});