import { prisma } from '../config/prisma';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

export class UserService {
  async create(data: Prisma.UserCreateInput) {
    // Hash password
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        nome: true,
        cargo: true,
        nivel: true,
        trilha: true,
        departamento: true,
        createdAt: true,
      },
    });
  }

  async findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        nome: true,
        cargo: true,
        nivel: true,
        trilha: true,
        departamento: true,
        medalhasTotal: true,
        elegivelPromocao: true,
      },
      orderBy: {
        nome: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        nome: true,
        cargo: true,
        nivel: true,
        role: true,
        trilha: true,
        departamento: true,
        dataAdmissao: true,
        tempoNoNivel: true,
        elegivelPromocao: true,
        medalhasTotal: true,
        fotoUrl: true,
        gestor: {
          select: {
            id: true,
            nome: true,
            cargo: true,
          },
        },
        liderados: {
          select: {
            id: true,
            nome: true,
            cargo: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    if (data.password && typeof data.password === 'string') {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        nome: true,
        cargo: true,
        nivel: true,
        updatedAt: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }

  async getDashboard(id: string) {
    const user = await this.findOne(id);

    // Buscar OKRs do ciclo atual
    const okrs = await prisma.okr.findMany({
      where: {
        ownerId: id,
        status: 'EM_PROGRESSO',
      },
      include: {
        keyResults: true,
        okrPai: {
          select: {
            id: true,
            objetivo: true,
            tipo: true,
          },
        },
      },
      orderBy: {
        dataInicio: 'desc',
      },
      take: 5,
    });

    // Buscar KPIs
    const kpis = await prisma.kPI.findMany({
      where: { colaboradorId: id },
      orderBy: {
        ultimaSync: 'desc',
      },
      take: 5,
    });

    // Buscar próximo 1:1
    const proximoOneOnOne = await prisma.cFRConversa.findFirst({
      where: {
        colaboradorId: id,
        dataReuniao: {
          gte: new Date(),
        },
      },
      include: {
        gestor: {
          select: {
            nome: true,
            cargo: true,
          },
        },
      },
      orderBy: {
        dataReuniao: 'asc',
      },
    });

    // Buscar feedbacks recentes
    const feedbacks = await prisma.cFRFeedback.findMany({
      where: { paraUsuarioId: id },
      include: {
        deUsuario: {
          select: {
            nome: true,
            cargo: true,
            fotoUrl: true,
          },
        },
      },
      orderBy: {
        dataFeedback: 'desc',
      },
      take: 5,
    });

    // Buscar medalhas recentes
    const medalhas = await prisma.cFRReconhecimento.findMany({
      where: { colaboradorId: id },
      orderBy: {
        dataConquista: 'desc',
      },
      take: 5,
    });

    // Buscar PDI
    const pdi = await prisma.pDI.findUnique({
      where: { colaboradorId: id },
    });

    return {
      user,
      okrs,
      kpis,
      proximoOneOnOne,
      feedbacks,
      medalhas,
      pdi,
    };
  }

  async getTeam(id: string) {
    // Buscar liderados
    const liderados = await prisma.user.findMany({
      where: { gestorId: id },
      select: {
        id: true,
        nome: true,
        cargo: true,
        nivel: true,
        medalhasTotal: true,
        elegivelPromocao: true,
        fotoUrl: true,
      },
    });

    // Para cada liderado, buscar OKRs atuais
    const teamData = await Promise.all(
      liderados.map(async (liderado) => {
        const okrs = await prisma.okr.findMany({
          where: {
            ownerId: liderado.id,
            status: 'EM_PROGRESSO',
          },
          include: {
            keyResults: true,
          },
          orderBy: {
            dataInicio: 'desc',
          },
          take: 3,
        });

        // Próximo 1:1
        const proximoOneOnOne = await prisma.cFRConversa.findFirst({
          where: {
            colaboradorId: liderado.id,
            dataReuniao: {
              gte: new Date(),
            },
          },
          orderBy: {
            dataReuniao: 'asc',
          },
        });

        return {
          ...liderado,
          okrs,
          proximoOneOnOne,
        };
      })
    );

    return teamData;
  }
}
