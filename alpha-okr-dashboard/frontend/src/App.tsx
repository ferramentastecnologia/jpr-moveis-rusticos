import { useState } from 'react';
import Login from './pages/Login';
import StarkenLogo from './components/StarkenLogo';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLogin = (email: string, password: string) => {
    // Login simplificado - aceita qualquer email/senha por enquanto
    setUserName(email.split('@')[0]);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <Login
        onLogin={handleLogin}
        onSignup={() => {}}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <StarkenLogo size="md" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-starken-600 to-accent-600 bg-clip-text text-transparent">Starken OKR</h1>
                <p className="text-xs text-gray-500 font-medium">Gastronomia & Performance</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center space-x-3 bg-gray-100 rounded-full pl-1 pr-4 py-1">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{userName}</p>
                    <p className="text-xs text-gray-500">Colaborador</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-semibold"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-starken-600 via-primary-700 to-accent-600 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Olá, {userName}! 🍴</h2>
            <p className="text-lg opacity-90">Seu restaurante está 15% acima da média do setor este trimestre. Continue cozinhando o sucesso!</p>
            <div className="flex gap-4 mt-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                <p className="text-sm opacity-80">Próxima Revisão</p>
                <p className="text-xl font-bold">15 dias</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                <p className="text-sm opacity-80">Ciclo Atual</p>
                <p className="text-xl font-bold">Q1 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary-500 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Receita Mensal</p>
                <h3 className="text-4xl font-bold text-gray-900">R$ 145k</h3>
              </div>
              <div className="bg-primary-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-green-600 font-semibold">↑ +18%</span>
              <span className="text-gray-400 ml-2">vs mês anterior</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Satisfação Cliente</p>
                <h3 className="text-4xl font-bold text-green-600">4.8⭐</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-green-600 font-semibold">327 avaliações</span>
              <span className="text-gray-400 ml-2">este mês</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent-500 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Ticket Médio</p>
                <h3 className="text-4xl font-bold text-accent-600">R$ 87</h3>
              </div>
              <div className="bg-accent-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-green-600 font-semibold">↑ +12%</span>
              <span className="text-gray-400 ml-2">vs trimestre</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-starken-400 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Mesa/Rotatividade</p>
                <h3 className="text-4xl font-bold text-starken-600">3.2x</h3>
              </div>
              <div className="bg-starken-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-starken-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-starken-600 font-semibold">🏆 Acima meta</span>
              <span className="text-gray-400 ml-2">3.0x/dia</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* OKRs Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Meus OKRs - Q1 2025</h3>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold text-sm">
                + Novo OKR
              </button>
            </div>

            <div className="space-y-4">
              {/* OKR 1 */}
              <div className="border-2 border-gray-100 rounded-xl p-5 hover:border-primary-200 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">OBJETIVO</span>
                      <span className="text-xs text-gray-500">Vence em 45 dias</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Aumentar receita em 25% no Q1</h4>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">85%</div>
                    <div className="text-xs text-gray-500">No prazo</div>
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">Aumentar ticket médio para R$ 90</p>
                    </div>
                    <span className="text-sm font-bold text-green-600">100%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-5 h-5 rounded-full border-2 border-yellow-500 flex items-center justify-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      </div>
                      <p className="text-sm text-gray-700">Lançar 3 novos pratos especiais</p>
                    </div>
                    <span className="text-sm font-bold text-yellow-600">80%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-5 h-5 rounded-full border-2 border-yellow-500 flex items-center justify-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      </div>
                      <p className="text-sm text-gray-700">Crescer base de clientes fidelizados em 40%</p>
                    </div>
                    <span className="text-sm font-bold text-yellow-600">75%</span>
                  </div>
                </div>
              </div>

              {/* OKR 2 */}
              <div className="border-2 border-gray-100 rounded-xl p-5 hover:border-primary-200 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">OBJETIVO</span>
                      <span className="text-xs text-gray-500">Vence em 60 dias</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Melhorar experiência do cliente</h4>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-600">72%</div>
                    <div className="text-xs text-gray-500">Em andamento</div>
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">Reduzir tempo de espera para 15min</p>
                    </div>
                    <span className="text-sm font-bold text-green-600">100%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-5 h-5 rounded-full border-2 border-yellow-500 flex items-center justify-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      </div>
                      <p className="text-sm text-gray-700">Atingir 4.8 estrelas no Google</p>
                    </div>
                    <span className="text-sm font-bold text-yellow-600">85%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-5 h-5 rounded-full border-2 border-yellow-500 flex items-center justify-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      </div>
                      <p className="text-sm text-gray-700">Implementar programa de fidelidade</p>
                    </div>
                    <span className="text-sm font-bold text-yellow-600">45%</span>
                  </div>
                </div>
              </div>

              {/* OKR 3 */}
              <div className="border-2 border-gray-100 rounded-xl p-5 hover:border-primary-200 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">OBJETIVO</span>
                      <span className="text-xs text-green-600 font-semibold">✓ Concluído</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Otimizar operação da cozinha</h4>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">100%</div>
                    <div className="text-xs text-gray-500">Finalizado</div>
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">Reduzir desperdício de alimentos em 35%</p>
                    </div>
                    <span className="text-sm font-bold text-green-600">100%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">Diminuir tempo preparo de pedidos para 18min</p>
                    </div>
                    <span className="text-sm font-bold text-green-600">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* PDI Progress */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Plano de Desenvolvimento</h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">Habilidades Técnicas</span>
                    <span className="text-sm font-bold text-blue-600">80%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '80%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">Soft Skills</span>
                    <span className="text-sm font-bold text-purple-600">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">Certificações</span>
                    <span className="text-sm font-bold text-green-600">90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '90%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">Idiomas</span>
                    <span className="text-sm font-bold text-orange-600">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold text-sm">
                Ver Detalhes
              </button>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Atividades Recentes</h3>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">OKR concluído</p>
                    <p className="text-xs text-gray-500">Melhorar qualidade das entregas</p>
                    <p className="text-xs text-gray-400 mt-1">Há 2 dias</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Nova medalha conquistada</p>
                    <p className="text-xs text-gray-500">🏆 Mestre em Automação</p>
                    <p className="text-xs text-gray-400 mt-1">Há 3 dias</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">PDI atualizado</p>
                    <p className="text-xs text-gray-500">Certificação AWS concluída</p>
                    <p className="text-xs text-gray-400 mt-1">Há 5 dias</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Feedback recebido</p>
                    <p className="text-xs text-gray-500">Avaliação trimestral disponível</p>
                    <p className="text-xs text-gray-400 mt-1">Há 1 semana</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-xl p-6 border-2 border-primary-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Ações Rápidas</h3>

              <div className="space-y-2">
                <button className="w-full px-4 py-3 bg-white text-gray-700 rounded-lg hover:shadow-md font-semibold text-sm flex items-center justify-between transition-shadow">
                  <span>📝 Criar OKR</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button className="w-full px-4 py-3 bg-white text-gray-700 rounded-lg hover:shadow-md font-semibold text-sm flex items-center justify-between transition-shadow">
                  <span>📊 Ver Relatórios</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button className="w-full px-4 py-3 bg-white text-gray-700 rounded-lg hover:shadow-md font-semibold text-sm flex items-center justify-between transition-shadow">
                  <span>💬 Solicitar Feedback</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-900">Performance Mensal</h4>
              <span className="text-2xl">📈</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Janeiro</span>
                <span className="text-sm font-bold text-green-600">+12%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Fevereiro</span>
                <span className="text-sm font-bold text-green-600">+18%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Março</span>
                <span className="text-sm font-bold text-blue-600">Meta atual</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-900">Ranking da Equipe</h4>
              <span className="text-2xl">🏆</span>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary-600 mb-2">3°</div>
              <p className="text-sm text-gray-600">de 24 colaboradores</p>
              <div className="mt-4 flex justify-center gap-2">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">Top 15%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-900">Próximos Marcos</h4>
              <span className="text-2xl">🎯</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
                  15
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Revisão de OKRs</p>
                  <p className="text-xs text-gray-500">Mar 2025</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold text-sm">
                  30
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Fim do Q1</p>
                  <p className="text-xs text-gray-500">Mar 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
