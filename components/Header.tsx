
import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Page, AppContextType } from '../types';

const NavButton: React.FC<{ targetPage: Page, children: React.ReactNode }> = ({ targetPage, children }) => {
    const context = useContext(AppContext);
    if (!context) return null;

    const { page, setPage } = context;
    const isActive = page === targetPage;

    const baseClasses = "px-4 py-2 rounded-md text-sm sm:text-base font-semibold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";
    const activeClasses = "bg-indigo-600 text-white shadow-lg scale-105";
    const inactiveClasses = "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white";

    return (
        <button onClick={() => setPage(targetPage)} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
            {children}
        </button>
    );
};


const Header: React.FC = () => {
    return (
        <header className="bg-slate-800 p-4 rounded-xl shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="flex items-center mb-4 sm:mb-0">
                    <span className="text-3xl mr-2">🎾</span>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Tennisdex</h1>
                </div>
                <nav className="flex space-x-2 sm:space-x-4">
                    <NavButton targetPage="tenistometro">Tenistômetro</NavButton>
                    <NavButton targetPage="t_simples">T. Simples</NavButton>
                    <NavButton targetPage="powercards">Power Cards</NavButton>
                    <NavButton targetPage="duelo">Duelo</NavButton>
                </nav>
            </div>
        </header>
    );
};

export default Header;