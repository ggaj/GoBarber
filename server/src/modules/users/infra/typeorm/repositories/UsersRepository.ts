import { getRepository, Repository, Not } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository{
  private ormRepository: Repository<User>
  constructor(){
    this.ormRepository = getRepository(User)
  }

  public async  findById(id: string): Promise<User | undefined>{
    const user = this.ormRepository.findOne(id)

    return user
  }

  public async findByEmail(email: string): Promise<User | undefined>{
    const user = this.ormRepository.findOne({
      where: { email}
    })

    return user
  }

  public async findAllProviders(execpt_user_id?: string): Promise<User[]>{
    let users: User[]

    if(execpt_user_id){
      users = await this.ormRepository.find({ where: {id: Not(execpt_user_id)}})
    }else{
      users = await this.ormRepository.find()
    }

    return users
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<User>{
    const user = this.ormRepository.create({name, email, password})

    await this.ormRepository.save(user)

    return user
  }

  public async save(user: User): Promise<User>{
    return await this.ormRepository.save(user)
  }
}

export default UsersRepository;
