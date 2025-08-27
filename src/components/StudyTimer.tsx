import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, RotateCcw, Clock, Target } from 'lucide-react';

export function StudyTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }, 1000);
    } else if (isActive && minutes === 0 && seconds === 0) {
     
      setIsActive(false);
      if (!isBreak) {
        setSessions(sessions + 1);
        
        setIsBreak(true);
        setMinutes(5);
        setSeconds(0);
      } else {
        
        setIsBreak(false);
        setMinutes(25);
        setSeconds(0);
      }
      
      
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(
          isBreak ? 'Pausa terminada!' : 'Sessão de estudo concluída!', 
          {
            body: isBreak ? 'Hora de voltar aos estudos!' : 'Hora de fazer uma pausa!',
            icon: '/favicon.ico'
          }
        );
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds, isBreak, sessions]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Timer de Estudo
        </h1>
        <p className="text-gray-600">
          Use a técnica Pomodoro para maximizar sua produtividade
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="text-center">
          <div className="mb-6">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              isBreak 
                ? 'bg-green-100 text-green-700' 
                : 'bg-blue-100 text-blue-700'
            }`}>
              <Clock className="w-4 h-4" />
              {isBreak ? 'Tempo de Pausa' : 'Sessão de Estudo'}
            </div>
          </div>

          <div className="mb-8">
            <div className="text-6xl md:text-8xl font-mono font-bold text-gray-900 mb-4">
              {formatTime(minutes, seconds)}
            </div>
            
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={toggleTimer}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {isActive ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-1" />
                )}
              </button>
              
              <button
                onClick={resetTimer}
                className="w-16 h-16 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors shadow-lg hover:shadow-xl"
              >
                <RotateCcw className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {sessions}
              </div>
              <div className="text-sm text-blue-600 font-medium">
                Sessões Completas
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {sessions * 25}
              </div>
              <div className="text-sm text-green-600 font-medium">
                Minutos Estudados
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {Math.floor(sessions / 4)}
              </div>
              <div className="text-sm text-purple-600 font-medium">
                Ciclos Completos
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          Como funciona o Pomodoro
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Técnica Pomodoro</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 25 minutos de estudo focado</li>
              <li>• 5 minutos de pausa</li>
              <li>• Após 4 ciclos, pausa longa (15-30 min)</li>
              <li>• Elimine distrações durante o estudo</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Dicas</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Defina objetivos claros antes de começar</li>
              <li>• Use as pausas para descansar os olhos</li>
              <li>• Mantenha água por perto</li>
              <li>• Celebre cada sessão concluída</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            💡 <strong>Dica:</strong> {' '}
            <button 
              onClick={requestNotificationPermission}
              className="underline hover:no-underline"
            >
              Clique aqui para ativar notificações
            </button>
            {' '}e receba alertas quando cada sessão terminar.
          </p>
        </div>
      </div>
    </div>
  );
}