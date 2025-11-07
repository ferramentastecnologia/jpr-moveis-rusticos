import { prisma } from '../config/prisma';
import { Prisma } from '@prisma/client';

export class CFRService {
  // Conversas (1:1s)
  async createConversa(data: Prisma.CFRConversaCreateInput) {
    return prisma.cFRConversa.create({
      data,
      include: {
        colaborador: {
          select: {
            nome: true,
            cargo: true,
          },
        },
        gestor: {
          select: {
            nome: true,
            cargo: true,
          },
        },
      },
    });
  }

  async getConversasByUser(userId: string) {
    return prisma.cFRConversa.findMany({
      where: {
        OR: [{ colaboradorId: userId }, { gestorId: userId }],
      },
      include: {
        colaborador: {
          select: {
            nome: true,
            cargo: true,
            fotoUrl: true,
          },
        },
        gestor: {
          select: {
            nome: true,
            cargo: true,
            fotoUrl: true,
          },
        },
      },
      orderBy: {
        dataReuniao: 'desc',
      },
    });
  }

  // Feedbacks
  async createFeedback(data: Prisma.CFRFeedbackCreateInput) {
    return prisma.cFRFeedback.create({
      data,
      include: {
        deUsuario: {
          select: {
            nome: true,
            cargo: true,
            fotoUrl: true,
          },
        },
        paraUsuario: {
          select: {
            nome: true,
            cargo: true,
          },
        },
      },
    });
  }

  async getFeedbacksByUser(userId: string) {
    return prisma.cFRFeedback.findMany({
      where: {
        OR: [{ deUsuarioId: userId }, { paraUsuarioId: userId }],
      },
      include: {
        deUsuario: {
          select: {
            nome: true,
            cargo: true,
            fotoUrl: true,
          },
        },
        paraUsuario: {
          select: {
            nome: true,
            cargo: true,
          },
        },
        relacionadoOkr: {
          select: {
            objetivo: true,
          },
        },
      },
      orderBy: {
        dataFeedback: 'desc',
      },
    });
  }

  // Reconhecimentos
  async createReconhecimento(data: Prisma.CFRReconhecimentoCreateInput) {
    const reconhecimento = await prisma.cFRReconhecimento.create({
      data,
      include: {
        colaborador: {
          select: {
            nome: true,
            medalhasTotal: true,
          },
        },
      },
    });

    // Atualizar contador de medalhas do usuário
    await prisma.user.update({
      where: { id: reconhecimento.colaboradorId },
      data: {
        medalhasTotal: {
          increment: 1,
        },
      },
    });

    return reconhecimento;
  }

  async getReconhecimentosByUser(userId: string) {
    return prisma.cFRReconhecimento.findMany({
      where: { colaboradorId: userId },
      include: {
        relacionadoOkr: {
          select: {
            objetivo: true,
          },
        },
      },
      orderBy: {
        dataConquista: 'desc',
      },
    });
  }
}
