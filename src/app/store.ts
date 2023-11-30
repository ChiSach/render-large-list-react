import _ from 'lodash'
import { create } from 'zustand'

const useStore = create<any>((set: any, get: any) => ({
  people: [],
  setPeople: (data: any) => set(() =>{
    return {people: data}
  }),
  getPersonLength: () => get().people.length,
  getPersonName: (index: number) => get().people[index].first_name,
  setPersonName: (index: number, name: string) => set((state: any) => {
    const people = state.people
    const person = {...people[index]}
    person.first_name = name
    people[index] = person
    return {
      people: _.cloneDeep(people)
    }
  }),
  removeAllBears: () => set({ bears: 0 }),
}))

export default useStore