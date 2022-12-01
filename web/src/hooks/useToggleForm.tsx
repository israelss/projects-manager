import { useState } from 'react'

type ToggleForm = [
  isFormShown: boolean,
  toggleForm: () => void
]

export const useToggleForm = (): ToggleForm => {
  const [isFormShown, setIsFormShown] = useState<boolean>(false)

  const toggleForm = (): void => setIsFormShown((isFormShown) => !isFormShown)

  return [isFormShown, toggleForm]
}
