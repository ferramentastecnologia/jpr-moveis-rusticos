import { prisma } from '../config/prisma';
import { Prisma } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

export class OKRService {
  async create(data: Prisma.OKRCreateInput) {
    return prisma.okr.create({
      data,
      include: {
        owner: {
          select: {
            id: true,
            nome: true,
            cargo: true,
            nivel: true,
          },
        },
        keyResults: true,
      },
    });
  }

  async findAll() {
    return prisma.okr.findMany({
      include: {
        owner: {
          select: {
            id: true,
            nome: true,
            cargo: true,
          },
        },
        keyResults: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return prisma.okr.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            nome: true,
            cargo: true,
            nivel: true,
            trilha: true,
          },
        },
        keyResults: true,
        okrPai: {
          select: {
            id: true,
            objetivo: true,
            tipo: true,
          },
        },
        okrsFilhos: {
          select: {
            id: true,
            objetivo: true,
            tipo: true,
            owner: {
              select: {
                nome: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: string, data: Prisma.OKRUpdateInput) {
    return prisma.okr.update({
      where: { id },
      data,
      include: {
        owner: {
          select: {
            id: true,
            nome: true,
          },
        },
        keyResults: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.okr.delete({
      where: { id },
    });
  }

  async findByUser(userId: string) {
    return prisma.okr.findMany({
      where: { ownerId: userId },
      include: {
        keyResults: true,
        okrPai: {
          select: {
            id: true,
            objetivo: true,
          },
        },
      },
      orderBy: {
        dataInicio: 'desc',
      },
    });
  }

  async findByCiclo(ciclo: string) {
    return prisma.okr.findMany({
      where: { ciclo },
      include: {
        owner: {
          select: {
            id: true,
            nome: true,
            cargo: true,
          },
        },
        keyResults: true,
      },
      orderBy: {
        nivel: 'asc',
      },
    });
  }

  async getHierarchy(id: string) {
    const okr = await this.findOne(id);

    if (!okr) {
      throw new AppError('OKR not found', 404);
    }

    // Buscar toda a hierarquia acima
    const hierarchy: any[] = [];
    let currentOkr = okr;

    while (currentOkr.okrPai) {
      hierarchy.unshift(currentOkr.okrPai);
      currentOkr = await this.findOne(currentOkr.okrPai.id);
    }

    hierarchy.push(okr);

    return {
      hierarchy,
      current: okr,
      children: okr.okrsFilhos,
    };
  }

  async updateProgress(id: string) {
    // Buscar OKR com KRs
    const okr = await prisma.okr.findUnique({
      where: { id },
      include: {
        keyResults: true,
      },
    });

    if (!okr) {
      throw new AppError('OKR not found', 404);
    }

    // Calcular progresso ponderado
    let totalProgress = 0;
    let totalWeight = 0;

    okr.keyResults.forEach((kr) => {
      totalProgress += Number(kr.progresso) * kr.peso;
      totalWeight += kr.peso;
    });

    const progressoGeral = totalWeight > 0 ? totalProgress / totalWeight : 0;

    // Calcular status de saúde
    const diasDecorridos = Math.floor(
      (Date.now() - okr.dataInicio.getTime()) / (1000 * 60 * 60 * 24)
    );
    const diasTotais = Math.floor(
      (okr.dataFim.getTime() - okr.dataInicio.getTime()) / (1000 * 60 * 60 * 24)
    );
    const progressoEsperado = (diasDecorridos / diasTotais) * 100;

    let statusSaude: any = 'EM_DIA';

    if (progressoGeral >= 100 || (okr.tipoObjetivo === 'AMBICIOSO' && progressoGeral >= 70)) {
      statusSaude = 'CONCLUIDO';
    } else if (progressoGeral < progressoEsperado - 25) {
      statusSaude = 'RISCO';
    } else if (progressoGeral < progressoEsperado - 10) {
      statusSaude = 'ATENCAO';
    }

    // Atualizar OKR
    return prisma.okr.update({
      where: { id },
      data: {
        progressoGeral,
        statusSaude,
      },
      include: {
        keyResults: true,
      },
    });
  }
}
