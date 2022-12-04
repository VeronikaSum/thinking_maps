import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { ApiController } from './controller/api.controller';
import { ApiService } from './service/api.service';

@Module({
  imports: [HttpModule],
  controllers: [ApiController],
  providers: [ApiService]
})
export class ApiModule { }
