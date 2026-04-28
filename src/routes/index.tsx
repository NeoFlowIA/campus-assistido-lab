import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Accessibility,
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  ChevronRight,
  Clock,
  FileText,
  GraduationCap,
  Headphones,
  Library,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Volume2,
  X,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Campus Fortaleza | Portal Institucional" },
      {
        name: "description",
        content:
          "Portal institucional com recursos de acessibilidade, Libras, voz, texto e navegação assistida.",
      },
      { property: "og:title", content: "Campus Fortaleza" },
      {
        property: "og:description",
        content:
          "Portal institucional de campus educacional com recursos de acessibilidade digital.",
      },
    ],
  }),
  component: CampusPortalPage,
});

const navItems = [
  "Início",
  "O Campus",
  "Ensino",
  "Pesquisa e Inovação",
  "Extensão",
  "Estudante",
  "Notícias",
  "Processos Seletivos",
  "Contatos",
];

const quickLinks = [
  {
    title: "Cursos",
    description: "Formações técnicas, superiores e continuadas.",
    icon: GraduationCap,
  },
  {
    title: "Calendário Acadêmico",
    description: "Datas letivas, matrículas e eventos acadêmicos.",
    icon: CalendarDays,
  },
  { title: "Editais", description: "Chamadas públicas, seleções e comunicados.", icon: FileText },
  {
    title: "Biblioteca",
    description: "Acervo, empréstimos e serviços de pesquisa.",
    icon: Library,
  },
  {
    title: "Assistência Estudantil",
    description: "Apoio, auxílios e acompanhamento ao estudante.",
    icon: Users,
  },
  {
    title: "Portal do Estudante",
    description: "Acesso a solicitações e vida acadêmica.",
    icon: BookOpen,
  },
  {
    title: "Ouvidoria",
    description: "Canal de escuta e encaminhamento institucional.",
    icon: Headphones,
  },
];

const courses = [
  { name: "Técnico em Informática", level: "Técnicos", modality: "Integrado", shift: "Manhã" },
  { name: "Técnico em Edificações", level: "Técnicos", modality: "Subsequente", shift: "Noite" },
  { name: "Técnico em Eletrotécnica", level: "Técnicos", modality: "Integrado", shift: "Tarde" },
  {
    name: "Licenciatura em Matemática",
    level: "Licenciaturas",
    modality: "Presencial",
    shift: "Noite",
  },
  {
    name: "Licenciatura em Física",
    level: "Licenciaturas",
    modality: "Presencial",
    shift: "Tarde",
  },
  {
    name: "Engenharia de Computação",
    level: "Graduação",
    modality: "Bacharelado",
    shift: "Integral",
  },
  {
    name: "Tecnologia em Gestão Ambiental",
    level: "Graduação",
    modality: "Tecnólogo",
    shift: "Manhã",
  },
  {
    name: "Especialização em Inovação Educacional",
    level: "Pós-graduação",
    modality: "Especialização",
    shift: "Sábado",
  },
];

const tabs = ["Todos", "Técnicos", "Graduação", "Licenciaturas", "Pós-graduação", "Extensão"];

const news = [
  {
    title: "Campus Fortaleza realiza semana de tecnologia e inclusão",
    date: "12 mar 2026",
    category: "Eventos",
    summary: "Programação reúne oficinas, palestras e demonstrações de tecnologias assistivas.",
  },
  {
    title: "Aberto período de inscrição para cursos de extensão",
    date: "8 mar 2026",
    category: "Extensão",
    summary:
      "Comunidade pode se inscrever em formações rápidas nas áreas de tecnologia e cidadania.",
  },
  {
    title: "Estudantes participam de projeto de inovação acessível",
    date: "28 fev 2026",
    category: "Inovação",
    summary: "Equipe desenvolve protótipos voltados à comunicação inclusiva em ambientes públicos.",
  },
  {
    title: "Secretaria acadêmica divulga novos horários de atendimento",
    date: "20 fev 2026",
    category: "Comunicado",
    summary:
      "Atendimento presencial e remoto passa a contar com horários ampliados durante a semana.",
  },
];

const selections = [
  { title: "Cursos técnicos 2026.1", status: "Aberto", period: "01/04 a 30/04/2026" },
  { title: "Cursos de extensão", status: "Em andamento", period: "15/03 a 10/05/2026" },
  { title: "Seleção para bolsas de monitoria", status: "Aberto", period: "05/04 a 18/04/2026" },
  { title: "Editais de pesquisa e inovação", status: "Finalizado", period: "10/02 a 12/03/2026" },
];

