'use client'

import { FC, memo, useEffect } from 'react'
import Input from 'rsuite/Input'
import useStore from './store'
import jsonData from './export.json'
import Button from 'rsuite/esm/Button'
export default function Home() {

  return (
    <main>
      <h1>My list</h1>
      <MyList />
    </main>
  )
}

const MyList: FC<any> = (props) => {
  const getPersonLength = useStore((state: any) => state.getPersonLength())
  const setPeople = useStore((state: any) => state.setPeople)
  const getPeople = useStore((state: any) => state.people)
  console.log('rerender', "''''");
  console.log('getPeople', getPeople)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPeople(jsonData)
      } catch (error) {
        console.error('Error reading JSON file:', error)
      } finally {
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    console.log('getPeople change')
  }, [getPeople])

  const listItems = []
  for (let i = 0; i < getPersonLength; i++) {
    listItems.push(<MyInput index={i} />)
  }
  return <div className='list-of-inputs'>{listItems}</div>
}
type inputProp = {
  index: number
}

const MyInput: FC<inputProp> =
  memo(
  (props) => {
    const getPersonName = useStore((state: any) => state.getPersonName)
    const setPersonName = useStore((state: any) => state.setPersonName)
    console.log('index change: ', props.index)
    return (
      <div className='pl-10 pb-10' key={props.index}>
        <label htmlFor="">{getPersonName(props.index)} {props.index + 1}</label>
        <Input
          className='block px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          defaultValue={getPersonName(props.index)}
          onChange={(value) => {
            setPersonName(props.index, value)
          }}
        />
        <Button onClick={() => {
          console.log('getPersonName(props.index) ' + props.index, getPersonName(props.index))
        }}
          className='mt-3 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600'
        >
          Log Name
        </Button>
      </div>
    )
  }
)

