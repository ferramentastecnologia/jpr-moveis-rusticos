import { User } from '../data/users';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const iniciais = user.nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🎯</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  Alpha OKR Dashboard
                </h1>
                <p className="text-xs text-gray-500">Q1 2025 • {user.cargo} • {user.nivel}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <button className="relative hover:scale-110 transition-transform">
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">3</span>
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="flex items-center space-x-3 group relative">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{user.nome}</p>
                  <p className="text-xs text-gray-500">{user.medalhasTotal} medalhas 🏆</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg ring-4 ring-primary-100 cursor-pointer">
                  {iniciais}
                </div>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl hidden group-hover:block z-50">
                  <button 
                    onClick={onLogout}
                    className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 rounded-xl flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sair
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold mb-2">Bem-vindo, {user.nome.split(' ')[0]}! 👋</h2>
              <p className="text-primary-100 text-lg">Trilha: {user.trilha} • {user.departamento}</p>
            </div>
            <div className="text-right">
              <div className="text-6xl font-bold mb-2">{user.pdiProgresso}%</div>
              <p className="text-primary-100">PDI Geral</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card hover:shadow-xl transition-all border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">✓ Em dia</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{user.okrsAtivos}</h3>
            <p className="text-sm text-gray-600 font-medium">OKRs Ativos</p>
          </div>

          <div className="card hover:shadow-xl transition-all border-l-4 border-blue-500">
            <div className="p-3 bg-blue-100 rounded-xl mb-4 inline-block">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-blue-600 mb-1">{user.pdiProgresso}%</h3>
            <p className="text-sm text-gray-600 font-medium">Progresso PDI</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: `${user.pdiProgresso}%` }}></div>
            </div>
          </div>

          <div className="card hover:shadow-xl transition-all border-l-4 border-purple-500">
            <div className="p-3 bg-purple-100 rounded-xl mb-4 inline-block">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{user.proximoOneOnOne?.diasFaltando || 'N/A'} dias</h3>
            <p className="text-sm text-gray-600 font-medium">Próximo 1:1</p>
          </div>

          <div className="card hover:shadow-xl transition-all border-l-4 border-orange-500">
            <div className="p-3 bg-orange-100 rounded-xl mb-4 inline-block">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-orange-600 mb-1">{user.medalhasTotal}</h3>
            <p className="text-sm text-gray-600 font-medium">Medalhas</p>
          </div>
        </div>

        {/* OKRs e Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Meus OKRs - Q1 2025</h3>
            
            <div className="card border-l-4 border-blue-500">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold">COMPROMETIDO</span>
                  <h4 className="text-lg font-bold text-gray-900 mt-3">
                    Alcançar excelência em {user.departamento}
                  </h4>
                </div>
                <div className="text-2xl font-bold text-green-600">45%</div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">KR1: Meta principal do departamento</span>
                    <span className="font-bold">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <span className="text-xs text-gray-500">📊 Atualizado há 2h</span>
                <button className="btn-primary text-sm">Ver Detalhes</button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {user.proximoOneOnOne && (
              <div className="card border-l-4 border-purple-500">
                <h3 className="text-lg font-bold mb-3">Próximo 1:1</h3>
                <p className="text-sm text-gray-600 mb-2">📅 {user.proximoOneOnOne.data}</p>
                <p className="text-sm font-semibold text-gray-900 mb-2">Com: {user.proximoOneOnOne.com}</p>
                <p className="text-sm font-semibold text-purple-600">Em {user.proximoOneOnOne.diasFaltando} dias</p>
                <button className="btn-secondary w-full mt-4">Preparar Agenda</button>
              </div>
            )}

            <div className="card bg-gradient-to-br from-orange-50 to-yellow-50">
              <h3 className="text-lg font-bold mb-3">Suas Medalhas 🏆</h3>
              <div className="text-center py-6">
                <div className="text-5xl font-bold text-orange-600 mb-2">{user.medalhasTotal}</div>
                <p className="text-gray-600">medalhas conquistadas</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
