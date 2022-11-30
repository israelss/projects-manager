import { useRedirect, useRoutes } from 'raviger'
import { useRequireAuth } from './hooks/useRequireAuth'
import { AddProject, LoginUser, NotFound, ProjectDetails, Projects, RegisterUser } from './pages'

const routes = {
  '/login': () => <LoginUser />,
  '/register': () => <RegisterUser />,
  '/projects': () => <Projects />,
  '/projects/new': () => <AddProject />,
  '/projects/edit/:id': ({ id }: { id: string }) => <ProjectDetails id={id} />
}

const App = (): JSX.Element => {
  useRedirect('/', '/login')
  const auth = useRequireAuth()
  const route = useRoutes(routes)

  if (auth.username === null) return <div>Carregando...</div>

  return (
    <div className='App'>
      <h1>Gerenciador de Projetos</h1>
      {route ?? <NotFound />}
    </div>
  )
}

export default App
