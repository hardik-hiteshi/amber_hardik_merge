import * as JSZip from 'jszip';
import * as xlsx from 'xlsx';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDTO } from './dto/createDto/order.create.dto';
import { json2csv } from 'json-2-csv';
import { OrderDocument } from './schema/order.schema';
import { OrderRepository } from './repository/order.repository';
import { UpdateOrderDTO } from './dto/updateDto/order.update.dto';

@Injectable()
export class OrderService {
  public constructor(public orderRepo: OrderRepository) {}

  public async createOrder(body: CreateOrderDTO): Promise<object> {
    const orderExist = await this.orderRepo.fetchOrder(body.id);
    if (orderExist) {
      throw new NotFoundException('Order already exits found.');
    }
    const order = await this.orderRepo.createOrder(body);
    const response = {
      id: order.id,
    };

    return response;
  }

  public async fetchOrder(id: string): Promise<OrderDocument> {
    const order = await this.orderRepo.fetchOrder(id);
    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    return order;
  }

  public async updateOrder(id: string, body: UpdateOrderDTO): Promise<object> {
    const updatedOrder = await this.orderRepo.updateOrder(id, body);
    if (!updatedOrder) {
      throw new NotFoundException('Order Not found.');
    }
    const response = {
      id: updatedOrder.id,
    };

    return response;
  }

  public async deleteOrder(id: string): Promise<object> {
    const deletedOrder = await this.orderRepo.deleteOrder(id);
    if (!deletedOrder) {
      throw new NotFoundException('Order Not found.');
    }

    return { message: 'Delete Sucess' };
  }

  public async fetchOrders(
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<object> {
    const ordersList = await this.orderRepo.fetchOrders(
      pageNumber,
      pageSize,
      search,
    );

    const count = await this.orderRepo.countDocs({});

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: ordersList,
    };
  }

  public async exportFile(
    type: string,
  ): Promise<{ data: Buffer; type: string }> {
    type = type.toLocaleLowerCase();
    const orders = await this.orderRepo.findAll({});

    if (orders.length <= 0) throw new NotFoundException(' Order not found');
    if (type === 'csv') {
      const csv = await json2csv(orders);
      const data = Buffer.from(csv);

      return { data, type };
    } else if (type === 'xlsx') {
      const ws = xlsx.utils.json_to_sheet(orders);
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
      const xlsxData = xlsx.write(wb, {
        bookType: 'xlsx',
        type: 'buffer',
      }) as Buffer;

      return { data: xlsxData, type };
    } else if (type === 'jsonzip') {
      const jsonFiles: Buffer[] = [];
      const zip = new JSZip();
      const zipFolder = zip.folder('json_data');
      for (const entry of orders) {
        const jsonData = JSON.stringify(entry, null, 2);
        jsonFiles.push(Buffer.from(jsonData));
      }

      for (let i = 0; i < jsonFiles.length; i++) {
        zipFolder.file(`data_${i}.json`, jsonFiles[i]);
      }

      const data = await zip.generateAsync({ type: 'nodebuffer' });

      return { data, type: 'zip' };
    } else if (type === 'json') {
      const data = Buffer.from(JSON.stringify(orders));

      return { data, type };
    }
    throw new BadRequestException('invalid data type');
  }
}
