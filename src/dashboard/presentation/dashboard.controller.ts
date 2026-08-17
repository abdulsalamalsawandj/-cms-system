import { Controller, Get, UseGuards } from "@nestjs/common";
import { GetDashboardStatsUseCase } from "src/dashboard/application/use_cases/GetDashboardStatsUseCase";
import { AuthGuard } from "src/auth/presentation/guards/authGuard";
import { RoleGuard } from "src/auth/presentation/guards/roleGuard";
import { Roles } from "src/auth/presentation/guards/roles.decorator";
import { Role } from "generated/prisma/enums";

@Controller('dashboard')
export class DashboardController {
    constructor(
        private getDashboardStatsUseCase : GetDashboardStatsUseCase,
    ){}

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @Get()
    getStats (){
        return this.getDashboardStatsUseCase.execute();
    }
}
