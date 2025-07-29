import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { OperatingPeriodService } from './operating-period.service';
import { ProcessService } from 'src/process/process.service';
import { updateOperatingPeriodDto } from 'src/dto/operatingPeriod/updateOperatingPerior.Dto';

@Controller('operating-period')
export class OperatingPeriodController {
  constructor(
    private operatingPeriodService: OperatingPeriodService,
    @Inject(forwardRef(() => ProcessService))
    private readonly processService: ProcessService,
  ) {}

  @Get()
  async findAll() {
    try {
      const periodArray = await this.operatingPeriodService.findAll();
      if (!periodArray) {
        throw new NotFoundException(
          'No se encontro ningun periodo actualmente',
        );
      }
      return periodArray;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }

  @Get('/current')
  async current() {
    try {
      const currenPeriod = await this.operatingPeriodService.getCurrent();
      if (!currenPeriod) {
        throw new NotFoundException('No se han iniciado operaciones');
      }
      return currenPeriod;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido algo inesperado. Mas informacion: ${error}`,
      );
    }
  }

  @Get('/total-sells/:id')
  async totalSells(@Param('id') id: string) {
    try {
      const totalSells = await this.processService.totalPeriodSells(id);
      if (!totalSells) {
        throw new NotFoundException('No se han iniciado operaciones');
      }
      return totalSells;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido algo inesperado. Mas informacion: ${error}`,
      );
    }
  }

  @Put(':id')
  async updatePeriodControler(
    @Param('id') id: string,
    @Body() body: updateOperatingPeriodDto,
  ) {
    try {
      const response = await this.operatingPeriodService.updateRegistersService(
        id,
        body,
      );
      if (!response) {
        throw new NotFoundException('No se pudo actualizar el periodo');
      }
      return response;
    } catch (error) {
      throw new NotFoundException('No se pudo actualizar el periodo');
    }
  }

  @Put('close-period/:id')
  async closePeriod(@Param('id') id: string) {
    try {
      const res = await this.operatingPeriodService.closePeriod(id);
      if (!res) {
        throw new NotFoundException('No se ha podido cerrar el periodo');
      }
      return res;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido algo inesperado. Mas informacion: ${error}`,
      );
    }
  }

  @Post('money-movement')
  async createMoneyMovement(@Body() body: any) {
    try {
      const res = await this.operatingPeriodService.createMoneyMovement(body);
      if (!res) {
        throw new NotFoundException('No se ha podido crear el movimiento');
      }
      return res;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido algo inesperado. Mas informacion: ${error}`,
      );
    }
  }

  @Put('money-movement/:id')
  async updateMoneyMovement(@Param('id') id: string, @Body() body: any) {
    try {
      const res = await this.operatingPeriodService.updateMoneyMovement(
        id,
        body,
      );
      if (!res) {
        throw new NotFoundException('No se ha podido actualizar el movimiento');
      }
      return res;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido algo inesperado. Mas informacion: ${error}`,
      );
    }
  }

  @Patch('close-period/:id')
  async updatePeriod(@Param('id') id: string, @Body() body: any) {
    try {
      const res = await this.operatingPeriodService.patchPeriod(id, body);
      if (!res) {
        throw new NotFoundException('No se ha podido cerrar el periodo');
      }
      return res;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido algo inesperado. Mas informacion: ${error}`,
      );
    }
  }

  // controller para aprovar un periodo
  @Put('approve-period/:id')
  async approvePeriod(@Param('id') id: string, @Body() body: any) {
    try {
      const res = await this.operatingPeriodService.approvePeriod(id, body);
      if (!res) {
        throw new NotFoundException('No se ha podido cerrar el periodo');
      }
      return res;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido algo inesperado. Mas informacion: ${error}`,
      );
    }
  }

  @Get('/test/:id')
  async test(@Param('id') id: string) {
    try {
      const res = await this.processService.especificSellsForPayment(
        id,
        'cash',
      );

      return res;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido algo inesperado. Mas informacion: ${error}`,
      );
    }
  }

  @Post('search-source-period')
  async searchSourcePeriod(@Body() body: any) {
    try {
      const res =
        await this.operatingPeriodService.SearchSourcePeriodByBranchIdAndDate(
          body,
        );
      if (!res) {
        throw new NotFoundException('No se ha podido buscar el periodo');
      }
      return res;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido algo inesperado. Mas informacion: ${error}`,
      );
    }
  }

  @Get('balance-sheet')
  async getBalance() {
    try {
      const response = await this.operatingPeriodService.getBalanceSheet();
      if (!response) {
        throw new NotFoundException('No se ha encontrado el balance');
      }
      return response;
    } catch (error) {
      throw new NotFoundException(
        `Ha ocurrido algo inesperado. Mas informacion: ${error}`,
      );
    }
  }

  // @Get('source/:id')
  // async getSourcePeriod(@Param('id') id: string) {
  //   try {
  //     const response =
  //       await this.operatingPeriodService.SearchSourcePeriodByBranchIdAndDate(id);
  //     if (!response) {
  //       throw new Error('ha ocurrido un error inesperado');
  //     }
  //     return response;
  //   } catch (error) {
  //     throw new Error('ha ocurrido un error inesperado');
  //   }
  // }
}
