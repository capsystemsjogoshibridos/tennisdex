import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Page, AppContextType } from '../types';

const NavButton: React.FC<{ targetPage: Page, children: React.ReactNode }> = ({ targetPage, children }) => {
    const context = useContext(AppContext);
    if (!context) return null;

    const { page, setPage } = context;
    const isActive = page === targetPage;

    const baseClasses = "w-full text-center px-4 py-2 rounded-md text-sm sm:text-base font-semibold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center justify-center gap-2";
    const activeClasses = "bg-indigo-600 text-white shadow-lg scale-105";
    const inactiveClasses = "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white";

    return (
        <button onClick={() => setPage(targetPage)} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
            {children}
        </button>
    );
};


const Header: React.FC = () => {
    const context = useContext(AppContext);
    if (!context) return null;
    const { resetGame, shareReport } = context;
    
    const actionButtonClasses = "w-full flex items-center justify-center text-center px-4 py-2 rounded-md text-sm sm:text-base font-semibold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 hover:scale-105";
    const inactiveButtonClasses = "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white";

    return (
        <header className="bg-slate-800 p-4 rounded-xl shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="flex flex-col items-center sm:items-start mb-4 sm:mb-0">
                    <img src="https://images2.imgbox.com/0e/06/ddM7tEiZ_o.png" alt="Fox Tennis Logo" className="w-60 h-auto mb-2"/>
                    <div className="text-center sm:text-left">
                        <p className="text-sm font-semibold text-orange-400">Fox Tennis</p>
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            Tennisdex <span className="text-base font-normal align-middle">V.1.1</span>
                        </h1>
                        <p className="text-xs text-slate-400">Criado por Christopher de Assis Pereira</p>
                        <p className="text-xs text-slate-400 font-semibold">CAP Systems Jogos Híbridos</p>
                    </div>
                </div>
                <nav className="grid grid-cols-2 gap-2 sm:gap-3 w-full sm:w-auto sm:max-w-lg">
                    <NavButton targetPage="tenistometro">📊 Tenistômetro (Full)</NavButton>
                    <NavButton targetPage="t_simples">📈 Tenistômetro (Clean)</NavButton>
                    <NavButton targetPage="powercards">🃏 Deck</NavButton>
                    <NavButton targetPage="album">📚 Álbum</NavButton>
                    <NavButton targetPage="relatorio">📄 Relatório</NavButton>
                    <NavButton targetPage="duelo">⚔️ Duelo</NavButton>
                     <button onClick={shareReport} className={`${actionButtonClasses} ${inactiveButtonClasses}`}>
                        Compartilhar <span className="ml-2">📤</span>
                    </button>
                    <button onClick={resetGame} className={`${actionButtonClasses} ${inactiveButtonClasses}`}>
                        Resetar <span className="ml-2">🔄</span>
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;