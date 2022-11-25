import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository
      .createQueryBuilder('game')
      .where("LOWER(game.title) LIKE :param", { param: `%${param.toLowerCase()}%` })
      .getMany()
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(
      'SELECT COUNT(*) FROM games'
    )
  }

  async findUsersByGameId(id: string): Promise<User[]> {
   const users = await this.repository
   .createQueryBuilder("game")
   .where("game.id = :id", { id })
   .relation(Game, "users")
   .of(id)
   .loadMany();

    console.log('users niaosdioasmdio', '\n\n\n\n\n\n\n\n\n\n\n\n\n')
    console.log(users)

    return users
  }
}
