import React, { useState } from 'react';

const ATMSystem = () => {
  const [view, setView] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [report, setReport] = useState([]);

  const API_URL = 'http://localhost:8080/api';

  const login = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const user = await response.json();
        setCurrentUser(user);
        setView('atm');
        setError('');
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };

  const withdraw = async () => {
    setError('');
    setResult(null);

    const withdrawAmount = parseFloat(amount);

    if (isNaN(withdrawAmount) || withdrawAmount < 1000 || withdrawAmount > 2000000) {
      setError('El monto debe estar entre $1,000 y $2,000,000');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/withdraw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          amount: withdrawAmount
        })
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        setCurrentUser({ ...currentUser, balance: data.newBalance });
        setAmount('');
      } else {
        setError(data.message || 'Error en el retiro');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };

  const loadReport = async () => {
    try {
      const response = await fetch(`${API_URL}/report`);
      const data = await response.json();
      console.log('Datos del reporte:', data); // Para debug
      setReport(Array.isArray(data) ? data : []);
      setView('report');
      setError('');
    } catch (err) {
      console.error('Error al cargar reporte:', err);
      setError('Error al cargar el reporte');
      setReport([]);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setView('login');
    setUsername('');
    setPassword('');
    setAmount('');
    setResult(null);
    setError('');
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Login View
  if (view === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-500 p-4 rounded-full text-white text-4xl">
              👤
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Cajero Automático
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
              <span className="text-xl mr-2">⚠️</span>
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su usuario"
                onKeyPress={(e) => e.key === 'Enter' && login()}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su contraseña"
                onKeyPress={(e) => e.key === 'Enter' && login()}
              />
            </div>
            <button
              onClick={login}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Ingresar
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Usuario demo: <span className="font-semibold">usuario1</span></p>
            <p>Contraseña: <span className="font-semibold">pass123</span></p>
          </div>
        </div>
      </div>
    );
  }

  // ATM View
  if (view === 'atm') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Bienvenido, {currentUser.name}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={loadReport}
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <span className="text-lg">📊</span>
                  Reporte
                </button>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <span className="text-lg">🚪</span>
                  Salir
                </button>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-semibold text-lg">Saldo disponible:</span>
                <span className="text-3xl font-bold text-blue-600">
                  {formatCurrency(currentUser.balance)}
                </span>
              </div>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
                <span className="text-xl mr-2">⚠️</span>
                {error}
              </div>
            )}

            {result && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded mb-4">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">✅</span>
                  <span className="font-bold text-lg">Retiro exitoso</span>
                </div>
                <div className="bg-white p-4 rounded">
                  <p className="font-semibold mb-2">Billetes entregados:</p>
                  {result.bills.map((bill, idx) => (
                    <div key={idx} className="flex justify-between py-1">
                      <span>{bill.count} billete(s) de {formatCurrency(bill.denomination)}</span>
                      <span className="font-semibold">{formatCurrency(bill.count * bill.denomination)}</span>
                    </div>
                  ))}
                  <div className="border-t mt-2 pt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total retirado:</span>
                      <span>{formatCurrency(result.amount)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>Nuevo saldo:</span>
                      <span>{formatCurrency(result.newBalance)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Monto a retirar (Mín: $1,000 - Máx: $2,000,000)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400 text-xl">💵</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                    placeholder="0"
                    min="1000"
                    max="2000000"
                    step="1000"
                  />
                </div>
              </div>
              <button
                onClick={withdraw}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-colors"
              >
                Retirar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Report View
  if (view === 'report') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Reporte de Retiros</h2>
              <button
                onClick={() => setView('atm')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Volver al Cajero
              </button>
            </div>

            <div className="overflow-x-auto">
              {report.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-lg">📊 No hay datos de retiros disponibles</p>
                  <p className="text-sm mt-2">Realiza algunos retiros para ver estadísticas</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Usuario</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Total Retiros</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Máx. Exitoso</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Prom. Exitosos</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Máx. Rechazado</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Total Exitosos</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Total Rechazados</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Prom. Rechazados</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Suma Total</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Último Exitoso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{row.userName}</td>
                        <td className="px-4 py-3 text-sm text-right">{row.totalWithdrawals}</td>
                        <td className="px-4 py-3 text-sm text-right">{formatCurrency(row.maxSuccessful)}</td>
                        <td className="px-4 py-3 text-sm text-right">{formatCurrency(row.avgSuccessful)}</td>
                        <td className="px-4 py-3 text-sm text-right">{formatCurrency(row.maxRejected)}</td>
                        <td className="px-4 py-3 text-sm text-right font-semibold text-green-600">{formatCurrency(row.totalSuccessful)}</td>
                        <td className="px-4 py-3 text-sm text-right font-semibold text-red-600">{formatCurrency(row.totalRejected)}</td>
                        <td className="px-4 py-3 text-sm text-right">{formatCurrency(row.avgRejected)}</td>
                        <td className="px-4 py-3 text-sm text-right font-bold">{formatCurrency(row.totalAll)}</td>
                        <td className="px-4 py-3 text-sm">{row.lastSuccessful || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ATMSystem;