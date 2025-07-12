"use client"

import { useState, useEffect, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

interface UseApiOptions<T> {
  initialData?: T
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

interface UseApiReturn<T> {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
  mutate: (newData: T) => void
}

export function useApi<T>(
  apiFunction: () => Promise<{ data: T; success: boolean }>,
  options: UseApiOptions<T> = {},
): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(options.initialData || null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiFunction()
      setData(response.data)
      options.onSuccess?.(response.data)
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Une erreur est survenue")
      setError(error)
      options.onError?.(error)
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [apiFunction, options, toast])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const mutate = useCallback((newData: T) => {
    setData(newData)
  }, [])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    mutate,
  }
}

// Hook pour les mutations (POST, PUT, DELETE)
interface UseMutationOptions<TData, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void
  onError?: (error: Error, variables: TVariables) => void
}

interface UseMutationReturn<TData, TVariables> {
  mutate: (variables: TVariables) => Promise<TData>
  loading: boolean
  error: Error | null
}

export function useMutation<TData, TVariables>(
  mutationFunction: (variables: TVariables) => Promise<{ data: TData; success: boolean; message?: string }>,
  options: UseMutationOptions<TData, TVariables> = {},
): UseMutationReturn<TData, TVariables> {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  const mutate = useCallback(
    async (variables: TVariables): Promise<TData> => {
      try {
        setLoading(true)
        setError(null)
        const response = await mutationFunction(variables)

        if (response.message) {
          toast({
            title: "Succès",
            description: response.message,
          })
        }

        options.onSuccess?.(response.data, variables)
        return response.data
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Une erreur est survenue")
        setError(error)
        options.onError?.(error, variables)
        toast({
          title: "Erreur",
          description: error.message,
          variant: "destructive",
        })
        throw error
      } finally {
        setLoading(false)
      }
    },
    [mutationFunction, options, toast],
  )

  return {
    mutate,
    loading,
    error,
  }
}
