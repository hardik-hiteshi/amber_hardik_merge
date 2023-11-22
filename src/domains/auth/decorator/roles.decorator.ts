import { Role } from '../roles/permission.roles';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const ROLES = (
  ...roles: Role[]
): PropertyDecorator & MethodDecorator & ClassDecorator =>
  SetMetadata(ROLES_KEY, roles);
