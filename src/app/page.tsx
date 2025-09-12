import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              Portfolio
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                소개
              </a>
              <a href="#skills" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                스킬
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
              안녕하세요, 개발자입니다
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              창의적이고 혁신적인 웹 애플리케이션을 개발하는 풀스택 개발자입니다.
              사용자 경험을 최우선으로 생각하며, 최신 기술을 활용한 솔루션을 제공합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
              <Button size="lg" variant="outline">
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
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
                개발자로서의 여정
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                저는 5년 이상의 개발 경험을 가진 풀스택 개발자입니다. 
                프론트엔드부터 백엔드, 데이터베이스까지 전체적인 개발 과정을 이해하고 있습니다.
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                사용자 중심의 설계와 성능 최적화에 중점을 두며, 
                팀워크와 소통을 중요하게 생각합니다.
              </p>
              <p className="text-slate-600 dark:text-slate-300">
                지속적인 학습과 새로운 기술에 대한 열정으로 
                더 나은 개발자가 되기 위해 노력하고 있습니다.
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
                <CardTitle className="text-blue-600">Frontend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                  <Badge variant="secondary">Vue.js</Badge>
                  <Badge variant="secondary">Svelte</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Backend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">Express</Badge>
                  <Badge variant="secondary">FastAPI</Badge>
                  <Badge variant="secondary">PostgreSQL</Badge>
                  <Badge variant="secondary">MongoDB</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-600">DevOps & Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Docker</Badge>
                  <Badge variant="secondary">AWS</Badge>
                  <Badge variant="secondary">Git</Badge>
                  <Badge variant="secondary">CI/CD</Badge>
                  <Badge variant="secondary">Kubernetes</Badge>
                  <Badge variant="secondary">Terraform</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
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
                <CardTitle>E-Commerce Platform</CardTitle>
                <CardDescription>
                  React와 Node.js를 사용한 풀스택 전자상거래 플랫폼
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>React</Badge>
                  <Badge>Node.js</Badge>
                  <Badge>MongoDB</Badge>
                </div>
                <Button variant="outline" size="sm" className="group-hover:bg-slate-900 group-hover:text-white">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  살펴보기
                </Button>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Task Management App</CardTitle>
                <CardDescription>
                  팀 협업을 위한 실시간 작업 관리 애플리케이션
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>Next.js</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>PostgreSQL</Badge>
                </div>
                <Button variant="outline" size="sm" className="group-hover:bg-slate-900 group-hover:text-white">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  살펴보기
                </Button>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Data Analytics Dashboard</CardTitle>
                <CardDescription>
                  실시간 데이터 시각화 및 분석 대시보드
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>Vue.js</Badge>
                  <Badge>Python</Badge>
                  <Badge>D3.js</Badge>
                </div>
                <Button variant="outline" size="sm" className="group-hover:bg-slate-900 group-hover:text-white">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  살펴보기
                </Button>
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
            새로운 프로젝트나 협업에 관심이 있으시다면 언제든 연락주세요!
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <Mail className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold mb-2">이메일</h3>
                <p className="text-slate-600 dark:text-slate-300">developer@example.com</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Github className="w-8 h-8 mx-auto mb-4 text-gray-600" />
                <h3 className="font-semibold mb-2">GitHub</h3>
                <p className="text-slate-600 dark:text-slate-300">github.com/developer</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Linkedin className="w-8 h-8 mx-auto mb-4 text-blue-700" />
                <h3 className="font-semibold mb-2">LinkedIn</h3>
                <p className="text-slate-600 dark:text-slate-300">linkedin.com/in/developer</p>
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