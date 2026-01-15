import React from 'react';
import { Link } from 'react-router-dom';
import {
    Radar, Cpu, Bell, ArrowLeft, ArrowRight
} from 'lucide-react';
import { Navbar } from './Navbar';

export const HowItWorksPage = () => {
    const steps = [
        {
            number: '01',
            title: 'Network Scanning',
            description: 'NetGuard continuously sends ICMP ping requests to all monitored devices every 5 seconds. This lightweight protocol checks device availability and measures round-trip latency.',
            icon: Radar,
            color: 'indigo',
            details: [
                'ICMP echo requests via system ping command',
                'Cross-platform support (Windows/Linux)',
                'Configurable scan intervals',
                'Subnet-wide discovery'
            ]
        },
        {
            number: '02',
            title: 'Real-Time Analysis',
            description: 'Collected metrics are processed instantly. Our analysis engine compares current performance against historical baselines to detect anomalies and predict potential failures.',
            icon: Cpu,
            color: 'emerald',
            details: [
                'Latency threshold detection (>150ms = slow)',
                'Connectivity failure identification',
                'Historical trend analysis',
                'Anomaly detection algorithms'
            ]
        },
        {
            number: '03',
            title: 'Instant Alerts',
            description: 'When a fault is detected, administrators are notified immediately through the dashboard. Alerts are logged in the database for historical tracking and compliance.',
            icon: Bell,
            color: 'amber',
            details: [
                'Real-time dashboard notifications',
                'Persistent alert storage',
                'Fault categorization (connectivity/latency)',
                'Recovery detection and logging'
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            {/* Header */}
            <div className="border-b border-white/10 bg-zinc-950/50 backdrop-blur-md pt-28">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        How NetGuard <span className="text-indigo-400">Works</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-3xl">
                        A simple, three-step process that keeps your network infrastructure monitored 24/7.
                    </p>
                </div>
            </div>

            {/* Process Flow */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="space-y-16">
                    {steps.map((step, index) => {
                        // Map colors to actual Tailwind classes
                        const colorClasses = {
                            indigo: {
                                badge: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
                                arrow: 'text-indigo-400',
                                bgGradient: 'from-indigo-900/20',
                                border: 'border-indigo-500/20',
                                icon: 'text-indigo-400',
                                number: 'text-indigo-500/10'
                            },
                            emerald: {
                                badge: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
                                arrow: 'text-emerald-400',
                                bgGradient: 'from-emerald-900/20',
                                border: 'border-emerald-500/20',
                                icon: 'text-emerald-400',
                                number: 'text-emerald-500/10'
                            },
                            amber: {
                                badge: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
                                arrow: 'text-amber-400',
                                bgGradient: 'from-amber-900/20',
                                border: 'border-amber-500/20',
                                icon: 'text-amber-400',
                                number: 'text-amber-500/10'
                            }
                        };
                        const colors = colorClasses[step.color as keyof typeof colorClasses];

                        return (
                            <div key={index} className="relative">
                                {/* Connector Line */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute left-1/2 top-full h-16 w-px bg-gradient-to-b from-white/20 to-transparent -translate-x-1/2" />
                                )}

                                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                    {/* Content */}
                                    <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                                        <div className={`inline-block px-4 py-1 rounded-full ${colors.badge} text-sm font-bold mb-4`}>
                                            STEP {step.number}
                                        </div>
                                        <h2 className="text-3xl font-bold mb-4">{step.title}</h2>
                                        <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                                            {step.description}
                                        </p>
                                        <ul className="space-y-3">
                                            {step.details.map((detail, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <ArrowRight className={`w-5 h-5 ${colors.arrow} flex-shrink-0 mt-0.5`} />
                                                    <span className="text-zinc-300">{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Visual */}
                                    <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                                        <div className={`relative p-12 rounded-3xl bg-gradient-to-br ${colors.bgGradient} to-transparent border ${colors.border}`}>
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" />
                                            <step.icon className={`w-32 h-32 ${colors.icon} mx-auto relative z-10`} />
                                            <div className={`absolute top-4 right-4 text-8xl font-bold ${colors.number}`}>
                                                {step.number}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Technical Architecture */}
                <div className="mt-24 p-10 rounded-3xl bg-zinc-900/40 border border-white/5">
                    <h2 className="text-3xl font-bold mb-8 text-center">Technical Architecture</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-indigo-400">FE</span>
                            </div>
                            <h3 className="font-bold mb-2">Frontend</h3>
                            <p className="text-sm text-zinc-400">React + TypeScript + Vite</p>
                            <p className="text-xs text-zinc-500 mt-2">Real-time dashboard with live updates</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-emerald-400">BE</span>
                            </div>
                            <h3 className="font-bold mb-2">Backend</h3>
                            <p className="text-sm text-zinc-400">Python + Flask</p>
                            <p className="text-xs text-zinc-500 mt-2">RESTful API with background monitoring</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-violet-400">DB</span>
                            </div>
                            <h3 className="font-bold mb-2">Database</h3>
                            <p className="text-sm text-zinc-400">SQLite</p>
                            <p className="text-xs text-zinc-500 mt-2">Persistent storage for devices & alerts</p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors"
                    >
                        See It In Action
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
};
