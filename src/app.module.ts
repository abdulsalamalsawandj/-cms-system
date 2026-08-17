import { Module } from "@nestjs/common";
import { PrismaModule } from "./shared/infrastructure/prisma/prisma.module";
import { pagesModule } from "./page/presentation/pages.Module";
import { authModule } from './auth/presentation/auth.module';
import { sectionsModule } from "./section/presentation/sections.Module";
import { componentsModule } from "./component/presentation/components.Module";
import { contactMessagesModule } from "./contact-message/presentation/contact-messages.Module";
import { dashboardModule } from "./dashboard/presentation/dashboard.Module";

@Module({
  imports: [PrismaModule, pagesModule, authModule, sectionsModule, componentsModule, contactMessagesModule, dashboardModule],
})
export class AppModule {}