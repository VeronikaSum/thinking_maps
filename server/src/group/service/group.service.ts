import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../group.entity';
import { UserService } from 'src/user/service/user.service';
import { GroupRequest } from 'src/types';
import { Child } from 'src/child/child.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    private readonly userService: UserService,
  ) {}

  async GetByAuthId(id: any): Promise<Group[]> {
    return await this.groupRepository.find({
      relations: {
        child: true,
      },
      where: {
        owner: {
          authId: id,
        },
      },
    });
  }

  async GetById(id: any): Promise<Group> {
    return await this.groupRepository.findOne({
      relations: {
        child: true,
      },
      where: {
        id: id,
      },
    });
  }
  async Create(request: GroupRequest) {
    const group = new Group();
    group.name = request.name;
    group.owner = await this.userService.GetByAuthId(request.authId);

    const children: Child[] = [];

    request.children.map((child) => {
      const entity: Child = new Child();
      entity.firstName = child.firstName;
      entity.lastName = child.lastName;
      entity.age = child.age;

      children.push(entity);
    });

    group.child = children;

    this.groupRepository.save(group);
  }
}
