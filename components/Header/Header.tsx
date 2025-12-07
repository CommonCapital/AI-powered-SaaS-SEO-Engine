'use client'
import { SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react'
import { Authenticated, Unauthenticated } from 'convex/react'
import { ArrowRight, Menu, Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { ModeToggle } from '../ThemeToggle/ThemeToggle'

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
     <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SEO Reports
              </span>
            </div>

            
       
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
             
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#about" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                About
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Unauthenticated>
                <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                  <Button className="bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </SignUpButton>
              </Unauthenticated>

              <Authenticated>
                <a href="/dashboard">
                  <Button className="bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                    Dashboard
                  </Button>
                </a>
                <UserButton />
              </Authenticated>
            </div>

            {/* Mobile menu button */}
            <ModeToggle />
            <button
              className="md:hidden p-2 text-slate-600 dark:text-slate-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-col gap-4">
                <a href="#features" className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Features
                </a>
                <a href="#pricing" className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Pricing
                </a>
                <a href="#about" className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  About
                </a>
                
                <Unauthenticated>
                  <div className="flex flex-col gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                      <Button className="w-full bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        Get Started
                      </Button>
                    </SignUpButton>
                  </div>
                </Unauthenticated>

                <Authenticated>
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <UserButton />
                    <a href="/dashboard" className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Go to Dashboard
                    </a>
                  </div>
                </Authenticated>
              </div>
            </div>
          )}
        </nav>
      </header>
  )
}

export default Header