import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, GraduationCap, CreditCard, 
  Settings, Bell, Search, TrendingUp, CheckCircle2, Loader2, AlertCircle 
} from 'lucide-react';

// --- TYPES ---
interface Transaction {
  id: number;
  title: string;
  date: string;
  amount: number;
  status: string;
  receipt_no: string;
}

interface PaymentData {
  tuition_schedule: {
    paid_total: number;
    net_obligation: number;
  };
  transactions: Transaction[];
}

// --- FALLBACK DATA (If Python server is off) ---
const FALLBACK_DATA: PaymentData = {
  tuition_schedule: {
    paid_total: 10650.00,
    net_obligation: 13100.00,
  },
  transactions: [
    { id: 1, title: 'Spring Term Installment', date: 'Apr 01, 2025', amount: 2450.00, status: 'Settled', receipt_no: 'DA-9821' },
    { id: 2, title: 'Cafeteria Top-up Auto-Refill', date: 'Mar 28, 2025', amount: 50.00, status: 'Settled', receipt_no: 'DA-9819' },
    { id: 3, title: 'Robotics National Travel Fee', date: 'Mar 15, 2025', amount: 185.00, status: 'Pending', receipt_no: 'DA-9780' },
  ]
};

const MENU_ITEMS = [
  { name: 'Overview', icon: LayoutDashboard },
  { name: 'Students & Families', icon: Users },
  { name: 'Faculty Directory', icon: GraduationCap },
  { name: 'Tuition Ledger', icon: CreditCard },
  { name: 'System Settings', icon: Settings },
];

export default function App() {
  const [activeMenu, setActiveMenu] = useState('Overview');
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  // --- SMART FETCHING SYSTEM ---
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/payments')
      .then((res) => {
        if (!res.ok) throw new Error("API not ready");
        return res.json();
      })
      .then((data: PaymentData) => {
        setPaymentData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        // If Python is off, catch the error and load Fallback Data!
        console.warn("Backend offline. Loading offline portfolio data.", error);
        setPaymentData(FALLBACK_DATA);
        setIsOffline(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-brand-900 text-white flex flex-col hidden md:flex">
        <div className="p-6">
          <h1 className="text-2xl font-black tracking-tight text-gold-500">Dream Academy</h1>
          <p className="text-xs text-brand-100 mt-1 opacity-70">Admin Portal v3.1</p>
        </div>
        
        <nav className="flex-1 px-4 mt-6 space-y-2">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveMenu(item.name)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-brand-800 text-white shadow-lg border border-brand-800' 
                    : 'text-gray-400 hover:bg-brand-800/50 hover:text-white'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-gold-500' : ''} />
                <span className="font-semibold text-sm">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search database..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-transparent rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-900/20"
            />
          </div>
          
          <div className="flex items-center space-x-6">
            <button className="relative text-gray-400 hover:text-brand-900">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-brand-100 border border-brand-900 flex items-center justify-center text-brand-900 font-bold">
              AS
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="flex-1 overflow-auto p-8">
          
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-black text-brand-900">Institution Overview</h2>
              {isOffline ? (
                <p className="text-orange-500 mt-1 font-bold flex items-center">
                  <AlertCircle size={16} className="mr-1"/> Offline Mode: Showing local portfolio data
                </p>
              ) : (
                <p className="text-green-600 mt-1 font-bold flex items-center">
                  <CheckCircle2 size={16} className="mr-1"/> Live Mode: Connected to Python Server
                </p>
              )}
            </div>
          </div>

          {/* LOADING STATE */}
          {isLoading || !paymentData ? (
            <div className="flex flex-col items-center justify-center h-64 text-brand-900">
              <Loader2 size={40} className="animate-spin mb-4" />
              <p className="font-bold text-lg">Initializing System...</p>
            </div>
          ) : (
            <>
              {/* DYNAMIC STATS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-sm font-bold text-gray-400 uppercase">Total Tuition Collected</p>
                  <h3 className="text-4xl font-black text-brand-900 mt-2">
                    ${paymentData.tuition_schedule.paid_total.toLocaleString(undefined, {minimumFractionDigits: 2})}
                  </h3>
                  <div className="flex items-center mt-4 text-sm font-bold text-green-600">
                    <TrendingUp size={16} className="mr-1" /> Revenue up 4%
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-sm font-bold text-gray-400 uppercase">Pending Net Obligation</p>
                  <h3 className="text-4xl font-black text-brand-900 mt-2">
                    ${paymentData.tuition_schedule.net_obligation.toLocaleString(undefined, {minimumFractionDigits: 2})}
                  </h3>
                  <div className="flex items-center mt-4 text-sm font-bold text-gray-500">
                    Total expected for 2024-2025
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-sm font-bold text-gray-400 uppercase">Recent Transactions</p>
                  <h3 className="text-4xl font-black text-brand-900 mt-2">
                    {paymentData.transactions.length}
                  </h3>
                  <div className="flex items-center mt-4 text-sm font-bold text-brand-900">
                    Active items in ledger
                  </div>
                </div>
              </div>

              {/* DYNAMIC TABLE SECTION */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                  <h3 className="font-bold text-lg text-brand-900">Live Transaction Ledger</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white text-gray-400 text-xs uppercase tracking-wider border-b border-gray-200">
                        <th className="px-6 py-4 font-bold">Transaction Title</th>
                        <th className="px-6 py-4 font-bold">Date</th>
                        <th className="px-6 py-4 font-bold">Receipt No.</th>
                        <th className="px-6 py-4 font-bold">Amount</th>
                        <th className="px-6 py-4 font-bold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {paymentData.transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="px-6 py-4 font-bold text-gray-900">{tx.title}</td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-500">{tx.date}</td>
                          <td className="px-6 py-4 text-sm font-mono text-gray-400">{tx.receipt_no}</td>
                          <td className="px-6 py-4 font-black text-brand-900">
                            ${tx.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${
                              tx.status === 'Settled' 
                                ? 'bg-green-100 text-green-700 border border-green-200' 
                                : 'bg-orange-100 text-orange-700 border border-orange-200'
                            }`}>
                              {tx.status === 'Settled' && <CheckCircle2 size={12} className="mr-1" />}
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}