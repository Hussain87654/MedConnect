"use client";

import Link from "next/link";
import { Button } from "@/components";
import { Card } from "@/components";
import { Header } from "@/components";
import { Footer } from "@/components";
import { CustomCursor } from "@/components/CustomCursor";

const teamMembers = [
  {
    name: "Hussain",
    role: "Lead Developer",
    image: "H",
  },
  {
    name: "Zain",
    role: "Backend Engineer",
    image: "Z",
  },
  {
    name: "Asher",
    role: "UI/UX Designer",
    image: "A",
  },
  {
    name: "Bilal",
    role: "Project Manager",
    image: "B",
  },
];

const features = [
  {
    title: "Easy Appointments",
    description:
      "Book appointments with doctors in just a few clicks. No more long waiting times.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Secure Health Records",
    description:
      "Your medical records are encrypted and securely stored. Access them anytime.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    color: "from-emerald-500 to-green-600",
  },
  {
    title: "24/7 Support",
    description:
      "Get round-the-clock support from our dedicated team for any queries.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    color: "from-purple-500 to-violet-600",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient",
    text: "MedConnect has completely transformed how I manage my healthcare. Booking appointments is now so convenient!",
    avatar: "S",
  },
  {
    name: "Dr. Michael Chen",
    role: "Cardiologist",
    text: "As a healthcare provider, this platform has streamlined my practice and improved patient communication significantly.",
    avatar: "M",
  },
  {
    name: "Emily Rodriguez",
    role: "Patient",
    text: "The ability to track my medical records and appointments in one place is incredible. Highly recommend!",
    avatar: "E",
  },
];

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 overflow-x-hidden">
      <Header transparent />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float delay-500"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float delay-1000"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge */}
              <div className="animate-fade-in-down inline-flex items-center px-5 py-2.5 rounded-full bg-blue-100/80 backdrop-blur-sm text-blue-700 text-sm font-semibold mb-8 hover-lift shadow-lg shadow-blue-500/10">
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                Healthcare Reimagined ✨
              </div>

              {/* Main Heading */}
              <h1 className="animate-fade-in-up text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight delay-100 leading-tight">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent animate-linear-shift">
                  MedConnect
                </span>
              </h1>

              {/* Tagline */}
              <p className="animate-fade-in-up text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed delay-200">
                Your trusted platform for seamless healthcare management.
                Connect with doctors, manage appointments, and access your
                medical records all in one place.
              </p>

              {/* CTA Buttons */}
              <div className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4 delay-300">
                <Link href="/login">
                  <Button size="lg" className="min-w-48 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1 transition-all bg-gradient-to-r from-blue-600 to-blue-700">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline" size="lg" className="min-w-48 hover-lift border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                    Sign Up Free
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="animate-fade-in-up mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 delay-400">
                {[
                  { value: "10K+", label: "Patients", icon: "👥" },
                  { value: "500+", label: "Doctors", icon: "👨‍⚕️" },
                  { value: "50+", label: "Specialties", icon: "🏥" },
                  { value: "99%", label: "Satisfaction", icon: "⭐" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="group text-center p-5 rounded-2xl bg-white/60 backdrop-blur-sm hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50"
                  >
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 mt-2 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating Icons */}
          <div className="absolute top-24 left-12 md:left-24 text-blue-300 animate-float opacity-60">
            <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div className="absolute top-48 right-16 md:right-32 text-purple-300 animate-float delay-300 opacity-60">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="absolute bottom-32 left-1/4 text-emerald-300 animate-float delay-500 opacity-60">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">ABOUT US</span>
              <h2 className="animate-fade-in-up text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Choose MedConnect?
              </h2>
              <p className="animate-fade-in-up text-gray-600 max-w-2xl mx-auto text-xl delay-100">
                We are revolutionizing healthcare by connecting patients with
                qualified medical professionals through an intuitive, secure
                platform.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  hover
                  className="text-center group animate-fade-in-up hover-lift p-8 border-0 shadow-lg"
                  style={{ animationDelay: `${index * 100 + 200}ms` }}
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">GET STARTED</span>
              <h2 className="animate-fade-in-up text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                How It Works
              </h2>
              <p className="animate-fade-in-up text-gray-600 max-w-2xl mx-auto text-xl delay-100">
                Get started with MedConnect in three simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connection Lines */}
              <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-1 bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300 rounded-full"></div>

              {[
                {
                  step: "1",
                  title: "Sign Up",
                  desc: "Create your free account in just a few minutes",
                  icon: "📝",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  step: "2",
                  title: "Choose a Doctor",
                  desc: "Browse through our network of qualified healthcare providers",
                  icon: "🔍",
                  color: "from-purple-500 to-purple-600",
                },
                {
                  step: "3",
                  title: "Book Appointment",
                  desc: "Schedule your visit at a time that works for you",
                  icon: "📅",
                  color: "from-emerald-500 to-emerald-600",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="animate-fade-in-up text-center relative p-8"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="relative inline-block mb-8">
                    <div className={`w-24 h-24 bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center text-5xl shadow-xl hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-gray-800 shadow-lg border-2 border-gray-100">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">TESTIMONIALS</span>
              <h2 className="animate-fade-in-up text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                What Our Users Say
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  hover
                  className="p-8 border-0 shadow-lg animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-1 text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">OUR TEAM</span>
              <h2 className="animate-fade-in-up text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Meet Our Team
              </h2>
              <p className="animate-fade-in-up text-gray-600 max-w-2xl mx-auto text-xl delay-100">
                The dedicated professionals behind MedConnect working to
                transform healthcare.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  hover
                  className="text-center group animate-fade-in-up hover-lift border-0 shadow-lg overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative p-8">
                    <div className="relative mb-4">
                      <div className="w-28 h-28 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl">
                        {member.image}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white animate-bounce-subtle"></div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-gray-500 font-medium">{member.role}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-12 left-12 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
              <div className="absolute top-24 right-24 w-40 h-40 bg-white/10 rounded-full animate-float delay-300"></div>
              <div className="absolute bottom-12 left-1/3 w-20 h-20 bg-white/10 rounded-full animate-float delay-500"></div>
              <div className="absolute bottom-24 right-1/3 w-32 h-32 bg-white/10 rounded-full animate-float delay-700"></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float delay-1000"></div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="animate-fade-in-up text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="animate-fade-in-up text-blue-100 text-xl mb-10 max-w-2xl mx-auto delay-100">
              Join thousands of patients who trust MedConnect for their
              healthcare needs. Your journey to better health starts here.
            </p>
            <div className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4 delay-200">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-xl border-0 px-10"
                >
                  Create Account
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-700 transition-all duration-300 px-10"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
    </>
  );
}