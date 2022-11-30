// Hook adapted from https://usehooks.com/useLocalStorage/
import { useState } from 'react'

type LocalStorageReturn<T> = readonly [T | undefined, (value: T | ((val: T) => T) | undefined) => void]

export const useLocalStorage = <T extends unknown>(key: string, initialValue?: T): LocalStorageReturn<T> => {
  const [storedValue, setStoredValue] = useState<T | undefined>((): T | undefined => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T) | undefined): void => {
    if (value === undefined) {
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem(key)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const valueToStore = value instanceof Function
          ? value(storedValue as T)
          : value
        setStoredValue(valueToStore)

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  return [storedValue, setValue] as const
}
