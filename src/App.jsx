import { CardContainer } from './components/CardContainer'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Me } from './components/Me'
import { Projects } from './components/Projects'
import { About } from './components/About'
import { Contact } from './components/Contact'
import './index.css'
import { Tecnology } from './components/Tecnology'
import { Footer } from './components/Footer'
import LlmAvatarAssistant from './components/LlmAvatarAssistant'


const ASSISTANT_CONFIG = {
  baseUrl: '/v1',
  model: 'tu-modelo',
  defaultText: 'Hola! Preguntame algo sobre esta página.',
  sectionDiscovery: 'auto',
}

function App() {

  return (
    <>
      <a
        href='#contenido'
        className='sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-(--bg-primary) focus:font-medium'
      >
        Saltar al contenido
      </a>
      <header className='p-6 bg-(--bg-primary)'>
        <Navbar />
      </header>
      <main id='contenido' tabIndex={-1} className='px-6 pb-6 grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-4 md:auto-rows-[minmax(150px,1fr)] bg-(--bg-primary) focus:outline-none'>
        <CardContainer id='hero' labelledBy='hero-title' col='1 / 6' row='1 / 3' bg='var(--card-1)' className='p-8 flex items-end'>
          <Hero />
        </CardContainer>
        <CardContainer col='6 / 9' row='1 / 3' bg='var(--card-2)'>
          <Me />
        </CardContainer>
        <CardContainer id='projects' labelledBy='projects-title' col='9 / 13' row='1 / 4' bg='var(--card-1)' className='p-6 flex flex-col'>
          <Projects />
        </CardContainer>
        <CardContainer id='about' labelledBy='about-title' col='1 / 6' row='3 / 5' bg='var(--card-1)' className='p-8 flex flex-col justify-between gap-4'>
          <About />
        </CardContainer>
        <CardContainer id='contact' labelledBy='contact-title' col='6 / 9' row='3 / 5' bg='var(--card-accent)' className='p-8 flex flex-col justify-between gap-4 text-white'>
          <Contact />
        </CardContainer>
        <CardContainer id='tecnology' labelledBy='tecnology-title' col='9 / 13' row='4 / 5' bg='var(--card-2)' className='p-6 flex items-center justify-around text-xs tracking-widest'>
          <Tecnology />
        </CardContainer>
      </main>
      <footer id='footer' className='p-6 bg-(--bg-primary)'>
        <Footer />
      </footer>
      <LlmAvatarAssistant config={ASSISTANT_CONFIG} />
    </>
  )
}

export default App
