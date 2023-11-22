/* eslint-disable @typescript-eslint/naming-convention */
import { Order, OrderDocument } from '../schema/order.schema';
import { CreateOrderDTO } from '../dto/createDto/order.create.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderQueryInterface } from './order.query.interface';
import { RecursivePartial } from 'src/common/interface';
import { UpdateOrderDTO } from '../dto/updateDto/order.update.dto';

@Injectable()
export class OrderRepository {
  public constructor(
    @InjectModel(Order.name)
    public orderModel: Model<OrderDocument>,
  ) {}

  public async createOrder(body: CreateOrderDTO): Promise<OrderDocument> {
    const order = await this.orderModel.create({
      ...body,
    });

    return order;
  }

  public async fetchOrder(id: string): Promise<OrderDocument> {
    const order = await this.orderModel.findOne({
      id,
    });

    return order;
  }

  public async updateOrder(
    id: string,
    body: UpdateOrderDTO,
  ): Promise<OrderDocument> {
    const updatedOrder = await this.orderModel.findOneAndUpdate({ id }, body, {
      new: true,
    });

    return updatedOrder;
  }

  public async deleteOrder(id: string): Promise<OrderDocument> {
    const deletedOrder = await this.orderModel.findOneAndDelete({ id });

    return deletedOrder;
  }

  public async fetchOrders(
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<OrderDocument[]> {
    const query: OrderQueryInterface = {};
    const skipAmount = pageNumber * pageSize;

    if (search) {
      query.$or = [
        { id: { $regex: search.toString(), $options: 'i' } },
        { state: { $regex: search.toString(), $options: 'i' } },
        { 'customerValue.email': { $regex: search.toString(), $options: 'i' } },
        { 'customerValue.name': { $regex: search.toString(), $options: 'i' } },
        {
          'customerValue.lastName': {
            $regex: search.toString(),
            $options: 'i',
          },
        },
        { date: { $regex: search.toString(), $options: 'i' } },
      ];
    }

    const order = await this.orderModel
      .find({
        $and: [query],
      })
      .skip(skipAmount)
      .limit(pageSize);

    return order;
  }

  public async findAll(
    query: RecursivePartial<Order> | object,
  ): Promise<OrderDocument[]> {
    return await this.orderModel.find(query).lean();
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.orderModel.countDocuments(obj);

    return docCount;
  }
}
