import { navigate } from 'raviger'
import { ProjectSummaryProps } from '../interfaces/project'
import { ROUTE_URLS } from '../utils/urls'

const ProjectSummary = ({ data }: ProjectSummaryProps): JSX.Element => {
  return (
    <div>
      <div>Nome do projeto: {data.title}</div>
      <div>Prazo: {new Date(data.deadline).toLocaleString()}</div>
      <button onClick={() => navigate(ROUTE_URLS.PROJECT(data.id))}>Mais Detalhes</button>
      <hr />
    </div>
  )
}

export default ProjectSummary
