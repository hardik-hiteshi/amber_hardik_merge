import { ClientSession, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/domains/user/schema/user.schema';

@Injectable()
export class TransactionService {
  public constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async startTransaction(): Promise<ClientSession> {
    const session = await this.userModel.db.startSession();
    session.startTransaction();

    return session;
  }

  public async commitTransaction(session: ClientSession): Promise<void> {
    await session.commitTransaction();
    session.endSession();
  }

  public async abortTransaction(session: ClientSession): Promise<void> {
    await session.abortTransaction();
    session.endSession();
  }
}
