import { useState } from 'react';
import StarkenLogo from '../components/StarkenLogo';
import logoAlpha from '../assets/logo-alpha.png';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onSignup: () => void;
  error?: string;
}

export default function Login({ onLogin, onSignup, error }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-6 mb-6 transform hover:scale-105 transition-transform">
            <StarkenLogo size="xl" className="drop-shadow-2xl" />
            <div className="h-20 w-px bg-white/30"></div>
            <img src={logoAlpha} alt="Alpha Logo" className="h-20 w-auto drop-shadow-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">Starken Tecnologia Ltda</h1>
          <h2 className="text-2xl font-semibold text-white/95 mb-4 drop-shadow-lg">Assessoria Alpha</h2>
          <p className="text-white/90 text-lg font-medium">Gestão de OKRs</p>
          <p className="text-white/80 text-base mt-2">Sistema completo para definição e acompanhamento de Objetivos e Resultados-Chave</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-lg">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo de volta!</h2>
            <p className="text-gray-600">Entre para acessar seus OKRs</p>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-800 text-sm font-semibold flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700 font-medium">Lembrar de mim</span>
              </label>
              <a href="#" className="text-sm font-semibold text-blue-700 hover:text-blue-800 underline">
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl"
            >
              Entrar
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-700 font-medium">
              Ainda não tem uma conta?{' '}
              <button
                onClick={onSignup}
                className="font-bold text-blue-700 hover:text-blue-800 underline"
              >
                Criar conta
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-white/90 text-sm">
          <p className="font-medium">© 2025 Starken Tecnologia Ltda - Assessoria Alpha</p>
          <p className="text-white/70 mt-1">Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}
