import { Module, FireStateProvider } from '@/modules/fire-calc'

export default function FireCalc () {
  function handleSaveClick () {
    console.log('SaveClick!')
  }

  function handleDeleteSaveClick () {
    console.log('DeleteSaveClick!')
  }

  return (
    <FireStateProvider>
      <Module
        onSaveClick={handleSaveClick}
        onDeleteClick={handleDeleteSaveClick}
      />
    </FireStateProvider>
  )
}
