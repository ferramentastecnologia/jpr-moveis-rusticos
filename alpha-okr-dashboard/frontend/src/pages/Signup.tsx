import { useState } from 'react';

interface SignupProps {
  onLogin: () => void;
  onComplete: () => void;
}

const CARGOS = [
  { value: 'estagiario', label: 'Estagiário', nivel: 'Entrada' },
  { value: 'junior', label: 'Júnior', nivel: 'Júnior' },
  { value: 'pleno', label: 'Pleno', nivel: 'Pleno' },
  { value: 'senior', label: 'Sênior', nivel: 'Sênior' },
  { value: 'coordenador', label: 'Coordenador', nivel: 'Liderança' },
  { value: 'gerente', label: 'Gerente', nivel: 'Liderança' },
  { value: 'diretor', label: 'Diretor', nivel: 'Executivo' },
];

const TRILHAS = [
  { value: 'OPERACIONAL', label: 'Operacional', icon: '⚙️', color: 'blue' },
  { value: 'COMERCIAL', label: 'Comercial', icon: '💼', color: 'green' },
  { value: 'GESTAO', label: 'Gestão & Liderança', icon: '👔', color: 'purple' },
];

const DEPARTAMENTOS = [
  'Tráfego Pago',
  'Customer Success',
  'Desenvolvimento',
  'Design',
  'Marketing',
  'Vendas',
  'Financeiro',
  'RH',
  'Operações',
];

export default function Signup({ onLogin, onComplete }: SignupProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    cargo: '',
    trilha: '',
    departamento: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Signup Card */}
      <div className="relative w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-2xl mb-4">
            <span className="text-5xl">🎯</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Criar Conta</h1>
          <p className="text-purple-100 text-lg">Configure seu perfil em 3 passos</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                  step >= s
                    ? 'bg-white text-purple-600 shadow-lg scale-110'
                    : 'bg-purple-400 text-purple-100'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`w-20 h-1 mx-2 rounded-full transition-all ${
                    step > s ? 'bg-white' : 'bg-purple-400'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-24 text-white text-sm font-semibold">
            <span className={step === 1 ? 'opacity-100' : 'opacity-50'}>Dados</span>
            <span className={step === 2 ? 'opacity-100' : 'opacity-50'}>Cargo</span>
            <span className={step === 3 ? 'opacity-100' : 'opacity-50'}>Trilha</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Dados Básicos */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Informações Básicas</h2>
                  <p className="text-gray-600">Preencha seus dados pessoais</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                    placeholder="João Silva"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail Corporativo</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                    placeholder="joao@alpha.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Senha</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                    placeholder="Mínimo 8 caracteres"
                    required
                    minLength={8}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Cargo e Departamento */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Cargo e Departamento</h2>
                  <p className="text-gray-600">Selecione sua posição na empresa</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Cargo</label>
                  <div className="grid grid-cols-2 gap-3">
                    {CARGOS.map((cargo) => (
                      <button
                        key={cargo.value}
                        type="button"
                        onClick={() => setFormData({...formData, cargo: cargo.value})}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          formData.cargo === cargo.value
                            ? 'border-purple-500 bg-purple-50 shadow-md'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="font-bold text-gray-900">{cargo.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{cargo.nivel}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Departamento</label>
                  <select
                    value={formData.departamento}
                    onChange={(e) => setFormData({...formData, departamento: e.target.value})}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                    required
                  >
                    <option value="">Selecione um departamento</option>
                    {DEPARTAMENTOS.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Trilha */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Escolha sua Trilha</h2>
                  <p className="text-gray-600">Selecione a trilha de carreira que mais se alinha com seu perfil</p>
                </div>

                <div className="space-y-4">
                  {TRILHAS.map((trilha) => (
                    <button
                      key={trilha.value}
                      type="button"
                      onClick={() => setFormData({...formData, trilha: trilha.value})}
                      className={`w-full p-6 rounded-xl border-2 text-left transition-all ${
                        formData.trilha === trilha.value
                          ? `border-${trilha.color}-500 bg-${trilha.color}-50 shadow-lg scale-105`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{trilha.icon}</div>
                        <div className="flex-1">
                          <div className="font-bold text-lg text-gray-900">{trilha.label}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            {trilha.value === 'OPERACIONAL' && 'Foco em eficiência, processos e excelência técnica'}
                            {trilha.value === 'COMERCIAL' && 'Foco em vendas, relacionamento e crescimento de negócios'}
                            {trilha.value === 'GESTAO' && 'Foco em liderança, estratégia e desenvolvimento de pessoas'}
                          </div>
                        </div>
                        {formData.trilha === trilha.value && (
                          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="mt-8 flex space-x-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Voltar
                </button>
              )}
              <button
                type="submit"
                disabled={
                  (step === 1 && (!formData.nome || !formData.email || !formData.password)) ||
                  (step === 2 && (!formData.cargo || !formData.departamento)) ||
                  (step === 3 && !formData.trilha)
                }
                className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all shadow-lg"
              >
                {step === 3 ? 'Criar Conta' : 'Continuar'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Já tem uma conta?{' '}
              <button
                onClick={onLogin}
                className="font-bold text-purple-600 hover:text-purple-700"
              >
                Fazer login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
