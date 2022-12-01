import { useRequireAuth } from '../hooks/useRequireAuth'

const Header = (): JSX.Element => {
  const { logout, username } = useRequireAuth()
  return (
    <header>
      <h2>Gerenciador de Projetos</h2>
      <div>Usuário: {username}</div>
      <button onClick={logout}>Sair</button>
    </header>
  )
}

export default Header
