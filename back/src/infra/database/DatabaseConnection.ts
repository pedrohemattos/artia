import { PrismaClient } from "@prisma/client";

export class DatabaseConnection extends PrismaClient {
  constructor() {
    super({
      log: ['error', "warn"],
      errorFormat: "pretty"
    });
  }
}