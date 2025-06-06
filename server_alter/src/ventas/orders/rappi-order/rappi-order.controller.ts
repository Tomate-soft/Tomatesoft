import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RappiOrderService } from './rappi-order.service';
import { updateRappiOrderDto } from 'src/dto/ventas/orders/rappiOrder/updateRappiOrder.Dto';
import { createRappiOrderDto } from 'src/dto/ventas/orders/rappiOrder/createRappiOrder.Dto';

@Controller('rappi-order')
export class RappiOrderController {
  constructor(private rappiOrderService: RappiOrderService) {}

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: updateRappiOrderDto) {
    try {
      const orderUpdated = await this.rappiOrderService.update(id, body);
      if (!orderUpdated) {
        throw new NotFoundException(`No se pudo actualizar la cuenta`);
      }
      return orderUpdated;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido un error inesperado. Mas informacion: ${error}`,
      );
    }
  }

  @Post()
  async create(@Body() body: createRappiOrderDto) {
    try {
      const newOrder = await this.rappiOrderService.create(body);
      return newOrder;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(`Ya existe esta orden`);
      }
      throw new NotFoundException(
        `Ha ocurrido un error inesperado, mas informacion: ${error}`,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const orderArray = await this.rappiOrderService.findAll();
      if (!orderArray) {
        throw new NotFoundException(`No encontraron ordenes`);
      }
      return orderArray;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido un error inesperado. Mas informacion: ${error}`,
      );
    }
  }
}
