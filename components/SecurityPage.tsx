import React from 'react';
import { Link } from 'react-router-dom';
import {
    Lock, Shield, Key, Eye, Database, Server,
    ArrowLeft, CheckCircle, AlertTriangle
} from 'lucide-react';
import { Navbar } from './Navbar';

export const SecurityPage = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            {/* Header */}
            <div className="border-b border-white/10 bg-zinc-950/50 backdrop-blur-md pt-28">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400 mb-6">
                        <Lock className="w-3 h-3" />
                        Enterprise Grade Security
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Security <span className="text-emerald-400">First</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-3xl">
                        Built with security at its core. NetGuard adheres to industry-leading standards to protect your network data.
                    </p>
                </div>
            </div>

            {/* Security Features */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {/* Left Column */}
                    <div className="space-y-8">
                        <div className="p-8 rounded-2xl bg-zinc-900/40 border border-white/5">
                            <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                                <Lock className="w-7 h-7 text-emerald-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">End-to-End Encryption</h3>
                            <p className="text-zinc-400 leading-relaxed mb-4">
                                All data transmitted between your devices and NetGuard servers is encrypted using AES-256 encryption,
                                the same standard used by banks and government agencies.
                            </p>
                            <ul className="space-y-2">
                                {['TLS 1.3 for data in transit', 'AES-256 for data at rest', 'Perfect forward secrecy'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-zinc-500">
                                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-8 rounded-2xl bg-zinc-900/40 border border-white/5">
                            <div className="w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
                                <Key className="w-7 h-7 text-indigo-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Role-Based Access Control</h3>
                            <p className="text-zinc-400 leading-relaxed mb-4">
                                Granular permissions system ensures that team members only have access to the data and features they need.
                            </p>
                            <ul className="space-y-2">
                                {['Admin, Operator, Viewer roles', 'Custom permission sets', 'Audit logs for all actions'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-zinc-500">
                                        <CheckCircle className="w-4 h-4 text-indigo-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        <div className="p-8 rounded-2xl bg-zinc-900/40 border border-white/5">
                            <div className="w-14 h-14 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6">
                                <Eye className="w-7 h-7 text-violet-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Privacy by Design</h3>
                            <p className="text-zinc-400 leading-relaxed mb-4">
                                We don't collect or transmit any telemetry data. Your network topology and monitoring data stays on your infrastructure.
                            </p>
                            <ul className="space-y-2">
                                {['No external telemetry', 'Local data storage', 'GDPR compliant'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-zinc-500">
                                        <CheckCircle className="w-4 h-4 text-violet-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-8 rounded-2xl bg-zinc-900/40 border border-white/5">
                            <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
                                <Database className="w-7 h-7 text-amber-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Secure Database</h3>
                            <p className="text-zinc-400 leading-relaxed mb-4">
                                SQLite database with encrypted storage ensures your historical monitoring data is protected at rest.
                            </p>
                            <ul className="space-y-2">
                                {['Encrypted database files', 'Automatic backups', 'Secure credential storage'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-zinc-500">
                                        <CheckCircle className="w-4 h-4 text-amber-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Compliance */}
                <div className="p-10 rounded-3xl bg-gradient-to-br from-emerald-900/20 to-cyan-900/20 border border-emerald-500/20">
                    <h2 className="text-3xl font-bold mb-8 text-center">Security Standards & Compliance</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                            <h3 className="font-bold mb-2">ISO 27001</h3>
                            <p className="text-sm text-zinc-400">Information security management</p>
                        </div>
                        <div>
                            <Lock className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                            <h3 className="font-bold mb-2">SOC 2 Type II</h3>
                            <p className="text-sm text-zinc-400">Security, availability, integrity</p>
                        </div>
                        <div>
                            <Server className="w-12 h-12 text-violet-400 mx-auto mb-4" />
                            <h3 className="font-bold mb-2">GDPR Ready</h3>
                            <p className="text-sm text-zinc-400">Data privacy compliance</p>
                        </div>
                    </div>
                </div>

                {/* Security Best Practices */}
                <div className="mt-16 p-8 rounded-2xl bg-amber-900/10 border border-amber-500/20">
                    <div className="flex items-start gap-4">
                        <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-xl font-bold mb-2">Security Best Practices</h3>
                            <p className="text-zinc-400 mb-4">
                                For maximum security, we recommend:
                            </p>
                            <ul className="space-y-2 text-zinc-400">
                                <li>• Running NetGuard on a dedicated, isolated network segment</li>
                                <li>• Enabling two-factor authentication for all admin accounts</li>
                                <li>• Regularly updating to the latest version for security patches</li>
                                <li>• Using strong, unique passwords for database encryption</li>
                                <li>• Implementing network-level firewalls to restrict access</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
