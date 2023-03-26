import { Inject, Injectable } from '@nestjs/common';
import { ChildRequest } from 'src/types';
import { Child } from '../child.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupService } from 'src/group/service/group.service';

@Injectable()
export class ChildService {
  constructor(
    @InjectRepository(Child)
    private childRepository: Repository<Child>,
    private groupService: GroupService,
  ) {}

  async GetById(id: any): Promise<Child> {
    return await this.childRepository.findOneBy(id);
  }
  async GetByGroupId(id: any): Promise<Child[]> {
    return await this.childRepository.findBy({ group: { id: id } });
  }
  async Create(request: ChildRequest) {
    const child = new Child();
    child.firstName = request.firstName;
    child.lastName = request.lastName;
    child.age = request.age;

    // child.group = await this.groupService.GetById(request.group);

    this.childRepository.save(child);
  }
}