const studentServices = [
  "Matrícula",
  "Histórico escolar",
  "Solicitações acadêmicas",
  "Assistência estudantil",
  "Estágios",
  "Biblioteca",
  "Restaurante universitário",
  "Atendimento psicossocial",
];

const sectors = [
  "Direção Geral",
  "Diretoria de Ensino",
  "Secretaria Acadêmica",
  "Comunicação Social",
  "Assistência Estudantil",
  "Pesquisa e Inovação",
  "Extensão",
  "Biblioteca",
];

function CampusPortalPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Todos");
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  const filteredCourses = useMemo(() => {
    if (activeTab === "Todos") return courses;
    if (activeTab === "Extensão") return courses.slice(0, 4);
    return courses.filter((course) => course.level === activeTab);
  }, [activeTab]);

  return (
    <main
      className={highContrast ? "bg-foreground text-background" : "bg-background text-foreground"}
    >
      <TopBar />
      <SiteHeader mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className={largeText ? "text-lg" : "text-base"}>
        <Hero />
        <QuickAccess />
        <Courses
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          filteredCourses={filteredCourses}
        />
        <NewsSection />
        <SelectionsSection />
        <StudentArea />
        <ResearchExtensionInnovation />
        <AccessibilityLab />
        <Contacts />
      </div>
      <Footer />
      <FloatingAccessibility
        open={accessibilityOpen}
        setOpen={setAccessibilityOpen}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        largeText={largeText}
        setLargeText={setLargeText}
      />
      <ExternalNeoTalkWidget />
    </main>
  );
}

function ExternalNeoTalkWidget() {
  return (
    <div className="fixed bottom-4 right-4 z-50 h-[720px] w-full max-w-[420px] px-4 sm:px-0">
      <iframe
        src="https://infra-neotalkif.k3p3ex.easypanel.host/widget"
        title="Assistente virtual IFCE"
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin"
        allow="autoplay"
        loading="lazy"
        className="h-full w-full rounded-xl border-0 shadow-2xl"
      />
    </div>
  );
}

