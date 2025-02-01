import {
  Injectable,
  type ArgumentMetadata,
  type PipeTransform,
} from '@nestjs/common';

@Injectable()
export class PasswordHashPipe implements PipeTransform {
  transform(password: string) {}
}
