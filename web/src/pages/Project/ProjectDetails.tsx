import React, { PropsWithChildren } from 'react'

interface ProjectDetailsProps extends PropsWithChildren {
  id: string
}

const ProjectDetails = ({ id }: ProjectDetailsProps): JSX.Element => {
  return (
    <div>ProjectDetails</div>
  )
}

export default ProjectDetails
