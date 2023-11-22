import * as JSZip from 'jszip';
import * as xlsx from 'xlsx';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReturnedProductsDTO } from './dto/createDto/returned-products.create.dto';
import { json2csv } from 'json-2-csv';
import { ObjectId } from 'mongoose';
import { ReturnedProductsDocument } from './schema/returned-products.schema';
import { ReturnedProductsRepository } from './repository/returned-products.repository';
import { UpdateReturnedProductsDTO } from './dto/updateDto/returned-products.update.dto';

@Injectable()
export class ReturnedProductsService {
  public constructor(public returnedProductRepo: ReturnedProductsRepository) {}

  public async createReturnedProduct(
    body: CreateReturnedProductsDTO,
  ): Promise<object> {
    const returnedProduct =
      await this.returnedProductRepo.createReturnedProduct(body);
    const response = {
      _id: returnedProduct._id,
    };

    return response;
  }

  public async fetchReturnedProduct(
    _id: ObjectId,
  ): Promise<ReturnedProductsDocument> {
    const returnedProduct = await this.returnedProductRepo.fetchReturnedProduct(
      _id,
    );
    if (!returnedProduct) {
      throw new NotFoundException('ReturnedProduct not found.');
    }

    return returnedProduct;
  }

  public async updateReturnedProduct(
    _id: ObjectId,
    body: UpdateReturnedProductsDTO,
  ): Promise<object> {
    const updatedReturnedProduct =
      await this.returnedProductRepo.updateReturnedProduct(_id, body);

    if (!updatedReturnedProduct) {
      throw new NotFoundException('ReturnedProduct Not found.');
    }
    const response = {
      _id: updatedReturnedProduct._id,
    };

    return response;
  }

  public async deleteReturnedProduct(_id: ObjectId): Promise<object> {
    const deletedReturnedProduct =
      await this.returnedProductRepo.deleteReturnedProduct(_id);
    if (!deletedReturnedProduct) {
      throw new NotFoundException('ReturnedProduct Not found.');
    }

    return { message: 'Delete Sucess' };
  }

  public async fetchReturnedProducts(
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<object> {
    const returnedProductsList =
      await this.returnedProductRepo.fetchReturnedProducts(
        pageNumber,
        pageSize,
        search,
      );

    const count = await this.returnedProductRepo.countDocs({});

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: returnedProductsList,
    };
  }

  public async exportFile(
    type: string,
  ): Promise<{ data: Buffer; type: string }> {
    type = type.toLocaleLowerCase();
    const returnedProducts = await this.returnedProductRepo.findAll({});

    if (returnedProducts.length <= 0)
      throw new NotFoundException(' returned product not found');
    if (type === 'csv') {
      const csv = await json2csv(returnedProducts);
      const data = Buffer.from(csv);

      return { data, type };
    } else if (type === 'xlsx') {
      const ws = xlsx.utils.json_to_sheet(returnedProducts);
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
      for (const entry of returnedProducts) {
        const jsonData = JSON.stringify(entry, null, 2);
        jsonFiles.push(Buffer.from(jsonData));
      }

      for (let i = 0; i < jsonFiles.length; i++) {
        zipFolder.file(`data_${i}.json`, jsonFiles[i]);
      }

      const data = await zip.generateAsync({ type: 'nodebuffer' });

      return { data, type: 'zip' };
    } else if (type === 'json') {
      const data = Buffer.from(JSON.stringify(returnedProducts));

      return { data, type };
    }
    throw new BadRequestException('invalid data type');
  }
}