function TopBar() {
  return (
    <div className="border-b border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-2 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <span className="font-semibold">Portal Institucional</span>
        <div className="flex flex-wrap items-center gap-3">
          {["Acessibilidade", "Alto Contraste", "Mapa do Site", "Contato"].map((item) => (
            <a key={item} href="#contatos" className="hover:underline">
              {item}
            </a>
          ))}
          <label className="flex min-w-56 items-center gap-2 rounded-md bg-primary-foreground/12 px-3 py-1.5">
            <Search className="h-4 w-4" aria-hidden="true" />
            <input
              className="w-full bg-transparent text-sm placeholder:text-primary-foreground/75 outline-none"
              placeholder="Buscar no portal"
              aria-label="Buscar no portal"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

function SiteHeader({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 lg:px-8">
        <a href="#inicio" className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Building2 className="h-7 w-7" aria-hidden="true" />
          </span>
          <span>
            <strong className="block text-xl leading-tight text-primary">Campus Fortaleza</strong>
            <span className="block text-xs text-muted-foreground sm:text-sm">
              Instituto Federal de Educação, Ciência e Tecnologia
            </span>
          </span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Menu principal">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${slugify(item)}`}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition hover:bg-secondary hover:text-primary"
            >
              {item}
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-primary lg:hidden"
          aria-label="Abrir menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {mobileOpen && (
        <nav
          className="border-t border-border bg-card px-4 py-3 lg:hidden"
          aria-label="Menu mobile"
        >
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${slugify(item)}`}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium transition hover:bg-secondary hover:text-primary"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="border-b border-border bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-14">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-md bg-card px-3 py-1 text-sm font-semibold text-primary shadow-sm ring-1 ring-border">
            <ShieldCheck className="h-4 w-4" /> Portal institucional
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-primary sm:text-5xl">
            Campus Fortaleza
          </h1>
          <p className="mt-5 max-w-2xl text-xl font-medium text-foreground">
            Ensino público, gratuito e de qualidade em um ambiente de inovação, inclusão e formação
            cidadã.
          </p>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            O Campus Fortaleza reúne cursos técnicos, graduações, pós-graduações, projetos de
            pesquisa, extensão e serviços voltados à comunidade acadêmica.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ActionButton href="#ensino">Conheça nossos cursos</ActionButton>
            <ActionButton href="#servicos" variant="outline">
              Acesse os serviços
            </ActionButton>
            <ActionButton href="#processos-seletivos" variant="outline">
              Processos seletivos
            </ActionButton>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-lg">
          <div className="aspect-[4/3] bg-[linear-gradient(135deg,var(--primary),var(--accent))] p-6 text-primary-foreground">
            <div className="flex h-full flex-col justify-between rounded-md border border-primary-foreground/25 bg-primary-foreground/10 p-6 backdrop-blur-sm">
              <div className="grid grid-cols-[1.3fr_0.8fr] gap-4">
                <div className="rounded-md bg-primary-foreground/20 p-4">
                  <div className="h-3 w-24 rounded-full bg-primary-foreground/55" />
                  <div className="mt-8 grid grid-cols-4 gap-2">
                    {Array.from({ length: 12 }).map((_, index) => (
                      <span key={index} className="h-8 rounded-sm bg-primary-foreground/30" />
                    ))}
                  </div>
                </div>
                <div className="rounded-md bg-primary-foreground/15 p-4">
                  <div className="h-24 rounded-md bg-primary-foreground/25" />
                  <div className="mt-3 h-3 w-16 rounded-full bg-primary-foreground/45" />
                </div>
              </div>
              <div>
                <Building2 className="mb-4 h-14 w-14" />
                <p className="text-2xl font-bold">Ambiente educacional integrado</p>
                <p className="mt-2 max-w-md text-sm opacity-90">
                  Representação visual genérica de campus, laboratórios e convivência acadêmica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickAccess() {
  return (
    <Section id="servicos" eyebrow="Acesso rápido" title="Serviços e informações principais">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((item) => (
          <article
            key={item.title}
            className="group rounded-lg border border-border bg-card p-5 shadow-sm ring-1 ring-transparent transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-md hover:ring-primary/10"
          >
            <item.icon className="h-8 w-8 text-primary" aria-hidden="true" />
            <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
            <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">
              {item.description}
            </p>
            <a
              href="#"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              Acessar <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Courses({
  activeTab,
  setActiveTab,
  filteredCourses,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filteredCourses: typeof courses;
}) {
  return (
    <Section
      id="ensino"
      eyebrow="Ensino"
      title="Conheça nossos cursos"
      description="O Campus Fortaleza oferece formações gratuitas em diferentes níveis de ensino, incluindo cursos técnicos, graduação, licenciatura, tecnologia, pós-graduação e formação continuada."
      muted
    >
      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Filtros de cursos">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-md border px-4 py-2 text-sm font-semibold transition ${
              activeTab === tab
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filteredCourses.map((course) => (
          <article
            key={course.name}
            className="rounded-lg border border-border bg-card p-5 shadow-sm ring-1 ring-transparent transition hover:border-primary/60 hover:shadow-md hover:ring-primary/10"
          >
            <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-bold text-primary">
              {course.level}
            </span>
            <h3 className="mt-4 min-h-14 text-lg font-bold">{course.name}</h3>
            <dl className="mt-3 space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between gap-4">
                <dt>Modalidade</dt>
                <dd className="font-medium text-foreground">{course.modality}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Turno</dt>
                <dd className="font-medium text-foreground">{course.shift}</dd>
              </div>
            </dl>
            <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground">
              Ver detalhes <ArrowRight className="h-4 w-4" />
            </button>
          </article>
        ))}
      </div>
    </Section>
  );
}

function NewsSection() {
  return (
    <Section id="noticias" eyebrow="Comunicação" title="Notícias">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {news.map((item) => (
          <article
            key={item.title}
            className="rounded-lg border border-border bg-card p-5 shadow-sm ring-1 ring-transparent transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-md hover:ring-primary/10"
          >
            <span className="text-xs font-bold uppercase tracking-wide text-accent">
              {item.category}
            </span>
            <time className="mt-2 block text-sm text-muted-foreground">{item.date}</time>
            <h3 className="mt-3 min-h-20 text-lg font-bold leading-snug">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.summary}</p>
            <a
              href="#"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              Ler mais <ArrowRight className="h-4 w-4" />
            </a>
          </article>
        ))}
      </div>
      <div className="mt-7">
        <ActionButton href="#noticias">Ver todas as notícias</ActionButton>
      </div>
    </Section>
  );
}

function SelectionsSection() {
  return (
    <Section
      id="processos-seletivos"
      eyebrow="Ingresso e editais"
      title="Processos seletivos"
      muted
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {selections.map((item) => (
          <article
            key={item.title}
            className="rounded-lg border border-border bg-card p-5 shadow-sm"
          >
            <span
              className={`rounded-md px-2.5 py-1 text-xs font-bold ${statusClass(item.status)}`}
            >
              {item.status}
            </span>
            <h3 className="mt-4 min-h-14 text-lg font-bold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">Período: {item.period}</p>
            <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
              Acessar edital <FileText className="h-4 w-4" />
            </button>
          </article>
        ))}
      </div>
    </Section>
  );
}

function StudentArea() {
  return (
    <Section id="estudante" eyebrow="Vida acadêmica" title="Área do Estudante">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {studentServices.map((service) => (
          <a
            key={service}
            href="#"
            className="flex items-center justify-between rounded-lg border border-border bg-card p-4 font-semibold shadow-sm transition hover:border-primary hover:text-primary hover:shadow-md"
          >
            {service} <ChevronRight className="h-4 w-4" />
          </a>
        ))}
      </div>
    </Section>
  );
}

function ResearchExtensionInnovation() {
  const items = [
    {
      title: "Pesquisa",
      icon: BookOpen,
      text: "Projetos científicos, grupos de estudo e iniciação tecnológica conectam estudantes a desafios reais.",
    },
    {
      title: "Extensão",
      icon: Users,
      text: "Ações comunitárias, eventos e formações aproximam o campus da sociedade e do território.",
    },
    {
      title: "Inovação",
      icon: Sparkles,
      text: "Laboratórios, incubação, tecnologia assistiva e parcerias estimulam soluções aplicadas.",
    },
  ];
  return (
    <Section
      id="pesquisa-e-inovacao"
      eyebrow="Projetos institucionais"
      title="Pesquisa, Extensão e Inovação"
      muted
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className="rounded-lg border border-border bg-card p-6 shadow-sm ring-1 ring-transparent transition hover:border-primary/60 hover:shadow-md hover:ring-primary/10"
          >
            <item.icon className="h-9 w-9 text-primary" />
            <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
            <p className="mt-3 leading-7 text-muted-foreground">{item.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function AccessibilityLab() {
  const buttons = [
    "Traduzir página em Libras",
    "Ler conteúdo em voz alta",
    "Abrir atendimento acessível",
    "Ver mapa do campus",
    "Explicar esta página",
  ];
  return (
    <Section
      id="acessibilidade"
      eyebrow="NeoTalk"
      title="Laboratório de Acessibilidade Digital"
      description="Este portal institucional é utilizado como ambiente de validação para soluções de acessibilidade digital, incluindo tradução em Libras por avatar 3D, leitura em voz alta, atendimento inclusivo e navegação assistida."
    >
      <div className="grid gap-6 rounded-lg border border-border bg-card p-5 shadow-sm lg:grid-cols-[0.9fr_1.1fr] lg:p-7">
        <div className="flex min-h-72 items-center justify-center rounded-lg bg-secondary p-6 text-center">
          <div>
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
              <Accessibility className="h-16 w-16" />
            </div>
            <p className="mt-5 text-2xl font-bold text-primary">Avatar Libras</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Área reservada para avatar 3D de Libras
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold">Assistente de Acessibilidade</h3>
          <p className="mt-3 leading-7 text-muted-foreground">
            Painel de simulação para acionar recursos inclusivos durante a navegação pelo portal.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {buttons.map((button) => (
              <button
                key={button}
                className="rounded-md border border-border bg-background px-4 py-3 text-left font-semibold transition hover:border-primary hover:text-primary"
              >
                {button}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Contacts() {
  return (
    <Section id="contatos" eyebrow="Atendimento" title="Contatos do Campus" muted>
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm ring-1 ring-transparent transition hover:border-primary/60 hover:shadow-md hover:ring-primary/10">
          <h3 className="text-xl font-bold">Campus Fortaleza</h3>
          <div className="mt-5 space-y-4 text-muted-foreground">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-primary" /> Avenida Exemplo, 2081 - Benfica -
              Fortaleza/CE
            </p>
            <p>CEP: 60000-000</p>
            <p className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 text-primary" /> (85) 3000-0000
            </p>
            <p className="flex gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-primary" />
              <span>contato (arroba) campusfortaleza.edu.br</span>
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {sectors.map((sector) => (
            <div key={sector} className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <h4 className="font-bold">{sector}</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                <span>{emailFor(sector)}</span> <span>(arroba)</span>{" "}
                <span>campusfortaleza.edu.br</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  const columns = [
    { title: "Institucional", links: ["O Campus", "Direção", "Contatos", "Transparência"] },
    { title: "Ensino", links: ["Cursos", "Calendário", "Estudante", "Biblioteca"] },
    {
      title: "Acesso rápido",
      links: ["Notícias", "Processos seletivos", "Editais", "Acessibilidade"],
    },
  ];
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <h2 className="text-xl font-bold">Campus Fortaleza</h2>
          <p className="mt-3 text-sm leading-6 opacity-85">
            Avenida Exemplo, 2081 - Benfica - Fortaleza/CE
            <br />
            Telefone: (85) 3000-0000
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="font-bold">{column.title}</h3>
            <ul className="mt-3 space-y-2 text-sm opacity-90">
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#inicio" className="hover:underline">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-primary-foreground/20 px-4 py-4 text-center text-sm opacity-90">
        © 2026 Campus Fortaleza. Portal institucional de referência para acessibilidade digital.
      </div>
    </footer>
  );
}

function FloatingAccessibility({
  open,
  setOpen,
  highContrast,
  setHighContrast,
  largeText,
  setLargeText,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
  largeText: boolean;
  setLargeText: (value: boolean) => void;
}) {
  const options = [
    { label: "Libras", icon: Accessibility },
    { label: "Voz", icon: Volume2 },
    { label: "Texto simplificado", icon: FileText },
    { label: "Alto contraste", icon: ShieldCheck, action: () => setHighContrast(!highContrast) },
    { label: "Aumentar fonte", icon: Sparkles, action: () => setLargeText(!largeText) },
    { label: "Mapa do campus", icon: MapPin },
    { label: "Atendimento", icon: Headphones },
  ];
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-bold text-accent-foreground shadow-xl transition hover:scale-105"
      >
        <Accessibility className="h-5 w-5" /> Acessibilidade
      </button>
      {open && (
        <button
          className="fixed inset-0 z-50 bg-foreground/25"
          aria-label="Fechar painel"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform bg-card p-6 shadow-2xl transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!open}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-primary">Assistente de Acessibilidade</h2>
            <p className="mt-2 text-muted-foreground">Escolha como deseja navegar pelo portal.</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md border border-border p-2"
            aria-label="Fechar painel de acessibilidade"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-8 grid gap-3">
          {options.map((option) => (
            <button
              key={option.label}
              onClick={option.action}
              className="flex items-center justify-between rounded-lg border border-border bg-background p-4 text-left font-semibold transition hover:border-primary hover:text-primary"
            >
              <span className="flex items-center gap-3">
                <option.icon className="h-5 w-5" />
                {option.label}
              </span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  muted = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <section
      id={id}
      className={muted ? "bg-secondary py-12 lg:py-16" : "bg-background py-12 lg:py-16"}
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wide text-accent">{eyebrow}</p>
          <h2 className="mt-2 text-3xl font-bold text-primary sm:text-4xl">{title}</h2>
          {description && <p className="mt-4 leading-7 text-muted-foreground">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function ActionButton({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
}) {
  return (
    <a
      href={href}
      className={
        variant === "solid"
          ? "inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-sm transition hover:opacity-90"
          : "inline-flex items-center justify-center rounded-md border border-primary bg-card px-5 py-3 text-sm font-bold text-primary transition hover:bg-primary hover:text-primary-foreground"
      }
    >
      {children}
    </a>
  );
}

function slugify(value: string) {
  if (value === "Início") return "inicio";
  if (value === "O Campus") return "inicio";
  if (value === "Ensino") return "ensino";
  if (value === "Pesquisa e Inovação") return "pesquisa-e-inovacao";
  if (value === "Extensão") return "pesquisa-e-inovacao";
  if (value === "Estudante") return "estudante";
  if (value === "Notícias") return "noticias";
  if (value === "Processos Seletivos") return "processos-seletivos";
  return "contatos";
}

function statusClass(status: string) {
  if (status === "Aberto") return "bg-secondary text-primary";
  if (status === "Em andamento") return "bg-accent text-accent-foreground";
  return "bg-muted text-muted-foreground";
}

function emailFor(sector: string) {
  return sector
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.|\.$/g, "");
}
