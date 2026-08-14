import { Module } from "@nestjs/common";
import { PrismaModule } from "./infrastructure/prisma/prisma.module";
import { pagesModule } from "./presentation/pages/pages.Module";
import { authModule } from './presentation/auth/auth.module';

@Module({
  imports: [PrismaModule, pagesModule, authModule],
})
export class AppModule {}