import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const prisma = new PrismaClient();
export { PrismaClientKnownRequestError };

