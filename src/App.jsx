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

function App() {

  return (
    <>
      <header className='p-6 bg-(--bg-primary)'>
        <Navbar />
      </header>
      <main className='px-6 pb-6 grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-4 md:auto-rows-[minmax(150px,1fr)] bg-(--bg-primary)'>
        <CardContainer id='hero' col='1 / 6' row='1 / 3' bg='var(--card-1)' className='p-8 flex items-end'>
          <Hero />
        </CardContainer>
        <CardContainer col='6 / 9' row='1 / 3' bg='var(--card-2)'>
          <Me />
        </CardContainer>
        <CardContainer id='projects' col='9 / 13' row='1 / 4' bg='var(--card-1)' className='p-6 flex flex-col'>
          <Projects />
        </CardContainer>
        <CardContainer id='about' col='1 / 6' row='3 / 5' bg='var(--card-1)' className='p-8 flex flex-col justify-between gap-4'>
          <About />
        </CardContainer>
        <CardContainer id='contact' col='6 / 9' row='3 / 5' bg='var(--card-accent)' className='p-8 flex flex-col justify-between gap-4'>
          <Contact />
        </CardContainer>
        <CardContainer id='tecnology' col='9 / 13' row='4 / 5' bg='var(--card-2)' className='p-6 flex items-center justify-around text-xs tracking-widest'>
          <Tecnology />
        </CardContainer>
      </main>
      <footer id='footer' className='p-6 bg-(--bg-primary)'>
        <Footer />
      </footer>
      <LlmAvatarAssistant
        config={{
          baseUrl: '/v1',
          model: 'tu-modelo',
          defaultText: 'Hola! Preguntame algo sobre esta página.',
          sectionDiscovery: 'auto',
        }}
      />
    </>
  )
}

export default App
