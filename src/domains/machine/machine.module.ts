import { Machine, machineSchema } from './schema/machine.schema';
import { MachineController } from './machine.controller';
import { MachineRepository } from './repository/machine.repository';
import { MachineService } from './machine.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Machine.name, schema: machineSchema }]),
  ],
  providers: [MachineService, MachineRepository],
  controllers: [MachineController],
})
export class MachineModule {}
