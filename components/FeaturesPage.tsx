import React from 'react';
import { Link } from 'react-router-dom';
import {
    Globe, Terminal, Zap, Eye, Database, Shield,
    Activity, ArrowLeft, CheckCircle
} from 'lucide-react';
import { Navbar } from './Navbar';

export const FeaturesPage = () => {
    const features = [
        {
            icon: Globe,
            title: 'Global Monitoring',
            description: 'Track devices across multiple subnets and geographical locations with unified latency reporting.',
            color: 'indigo'
        },
        {
            icon: Terminal,
            title: 'CLI Integration',
            description: 'Automate monitoring tasks with our powerful command-line interface. Perfect for DevOps workflows.',
            color: 'emerald'
        },
        {
            icon: Zap,
            title: 'Real-Time Alerts',
            description: 'Instant notifications via dashboard, email, or webhook when network anomalies are detected.',
            color: 'amber'
        },
        {
            icon: Eye,
            title: 'Visual Analytics',
            description: 'Beautiful charts and graphs to visualize network performance trends and identify patterns.',
            color: 'violet'
        },
        {
            icon: Database,
            title: 'Historical Logs',
            description: 'Complete audit trail of all network events with searchable logs and export capabilities.',
            color: 'rose'
        },
        {
            icon: Shield,
            title: 'Fault Detection',
            description: 'Advanced algorithms detect connectivity issues, high latency, and potential failures before they impact users.',
            color: 'cyan'
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            {/* Header */}
            <div className="border-b border-white/10 bg-zinc-950/50 backdrop-blur-md pt-28">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Powerful Features for <span className="text-indigo-400">Network Monitoring</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-3xl">
                        Everything you need to maintain complete visibility and control over your network infrastructure.
                    </p>
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const colorClasses = {
                            indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', text: 'text-indigo-400' },
                            emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
                            amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400' },
                            violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-400' },
                            rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400' },
                            cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400' }
                        };
                        const colors = colorClasses[feature.color as keyof typeof colorClasses];

                        return (
                            <div
                                key={index}
                                className="group p-8 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-all duration-300 hover:bg-zinc-900/60"
                            >
                                <div className={`w-14 h-14 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className={`w-7 h-7 ${colors.text}`} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Additional Features */}
                <div className="mt-20 p-10 rounded-3xl bg-gradient-to-br from-indigo-900/20 to-violet-900/20 border border-indigo-500/20">
                    <h2 className="text-3xl font-bold mb-8 text-center">Why Choose NetGuard?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            'ICMP ping-based monitoring',
                            'Cross-platform support (Windows/Linux)',
                            'SQLite database for persistence',
                            'RESTful API for integrations',
                            'Background monitoring scheduler',
                            'Customizable alert thresholds',
                            'Device grouping and tagging',
                            'Export reports to CSV/PDF'
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                <span className="text-zinc-300">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors"
                    >
                        <Activity className="w-5 h-5" />
                        Try the Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};
