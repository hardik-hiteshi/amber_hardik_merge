import { MachineLog, machineLogSchema } from './schema/machine-log.schema';
import { MachineLogController } from './machine-log.controller';
import { MachineLogRepository } from './repository/machine-log.repository';

import { MachineLogService } from './machine-log.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MachineLog.name, schema: machineLogSchema },
    ]),
  ],
  controllers: [MachineLogController],
  providers: [MachineLogService, MachineLogRepository],
})
export class MachineLogModule {}
