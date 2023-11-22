import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateOrderDTO } from './dto/createDto/order.create.dto';
import { OrderDocument } from './schema/order.schema';
import { OrderService } from './order.service';
import { Response } from 'express';
import { Role } from '../auth/roles/permission.roles';
import { UpdateOrderDTO } from './dto/updateDto/order.update.dto';

@AUTH(Role.admin)
@Controller()
@ApiTags('Shop', 'Order')
export class OrderController {
  public constructor(public orderServices: OrderService) {}

  @Post('Order')
  public async createOrder(@Body() body: CreateOrderDTO): Promise<object> {
    return await this.orderServices.createOrder(body);
  }

  @Get('Order/:id')
  public async fetchOrder(@Param('id') id: string): Promise<OrderDocument> {
    return await this.orderServices.fetchOrder(id);
  }

  @Put('Order/:id')
  public async updateOrder(
    @Param('id') id: string,
    @Body() body: UpdateOrderDTO,
  ): Promise<object> {
    return await this.orderServices.updateOrder(id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('Order/:id')
  public async deleteOrder(@Param('id') id: string): Promise<void> {
    await this.orderServices.deleteOrder(id);
  }

  @Get('Orders')
  public async fetchOrders(
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search?: string,
  ): Promise<object> {
    return await this.orderServices.fetchOrders(pageNumber, pageSize, search);
  }

  @Get('Order/export/:type')
  private async exportOrder(
    @Param('type') type: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const file = await this.orderServices.exportFile(type);

    res.set({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': `application/${file.type}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Disposition': `attachment; filename=orders.${file.type}`,
    });

    return new StreamableFile(file.data);
  }
}
