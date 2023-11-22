import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthenticationGuard, AuthorizationGuard } from '../guard';
import { Role } from '../roles/permission.roles';
import { ROLES } from './roles.decorator';

export const AUTH = (
  ...authRoles: Role[]
): PropertyDecorator & MethodDecorator & ClassDecorator =>
  applyDecorators(
    ROLES(...authRoles),
    UseGuards(AuthenticationGuard, AuthorizationGuard),
  );
