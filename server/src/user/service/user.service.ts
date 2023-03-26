import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRequest } from 'src/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async GetByAuthId(authId: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ authId });
  }

  public async create(request: UserRequest) {
    const user = new User();
    user.authId = request.authId;
    user.firstName = request.firstName;
    user.lastName = request.lastName;
    user.institution = request.institution;
    user.email = request.email;

    this.userRepository.save(user);
  }
}
