// import { ObjectId } from 'mongoose';
import { SerialDto } from '../dtos/createManyMachine/subDto/serial.dto';

export interface IItemsToInsert extends Partial<SerialDto> {
  //_id: ObjectId;
  region: string;
}
