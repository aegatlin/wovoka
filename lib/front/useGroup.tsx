import { useEffect, useState } from 'react'
import { Group } from './types'
import { useGroupsContext } from './useGroupsContext'

export function useGroup({ groupId }): { group?: Group } {
  const { groups } = useGroupsContext()
  const [group, setGroup] = useState<Group>()

  useEffect(() => {
    if (!groups) return

    groups.forEach((g) => {
      if (g.id == groupId) {
        setGroup(g)
        return
      }
    })
  }, [groups, groupId])

  return { group }
}
