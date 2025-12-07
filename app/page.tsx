"use client";

import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "../convex/_generated/api";
import Link from "next/link";
import { SignUpButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart3, CheckCircle, Clock, Menu, Rocket, Search, Shield, Sparkle, Star, TrendingUp, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";



export default function Home() {
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">

      

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30">
              <Sparkle className="w-3 h-3 mr-1 text-yellow-500" />
              AI-powered SEO Assistant
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl space-y-2">
              <span className="block bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent">
                Generate Beautiful
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                SEO Reports
              </span>
              <span className="block bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent">
                in Seconds
              </span>
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-300">
              Harness the power of Perplexity to create comprehensive reports instantly.
              <span className="text-slate-900 dark:text-white font-medium">
                {" "}Fast, simple, structured, and insightful.
              </span>
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Unauthenticated>
                <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                  <Button
                    size="lg"
                    className="text-base px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Generate My Report
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </SignInButton>
              </Unauthenticated>

              <Authenticated>
                <a href="/dashboard">
                  <Button
                    size="lg"
                    className="text-base px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </Authenticated>
              
              <Button
                size="lg"
                className="text-base px-8 py-6 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300"
              >
                View Sample Report
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>10,000+ users</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>4.9/5 rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                <span>50,000+ reports</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mx-auto text-slate-900 dark:text-white">
              Choose your SEO Superpower
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Whether you're just getting started or need advanced insights, we've got the perfect plan for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Starter Plan Card */}
            <Card className="relative overflow-hidden border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 group bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-950/50 dark:to-cyan-950/50">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full -translate-y-16 translate-x-16" />
              
              <CardHeader className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300">
                    Starter
                  </Badge>
                </div>
                <CardTitle className="text-2xl text-slate-900 dark:text-white">
                  Full SEO Reports
                </CardTitle>
                <CardDescription className="text-base">
                  Generate comprehensive SEO Reports powered by Perplexity
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Complete SERP Analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Keyword ranking insights</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Competitor analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Export to PDF/CSV</span>
                  </div>
                </div>
                
                <Button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan Card */}
            <Card className="relative overflow-hidden border-2 border-purple-300 dark:border-purple-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 group bg-gradient-to-br from-purple-50/80 via-pink-50/80 to-orange-50/80 dark:from-purple-950/80 dark:via-pink-950/80 dark:to-orange-950/80">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-orange-400/20 rounded-full -translate-y-20 translate-x-20" />
              
              <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold">
                  <Sparkle className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              </div>

              <CardHeader className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300">
                    Premium
                  </Badge>
                </div>
                <CardTitle className="text-2xl text-slate-900 dark:text-white">
                  Advanced SEO Suite
                </CardTitle>
                <CardDescription className="text-base">
                  Everything in Starter, plus AI-powered insights and automation
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium">Everything in Starter</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>AI Content Recommendations</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Automated Monitoring</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Priority Support</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>White-label Reports</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>API Access</span>
                  </div>
                </div>
                
                <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 text-white shadow-lg">
                  Upgrade to Premium
                  <Sparkle className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white/50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-white">
              Why Choose Our Platform?
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Built for marketers, agencies, and businesses who value their time
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Lightning Fast</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Generate comprehensive reports in under 30 seconds. No more waiting hours for data.
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Actionable Insights</h3>
              <p className="text-slate-600 dark:text-slate-400">
                AI-powered recommendations that actually move the needle on your rankings.
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Enterprise Security</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Your data is encrypted and secure. We never share your competitive intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12 shadow-2xl">
            <div className="absolute inset-0 bg-grid-white/10" />
            
            <div className="relative text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white mb-4">
                Ready to Transform Your SEO?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of marketers who are already generating better SEO reports in seconds.
              </p>
              
              <Button
                size="lg"
                className="text-base px-8 py-6 bg-white text-purple-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <p className="mt-4 text-sm text-blue-100">
                No credit card required • 7-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-slate-600 dark:text-slate-400">
            <p>© 2025 SEO Reports. All rights reserved.</p>
            <div className="mt-4 flex justify-center gap-6 text-sm">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}


