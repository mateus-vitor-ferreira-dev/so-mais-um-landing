import { Mail, GitBranch, AtSign } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-white/10 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <span className="text-2xl">⚽</span>
              <span>
                Fut<span className="text-green-400">Match</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              A plataforma que conecta jogadores, espaços e peladas. Do racha da várzea ao torneio organizado.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Plataforma</h4>
            <ul className="space-y-3">
              {[
                { label: 'Começar grátis', href: 'https://futmatch-web.vercel.app/register' },
                { label: 'Entrar na conta', href: 'https://futmatch-web.vercel.app/login' },
                { label: 'Funcionalidades', href: '#features' },
                { label: 'Como funciona', href: '#how-it-works' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-green-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:mateus.ferreira10profissional@gmail.com"
                  className="flex items-center gap-2 text-gray-500 hover:text-green-400 text-sm transition-colors"
                >
                  <Mail size={15} />
                  mateus.ferreira10profissional@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-green-400 text-sm transition-colors"
                >
                  <AtSign size={15} />
                  @futmatch_app
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/mateus-vitor-ferreira-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-green-400 text-sm transition-colors"
                >
                  <GitBranch size={15} />
                  github.com/futmatch
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} FutMatch. Todos os direitos reservados.
          </p>
          <p className="text-gray-700 text-xs">
            Feito com ⚽ e ☕ para quem ama jogar
          </p>
        </div>
      </div>
    </footer>
  )
}
