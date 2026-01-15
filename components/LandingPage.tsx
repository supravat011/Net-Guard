import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity, Zap, History, Server, ArrowRight, Globe, Terminal,
  Shield, Lock, Cpu, Eye, CheckCircle, Database
} from 'lucide-react';
import {
  LineChart, Line, ResponsiveContainer
} from 'recharts';

import { Navbar } from './Navbar';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none opacity-50" />

        <div className="max-w-4xl mx-auto text-center relative z-10">


          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Network intelligence <br /> for the modern era.
          </h1>

          <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Real-time fault detection, latency analysis, and instant alerts.
            Monitor your infrastructure with military-grade precision and a beautiful interface.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/dashboard"
              className="group relative px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium transition-all duration-200 flex items-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              Start Monitoring
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <button className="px-8 py-3.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all text-sm font-medium">
              View Documentation
            </button>
          </div>
        </div>

        {/* Hero Visual / Grid */}
        <div className="mt-20 max-w-6xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-80">
            {/* Mock Dashboard Cards for Visual */}
            <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-xl p-6 h-64 flex flex-col justify-between hover:border-white/10 transition-colors">
              <Activity className="text-indigo-500 h-8 w-8" />
              <div>
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-sm text-zinc-500">Uptime Guarantee</div>
              </div>
              <div className="h-24 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[{ v: 10 }, { v: 30 }, { v: 20 }, { v: 50 }, { v: 40 }, { v: 70 }, { v: 60 }]}>
                    <Line type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-xl p-6 h-64 md:translate-y-8 flex flex-col justify-between hover:border-white/10 transition-colors">
              <Server className="text-emerald-500 h-8 w-8" />
              <div>
                <div className="text-2xl font-bold text-white">Active</div>
                <div className="text-sm text-zinc-500">System Status</div>
              </div>
              <div className="flex gap-2 mt-4">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-1.5 flex-1 bg-emerald-500/20 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-3/4"></div></div>)}
              </div>
            </div>
            <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-xl p-6 h-64 flex flex-col justify-between hover:border-white/10 transition-colors">
              <Zap className="text-amber-500 h-8 w-8" />
              <div>
                <div className="text-2xl font-bold text-white">0ms</div>
                <div className="text-sm text-zinc-500">Latency Spike</div>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500 mt-4 font-mono">
                <span className="text-green-400">root@netguard:~$</span> ./scan
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid (Bento Box Style) */}
      <div id="features" className="py-24 px-6 border-t border-white/5 bg-zinc-950/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Everything you need to <br /><span className="text-indigo-400">maintain control.</span></h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors">
              <Globe className="h-10 w-10 text-indigo-500 mb-6" />
              <h3 className="text-xl font-semibold mb-3">Global Monitoring</h3>
              <p className="text-zinc-400 max-w-md">Track devices across multiple subnets and geographical locations with unified latency reporting.</p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors">
              <Zap className="h-10 w-10 text-amber-500 mb-6" />
              <h3 className="text-xl font-semibold mb-3">Instant Alerts</h3>
              <p className="text-zinc-400">Sub-second notification delivery for critical failures.</p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors">
              <History className="h-10 w-10 text-emerald-500 mb-6" />
              <h3 className="text-xl font-semibold mb-3">Audit Logs</h3>
              <p className="text-zinc-400">Complete historical data retention for post-incident analysis.</p>
            </div>
            <div className="md:col-span-2 p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <Terminal className="h-10 w-10 text-rose-500 mb-6" />
                <h3 className="text-xl font-semibold mb-3">Developer API</h3>
                <p className="text-zinc-400">Full access to raw metrics via our REST API for custom integrations.</p>
              </div>
              <div className="w-full md:w-1/2 bg-black rounded-lg p-4 font-mono text-xs text-zinc-500 border border-white/10">
                <div className="flex gap-1.5 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
                </div>
                <p><span className="text-purple-400">const</span> status = <span className="text-yellow-300">await</span> netguard.check();</p>
                <p><span className="text-blue-400">console</span>.log(status.latency);</p>
                <p className="text-green-400 mt-2">// Output: 24ms</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-24 px-6 border-t border-white/5 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Intelligent Workflow</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              NetGuard operates autonomously to ensure your infrastructure remains healthy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="relative text-center p-6">
              <div className="w-24 h-24 mx-auto bg-zinc-900 rounded-full border border-white/10 flex items-center justify-center mb-6 relative z-10 shadow-xl shadow-black">
                <Activity className="h-10 w-10 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Continuous Scan</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                The system probes every connected device at configurable intervals, measuring latency and packet loss with high precision.
              </p>
            </div>

            <div className="relative text-center p-6">
              <div className="w-24 h-24 mx-auto bg-zinc-900 rounded-full border border-white/10 flex items-center justify-center mb-6 relative z-10 shadow-xl shadow-black">
                <Cpu className="h-10 w-10 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Analysis Engine</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Metrics are processed in real-time. Heuristic algorithms compare current performance against historical baselines to detect anomalies.
              </p>
            </div>

            <div className="relative text-center p-6">
              <div className="w-24 h-24 mx-auto bg-zinc-900 rounded-full border border-white/10 flex items-center justify-center mb-6 relative z-10 shadow-xl shadow-black">
                <Shield className="h-10 w-10 text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Prevention & Alert</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                If a fault is imminent, admins are notified instantly via dashboard, email, or webhook, allowing for preemptive resolution.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div id="security" className="py-24 px-6 border-t border-white/5 bg-zinc-900/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400">
              <Lock className="w-3 h-3" />
              Enterprise Grade Security
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Secure by design. <br />
              <span className="text-zinc-500">Built for sensitive payloads.</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              NetGuard adheres to the strictest security standards. All data is encrypted at rest and in transit, ensuring your network topology remains confidential.
            </p>

            <ul className="space-y-4">
              {[
                "End-to-End Encryption (AES-256)",
                "Role-Based Access Control (RBAC)",
                "No external telemetry logging",
                "On-premise deployment options"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-300">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative bg-black border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-zinc-900/50 border border-white/5 text-center">
                  <Lock className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <div className="text-sm font-semibold">TLS 1.3</div>
                </div>
                <div className="p-4 rounded-lg bg-zinc-900/50 border border-white/5 text-center">
                  <Database className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
                  <div className="text-sm font-semibold">Encrypted DB</div>
                </div>
                <div className="p-4 rounded-lg bg-zinc-900/50 border border-white/5 text-center">
                  <Eye className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <div className="text-sm font-semibold">Audit Trail</div>
                </div>
                <div className="p-4 rounded-lg bg-zinc-900/50 border border-white/5 text-center">
                  <Shield className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                  <div className="text-sm font-semibold">Firewall</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-24 px-6 border-t border-white/5 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Designed for every scale.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 aspect-[4/5] md:aspect-auto md:h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&q=80&w=800"
                alt="Data Center"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold mb-2">Data Centers</h3>
                <p className="text-zinc-400 text-sm">Monitor thousands of server racks with heatmaps and rack-level precision.</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-white/10 aspect-[4/5] md:aspect-auto md:h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
                alt="ISP"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold mb-2">ISPs & Telecom</h3>
                <p className="text-zinc-400 text-sm">Track regional outages and backbone latency in real-time.</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-white/10 aspect-[4/5] md:aspect-auto md:h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
                alt="Enterprise"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold mb-2">Enterprise Office</h3>
                <p className="text-zinc-400 text-sm">Ensure WiFi and LAN stability for seamless business operations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-6 border-t border-white/5 bg-gradient-to-b from-zinc-900/50 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to upgrade your visibility?</h2>
          <p className="text-zinc-400 text-lg mb-10">Join thousands of network admins who sleep better at night.</p>
          <Link
            to="/dashboard"
            className="inline-flex px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10"
          >
            Get Started Now
          </Link>
        </div>
      </div>

      <footer className="border-t border-white/5 py-20 bg-black text-sm">
        <div className="w-full px-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight mb-6">
              <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              NetGuard
            </div>
            <p className="text-zinc-500 max-w-xs mb-6">
              Empowering network teams with clarity, speed, and precision. Built for the modern distributed web.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-zinc-900 border border-white/10 hover:border-white/20 transition-colors"><Globe className="w-4 h-4 text-zinc-400" /></a>
              <a href="#" className="p-2 rounded-full bg-zinc-900 border border-white/10 hover:border-white/20 transition-colors"><Terminal className="w-4 h-4 text-zinc-400" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Product</h4>
            <ul className="space-y-3 text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-3 text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-3 text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="w-full px-12 mt-20 pt-8 border-t border-white/5 text-center text-zinc-600">
          <p>&copy; {new Date().getFullYear()} NetGuard Project. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
