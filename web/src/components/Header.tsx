import { useRequireAuth } from '../hooks/useRequireAuth'

const Header = (): JSX.Element => {
  const { logout, username } = useRequireAuth()
  return (
    <header className='flex items-center gap-2 bg-primary-content p-2'>
      <h2 className='text-xl flex-1 text-primary'>Gerenciador de Projetos</h2>
      <div className='text-info-content'>Usuário: {username}</div>
      <button className='btn btn-error btn-sm' onClick={logout}>Sair</button>
    </header>
  )
}

export default Header
