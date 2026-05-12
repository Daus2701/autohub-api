import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @ApiOperation({
        summary: 'Create a new service',
    })
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @ApiOperation({
        summary: 'Get all services',
    })
  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @ApiOperation({
        summary: 'Get service by ID',
    })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @ApiOperation({
        summary: 'Update service by ID',
    })
  @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateServiceDto: UpdateServiceDto,
    ) {
        return this.servicesService.update(id, updateServiceDto);
    }

  @ApiOperation({
        summary: 'Delete service by ID',
    })  
  @Delete(':id')
    remove(@Param('id') id: string) {
        return this.servicesService.remove(id);
    }  

}