import { Module } from "@nestjs/common";
import { PrismaModule } from "./shared/infrastructure/prisma/prisma.module";
import { pagesModule } from "./page/presentation/pages.Module";
import { authModule } from './auth/presentation/auth.module';

@Module({
  imports: [PrismaModule, pagesModule, authModule],
})
export class AppModule {}