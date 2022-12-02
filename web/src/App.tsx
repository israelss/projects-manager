import { useRedirect, useRoutes } from 'raviger'
import { useRequireAuth } from './hooks/useRequireAuth'
import { LoginUser, NotFound, ProjectDetails, Projects, RegisterUser } from './pages'
import { ROUTE_URLS } from './utils/urls'

const routes = {
  [ROUTE_URLS.LOGIN]: () => <LoginUser />,
  [ROUTE_URLS.REGISTER]: () => <RegisterUser />,
  [ROUTE_URLS.ALL_PROJECTS]: () => <Projects />,
  [ROUTE_URLS.PROJECT_STATIC]: ({ id }: { id: string }) => <ProjectDetails id={id} />
}

const App = (): JSX.Element => {
  useRedirect('/', '/login')
  const auth = useRequireAuth()
  const route = useRoutes(routes)

  if (auth.username === null) return <div>Carregando...</div>

  return (
    <div className='App'>
      {route ?? <NotFound />}
    </div>
  )
}

export default App
