export interface User {
  id: string;
  email: string;
  password: string;
  nome: string;
  cargo: string;
  nivel: string;
  trilha: 'OPERACIONAL' | 'COMERCIAL' | 'GESTAO';
  departamento: string;
  gestorId?: string;
  medalhasTotal: number;
  okrsAtivos: number;
  pdiProgresso: number;
  proximoOneOnOne?: {
    com: string;
    data: string;
    diasFaltando: number;
  };
}

export const USERS: User[] = [
  // COMERCIAL
  {
    id: '1',
    email: 'dante.starken@gmail.com',
    password: 'Starken2025120930!',
    nome: 'Dante Closer',
    cargo: 'Líder de Vendas',
    nivel: 'Sênior',
    trilha: 'COMERCIAL',
    departamento: 'Vendas',
    medalhasTotal: 245,
    okrsAtivos: 4,
    pdiProgresso: 78,
    proximoOneOnOne: {
      com: 'Victor (Coordenador)',
      data: '28/Fev 15:00',
      diasFaltando: 3
    }
  },
  {
    id: '2',
    email: 'joao.starken@gmail.com',
    password: 'Starken2025120930!',
    nome: 'João SDR',
    cargo: 'Representante',
    nivel: 'Pleno',
    trilha: 'COMERCIAL',
    departamento: 'Vendas',
    gestorId: '1',
    medalhasTotal: 167,
    okrsAtivos: 3,
    pdiProgresso: 65,
    proximoOneOnOne: {
      com: 'Dante (Líder)',
      data: '02/Mar 10:00',
      diasFaltando: 5
    }
  },
  {
    id: '3',
    email: 'nathan.starken@gmail.com',
    password: 'Starken2025120930!',
    nome: 'Nathan SDR',
    cargo: 'Representante',
    nivel: 'Pleno',
    trilha: 'COMERCIAL',
    departamento: 'Vendas',
    gestorId: '1',
    medalhasTotal: 152,
    okrsAtivos: 3,
    pdiProgresso: 58,
    proximoOneOnOne: {
      com: 'Dante (Líder)',
      data: '04/Mar 14:00',
      diasFaltando: 7
    }
  },

  // OPERACIONAL
  {
    id: '4',
    email: 'victor.starken@gmail.com',
    password: 'Starken2025120930!',
    nome: 'Victor',
    cargo: 'Coordenador e Account',
    nivel: 'Sênior',
    trilha: 'GESTAO',
    departamento: 'Coordenação',
    medalhasTotal: 298,
    okrsAtivos: 5,
    pdiProgresso: 85,
    proximoOneOnOne: {
      com: 'Diretoria',
      data: '01/Mar 16:00',
      diasFaltando: 4
    }
  },
  {
    id: '5',
    email: 'kimberly.starken@gmail.com',
    password: 'Starken2025120930!',
    nome: 'Kimberly',
    cargo: 'Executora de Projeto',
    nivel: 'Pleno',
    trilha: 'OPERACIONAL',
    departamento: 'Projetos',
    gestorId: '4',
    medalhasTotal: 189,
    okrsAtivos: 4,
    pdiProgresso: 72,
    proximoOneOnOne: {
      com: 'Victor (Coordenador)',
      data: '05/Mar 11:00',
      diasFaltando: 8
    }
  },
  {
    id: '6',
    email: 'igor.starken@gmail.com',
    password: 'Starken2025120930!',
    nome: 'Igor',
    cargo: 'Designer/Editor',
    nivel: 'Pleno',
    trilha: 'OPERACIONAL',
    departamento: 'Criação',
    gestorId: '4',
    medalhasTotal: 176,
    okrsAtivos: 3,
    pdiProgresso: 68,
    proximoOneOnOne: {
      com: 'Victor (Coordenador)',
      data: '06/Mar 09:00',
      diasFaltando: 9
    }
  },
  {
    id: '7',
    email: 'ederson.starken@gmail.com',
    password: 'Starken2025120930!',
    nome: 'Ederson',
    cargo: 'Gestor de Tráfego',
    nivel: 'Sênior',
    trilha: 'OPERACIONAL',
    departamento: 'Marketing',
    gestorId: '4',
    medalhasTotal: 234,
    okrsAtivos: 4,
    pdiProgresso: 81,
    proximoOneOnOne: {
      com: 'Victor (Coordenador)',
      data: '03/Mar 13:00',
      diasFaltando: 6
    }
  }
];

// Função para autenticar usuário
export function authenticateUser(email: string, password: string): User | null {
  const user = USERS.find(u => u.email === email && u.password === password);
  return user || null;
}

// Função para buscar usuário por ID
export function getUserById(id: string): User | null {
  return USERS.find(u => u.id === id) || null;
}

// Função para buscar liderados de um gestor
export function getLiderados(gestorId: string): User[] {
  return USERS.filter(u => u.gestorId === gestorId);
}
