import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {} //?는 필수 아니라는 뜻.

// @IsString()
// readonly title?: string;
// @IsNumber()
// readonly year?: number;
// @IsString()
// readonly genres?: string;
