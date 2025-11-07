import { prisma } from '../config/prisma';
import { Prisma } from '@prisma/client';
import { logger } from '../utils/logger';

export class KPIService {
  async create(data: Prisma.KPICreateInput) {
    return prisma.kPI.create({
      data,
      include: {
        colaborador: {
          select: {
            nome: true,
            cargo: true,
          },
        },
      },
    });
  }

  async findByUser(userId: string) {
    return prisma.kPI.findMany({
      where: { colaboradorId: userId },
      orderBy: {
        ultimaSync: 'desc',
      },
    });
  }

  async syncKPIs(userId: string) {
    // TODO: Implementar integração com APIs externas (Google Ads, Meta Ads, etc)
    // Por enquanto, apenas retorna os KPIs existentes
    logger.info(`Syncing KPIs for user ${userId}`);

    const kpis = await this.findByUser(userId);

    // Simular atualização
    const updatedKPIs = await Promise.all(
      kpis.map((kpi) =>
        prisma.kPI.update({
          where: { id: kpi.id },
          data: {
            ultimaSync: new Date(),
          },
        })
      )
    );

    return {
      message: 'KPIs synced successfully',
      count: updatedKPIs.length,
      kpis: updatedKPIs,
    };
  }

  // TODO: Implementar métodos de integração com APIs
  async syncGoogleAds(userId: string) {
    // Integração com Google Ads API
    logger.info(`Syncing Google Ads for user ${userId}`);
  }

  async syncMetaAds(userId: string) {
    // Integração com Meta Ads API
    logger.info(`Syncing Meta Ads for user ${userId}`);
  }
}
