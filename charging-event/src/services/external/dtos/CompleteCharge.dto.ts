import { ApiProperty } from "@nestjs/swagger";

export class CompleteChargeDto {  
  @ApiProperty()
  amount: number;
};