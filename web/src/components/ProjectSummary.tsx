import { navigate } from 'raviger'
import { ProjectSummaryProps } from '../interfaces/project'
import { ROUTE_URLS } from '../utils/urls'

const ProjectSummary = ({ data }: ProjectSummaryProps): JSX.Element => {
  return (
    <div className='flex py-2'>
      <div className='flex-1'>
        <div className='text-lg text-primary'>
          Projeto: {data.title}
        </div>
        <div className='text-secondary'>
          Prazo: {new Date(data.deadline).toLocaleDateString()}
        </div>
      </div>
      <button
        className='btn btn-info btn-xs'
        onClick={() => navigate(ROUTE_URLS.PROJECT(data.id))}
      >
        Mais Detalhes
      </button>
    </div>
  )
}

export default ProjectSummary
