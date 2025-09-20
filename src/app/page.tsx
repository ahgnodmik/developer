import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel } from "@/components/ui/carousel";
import { Github, Mail, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              Web Developer
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                소개
              </a>
              <a href="#skills" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                스킬
              </a>
              <a href="#gallery" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                갤러리
              </a>
              <a href="#projects" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                프로젝트
              </a>
              <a href="#contact" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                연락처
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <Avatar className="w-32 h-32 mx-auto mb-8">
              <AvatarImage src="/profile.jpg" alt="Profile" />
              <AvatarFallback className="text-2xl">DP</AvatarFallback>
            </Avatar>
            <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              주니어 웹 개발자
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              React, Tailwind CSS, TypeScript를 기반으로 현대적인 웹 애플리케이션 개발에 
              전문성을 가지고 있습니다. 서버리스 아키텍처와 SSR 렌더링 기술을 연구하며 
              최적의 성능과 사용자 경험을 제공합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
              <Button size="lg" variant="outline">
                <Mail className="w-5 h-5 mr-2" />
                이메일
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            소개
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
                주니어 개발자로서의 여정
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                React, Tailwind CSS, TypeScript를 기반으로 현대적인 웹 애플리케이션 개발에 
                전문성을 가지고 있습니다. 서버리스 아키텍처와 SSR 렌더링 기술을 연구하며 
                최적의 성능과 사용자 경험을 제공합니다.
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                AI 기술과 Flutter를 활용한 크로스 플랫폼 앱 개발에 집중하며, 
                웹 서비스와 모바일 앱을 통합한 디지털 솔루션을 제공합니다.
              </p>
              <p className="text-slate-600 dark:text-slate-300">
                디자인 중심의 개발 철학으로 사용자 친화적인 인터페이스를 구현하고, 
                지속적인 기술 연구와 혁신을 통해 더 나은 디지털 경험을 만들어갑니다.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-blue-600">5+</CardTitle>
                  <CardDescription>년 경력</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-green-600">50+</CardTitle>
                  <CardDescription>완료 프로젝트</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-purple-600">10+</CardTitle>
                  <CardDescription>기술 스택</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-orange-600">100%</CardTitle>
                  <CardDescription>만족도</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            기술 스택
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Frontend & Web</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                  <Badge variant="secondary">JavaScript</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Serverless & Backend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Vercel</Badge>
                  <Badge variant="secondary">Bolt.new</Badge>
                  <Badge variant="secondary">Netlify</Badge>
                  <Badge variant="secondary">AWS CloudFront</Badge>
                  <Badge variant="secondary">AWS S3</Badge>
                  <Badge variant="secondary">Firebase</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-600">Mobile & AI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">AI Integration</Badge>
                  <Badge variant="secondary">Cross Platform</Badge>
                  <Badge variant="secondary">App Design</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            작업 갤러리
          </h2>
          <div className="max-w-4xl mx-auto">
            <Carousel className="h-96">
              <div className="h-96 relative rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&crop=center" 
                  alt="웹 개발" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">웹 애플리케이션</h3>
                    <p className="text-lg opacity-90">React & TypeScript</p>
                  </div>
                </div>
              </div>
              <div className="h-96 relative rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop&crop=center" 
                  alt="모바일 앱" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">모바일 앱</h3>
                    <p className="text-lg opacity-90">Flutter & Dart</p>
                  </div>
                </div>
              </div>
              <div className="h-96 relative rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=400&fit=crop&crop=center" 
                  alt="UI/UX 디자인" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">UI/UX 디자인</h3>
                    <p className="text-lg opacity-90">사용자 경험 중심</p>
                  </div>
                </div>
              </div>
              <div className="h-96 relative rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop&crop=center" 
                  alt="서버리스 아키텍처" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">서버리스 아키텍처</h3>
                    <p className="text-lg opacity-90">Vercel & AWS</p>
                  </div>
                </div>
              </div>
              <div className="h-96 relative rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop&crop=center" 
                  alt="AI 통합" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">AI 통합</h3>
                    <p className="text-lg opacity-90">인공지능 기술</p>
                  </div>
                </div>
              </div>
            </Carousel>
          </div>
          <p className="text-center text-slate-600 dark:text-slate-300 mt-8 max-w-2xl mx-auto">
            다양한 프로젝트에서 작업한 웹 애플리케이션, 모바일 앱, UI/UX 디자인 등의 결과물을 확인할 수 있습니다.
            대부분의 프로젝트는 대외비가 설정되어 있어 상세한 내용은 직접 문의해 주세요.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            주요 프로젝트
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Modern Web Application</CardTitle>
                <CardDescription>
                  React, TypeScript, Tailwind CSS를 활용한 서버리스 웹 애플리케이션
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>React</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>Tailwind CSS</Badge>
                  <Badge>Vercel</Badge>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  대부분의 프로젝트는 대외비가 설정되어 있어 직접적으로 이미지가 제공될 수 없습니다.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>SSR Web Service</CardTitle>
                <CardDescription>
                  Next.js SSR 렌더링을 활용한 고성능 웹 서비스 플랫폼
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>Next.js</Badge>
                  <Badge>SSR</Badge>
                  <Badge>Serverless</Badge>
                  <Badge>Edge Functions</Badge>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  대부분의 프로젝트는 대외비가 설정되어 있어 직접적으로 이미지가 제공될 수 없습니다.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>AI-Powered Flutter App</CardTitle>
                <CardDescription>
                  AI 기술과 Flutter를 결합한 크로스 플랫폼 모바일 애플리케이션
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>Flutter</Badge>
                  <Badge>Dart</Badge>
                  <Badge>AI Integration</Badge>
                  <Badge>Cross Platform</Badge>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  대부분의 프로젝트는 대외비가 설정되어 있어 직접적으로 이미지가 제공될 수 없습니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            연락처
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-12">
            웹 개발, 앱 디자인, 서버리스 아키텍처 구축에 관심이 있으시다면 언제든 연락주세요!
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <Mail className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold mb-2">이메일</h3>
                <p className="text-slate-600 dark:text-slate-300">samdongpm@gmail.com</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Github className="w-8 h-8 mx-auto mb-4 text-gray-600" />
                <h3 className="font-semibold mb-2">GitHub</h3>
                <p className="text-slate-600 dark:text-slate-300">github.com/ahgnodmik</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Developer Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}